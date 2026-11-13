# Relatório Técnico: Plataforma de Inteligência de Fluxo e Movimentação
**Empreendimento Alvo:** Capim Dourado Shopping (Palmas - TO)  
**Tecnologias Principais:** React, Context API, `useReducer`, JavaScript, CSS  
**Repositório:** [Samuel-slv/dashboard-fluxo](https://github.com/Samuel-slv/dashboard-fluxo.git)

---

## 1. Visão Geral do Projeto

Este projeto consiste em uma plataforma visual interativa desenvolvida para a gestão e análise do fluxo de visitantes em shopping centers. O objetivo principal é transformar dados brutos de circulação em representações visuais diretamente sobre as plantas arquitetônicas do **Capim Dourado Shopping**, permitindo identificar áreas de maior concentração, corredores subutilizados e padrões de movimentação ao longo dos horários do dia.

---

## 2. Arquitetura de Gerenciamento de Estado

### 2.1. O que é Gerenciamento de Estado?
O estado de uma aplicação frontend representa o conjunto de dados dinâmicos armazenados na memória em um dado momento. O gerenciamento de estado é o padrão arquitetural encarregado de controlar a leitura, modificação e propagação dessas informações de forma previsível e centralizada em toda a árvore de componentes.

### 2.2. Por que essa tecnologia foi escolhida?
Em um dashboard analítico interativo, múltiplos elementos de tela dependem simultaneamente das mesmas variáveis (como o andar ativo, o horário da simulação e o modo de visualização). Utilizar estados locais isolados em cada componente causaria inconsistências visuais e duplicação de lógica. A combinação de **Context API** com o hook **`useReducer`** foi escolhida para:
- Garantir uma **Fonte Única da Verdade** (*Single Source of Truth*).
- Prevenir a passagem excessiva de propriedades (*prop drilling*).
- Desacoplar a regra de negócios da camada de renderização visual.

### 2.3. Estado Global Centralizado
O estado global foi modelado na seguinte estrutura de objeto no arquivo `src/context/DashboardContext.jsx`:

```javascript
const initialState = {
  selectedFloor: 1,                       // 0: Visão Geral, 1: Piso 1, 2: Piso 2
  viewMode: 'PESSOAS',                    // 'PESSOAS' | 'CONCENTRAÇÃO' | 'FLUXO'
  visitors: [],                           // Array de objetos com coordenadas { x, y }
  selectedTime: '10:00',                  // Horário atual da simulação (HH:MM)
  isPlaying: false,                       // Estado de reprodução da simulação (boolean)
  selectedRegion: null,                   // Região inspecionada pelo clique do usuário
  activeFilters: ['Lojas', 'Alimentação']  // Filtros ativos para cálculo de métricas
};
```

---

## 3. Funcionamento Detalhado dos Componentes

A aplicação foi desenvolvida seguindo o princípio da responsabilidade única. A tabela e o detalhamento abaixo explicam a função de cada componente dentro da arquitetura:

| Componente | Papel no Sistema | Interação com o Estado Global |
| :--- | :--- | :--- |
| `DashboardProvider` | Envolto no topo da aplicação | Prover a `Context API` e executar o `useReducer` |
| `Header` | Barra superior institucional | Leitura estática de informações |
| `FloorSelector` | Navegação entre pavimentos | Dispara ação `SET_FLOOR` |
| `VisualizationControls` | Seleção do modo visual | Dispara ação `SET_VIEW_MODE` |
| `Timeline` | Controle temporal e simulação | Dispara `TOGGLE_PLAY`, `SET_TIME` e `SET_VISITORS` |
| `MetricsPanel` | Indicadores numéricos | Lê o estado de `visitors` e `activeFilters` |
| `MallMap` | Container da planta técnica | Lê `selectedFloor` e dispara `SET_REGION` ao clicar |
| `VisitorMarkers` | Camada de renderização dinâmica | Lê `visitors` e `viewMode` para desenhar no mapa |
| `AreaDetails` | Inspeção detalhada de setor | Lê o estado de `selectedRegion` |

### Detalhamento dos Componentes Técnicos

1. **`DashboardContext.jsx` (Centralizador de Estado):**
   Contém o `dashboardReducer`, responsável por interceptar ações enviadas via `dispatch` e gerar o novo estado imutável através das seguintes ações:
   - `SET_FLOOR`: Altera o pavimento ativo.
   - `SET_VIEW_MODE`: Modifica a forma de renderizar o fluxo no mapa.
   - `SET_VISITORS`: Atualiza as posições $(X, Y)$ da simulação.
   - `SET_TIME`: Atualiza o relógio virtual.
   - `TOGGLE_PLAY`: Alterna entre pausar e iniciar o movimento.
   - `SET_REGION`: Armazena o nome da área clicada na planta.

2. **`FloorSelector.jsx`:**
   Apresenta os botões para alterar a visão entre:
   - **Visão Geral (Piso 0):** Planta Mix com estacionamentos e vias de acesso (Avenidas JK, NS-05 e LO 2A).
   - **Piso 1 (Térreo):** Corredores comerciais e âncoras (C&A, Riachuelo, Pernambucanas, Marisa, Outback).
   - **Piso 2 (Praça de Alimentação):** Setor gastronômico (McDonald's, Spoleto, Divino Fogão, etc.).

3. **`Timeline.jsx`:**
   Gerencia a simulação contínua do tempo. Quando `isPlaying` é verdadeiro, um temporizador interno dispara atualizações de coordenadas percentuais relativas $(X\%, Y\%)$ a cada intervalo, alimentando o vetor de visitantes sem atualizar a página.

4. **`MallMap.jsx` e `VisitorMarkers.jsx`:**
   - O `MallMap` define a imagem da planta do Capim Dourado Shopping com base no andar selecionado.
   - O `VisitorMarkers` sobrepõe os elementos gráficos de acordo com o modo escolhido:
     - **PESSOAS:** Desenha marcadores discretos `<div>` com posições $X$ e $Y$ absolutas relativas ao container.
     - **CONCENTRAÇÃO:** Desenha áreas de densidade via gradientes radiais.
     - **FLUXO:** Desenha indicação vetorial de tendência de circulação.

---

## 4. Fluxo de Atualização Reativa (Ação $\rightarrow$ Estado $\rightarrow$ Interface)

O ciclo de reatividade da interface ocorre sem recarregamento da página (*Single Page Application*) seguindo a sequência abaixo:

```
[ Ação do Usuário ] 
       │ Ex: Clique no botão "CONCENTRAÇÃO" no VisualizationControls
       ▼
[ dispatch({ type: 'SET_VIEW_MODE', payload: 'CONCENTRAÇÃO' }) ]
       │
       ▼
[ Reducer (dashboardReducer) ]
       │ Computa o novo estado imutável { ...state, viewMode: 'CONCENTRAÇÃO' }
       ▼
[ Context API (DashboardContext.Provider) ]
       │ Notifica os componentes inscritos no contexto
       ▼
[ Componente VisitorMarkers ]
       │ Re-renderiza: Oculta pontos individuais e exibe o gradiente de densidade
       ▼
[ Interface Atualizada ]
```

---

## 5. Arquitetura para Integração Real com Câmeras (Visão Computacional)

Para conectar o protótipo frontend a um sistema real de monitoramento por câmeras de segurança, a arquitetura deve ser expandida conforme o diagrama de infraestrutura abaixo:

```
[ Câmeras IP (RTSP) ] ──► [ Pipeline de IA (YOLOv8 + DeepSORT) ]
                                    │
                                    ▼ Matriz de Homografia (Pixel -> Planta)
                        [ Servidor Backend (WebSockets) ]
                                    │
                                    ▼ wss:// (JSON em tempo real)
                        [ Aplicação React (dispatch SET_VISITORS) ]
```

### 5.1. Matriz de Homografia
Como as câmeras IP registram imagens em ângulo inclinado (perspectiva), utiliza-se uma transformação geométrica de homografia para converter o pixel $(X_{cam}, Y_{cam})$ do vídeo na coordenada percentual $(X_{planta}, Y_{planta})$ bidimensional da planta do shopping:

$$\begin{bmatrix} X_{planta} \\ Y_{planta} \\ 1 \end{bmatrix} = H \cdot \begin{bmatrix} X_{camera} \\ Y_{camera} \\ 1 \end{bmatrix}$$

### 5.2. Transmissão por WebSockets
No lugar de requisições HTTP REST tradicionais, o backend transmite as posições convertidas através de um canal bidirecional permanente. O componente React recebe os pacotes JSON via WebSocket e chama a mesma ação `SET_VISITORS` já implementada:

```javascript
useEffect(() => {
  const socket = new WebSocket('wss://api.shopping.com.br/stream-fluxo');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.floor === state.selectedFloor) {
      dispatch({ type: 'SET_VISITORS', payload: data.visitors });
    }
  };

  return () => socket.close();
}, [state.selectedFloor, dispatch]);
```

---

## 6. Estrutura do Repositório e Execução

### 6.1. Árvore de Diretórios
```text
dashboard-fluxo/
├── public/
│   ├── piso1.jpg           # Planta do 1º Pavimento
│   ├── piso2.jpg           # Planta da Praça de Alimentação
│   └── planta-geral.jpg    # Planta Mix / Implantação Geral
├── src/
│   ├── components/
│   │   ├── AreaDetails.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FloorSelector.jsx
│   │   ├── Header.jsx
│   │   ├── MallMap.jsx
│   │   ├── MetricsPanel.jsx
│   │   ├── Timeline.jsx
│   │   ├── VisitorMarkers.jsx
│   │   └── VisualizationControls.jsx
│   ├── context/
│   │   └── DashboardContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

### 6.2. Como Executar o Projeto Localmente
1. **Clonar o repositório:**
   ```bash
   git clone -b samurai https://github.com/Samuel-slv/dashboard-fluxo.git
   cd dashboard-fluxo
   ```
2. **Instalar as dependências:**
   ```bash
   npm install
   ```
3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
4. **Acessar no navegador:**  
   Abra `http://localhost:5173` para visualizar o dashboard interativo em execução.