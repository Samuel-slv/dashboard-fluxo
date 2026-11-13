# Relatório Técnico & Guia de Funcionamento dos Componentes

**Projeto:** Plataforma de Inteligência de Fluxo e Movimentação

**Empreendimento Alvo:** Capim Dourado Shopping (Palmas - TO)

**Tecnologias:** React, Context API, `useReducer`, JavaScript, CSS

**Repositório:** [Samuel-slv/dashboard-fluxo](https://github.com/Samuel-slv/dashboard-fluxo.git)

## 1. Arquitetura do Sistema

### 📷 Diagrama de Arquitetura

<img src="./img/Diagrama%20de%20Arquitetura.webp" alt="Diagrama de Arquitetura de Gerenciamento de Estado" width="100%" />

## 2. O Fluxo de Dados do Sistema

O sistema funciona como uma **estação de rádio central**: a central (`DashboardContext` + `useReducer`) armazena o estado único e transmite as alterações para todos os componentes inscritos simultaneamente.

```
               ┌──────────────────────────────────────────────┐
               │         DashboardContext & Reducer           │
               │   (A Central Única de Dados do Sistema)      │
               └──────────────────────┬───────────────────────┘
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │ Transmite o estado       │ Transmite o estado       │ Dispara ações (Dispatch)
           ▼                          ▼                          ▲
┌────────────────────┐     ┌────────────────────┐     ┌──────────┴─────────┐
│     MallMap        │     │    MetricsPanel    │     │   FloorSelector    │
│ (Renderiza Planta) │     │ (Calcula Números)  │     │ (Muda para Piso 2) │
└──────────┬─────────┘     └────────────────────┘     └────────────────────┘
           │
           ▼
┌────────────────────┐                                ┌────────────────────┐
│   VisitorMarkers   │                                │      Timeline      │
│ (Desenha Bolinhas) │                                │ (Avança o Relógio) │
└──────────┬─────────┘                                └────────────────────┘
```

## 3. Explicação Detalhada de Cada Componente

### 🧠 1. `DashboardContext.jsx` (O Cérebro / Central de Controle)

* **O que faz:** Armazena o estado global da aplicação em um único ponto da memória.
* **Como funciona:** Executa o hook `useReducer`. Nenhuma variável de estado fica isolada em componentes filhos.
* **Por que existe:** Quando o andar é trocado no `FloorSelector`, o mapa (`MallMap`) descobre instantaneamente porque ambos estão conectados a esta mesma central.

### 🏢 2. `FloorSelector.jsx` (Seletor de Pavimento)

* **O que faz:** Apresenta os botões "Visão Geral", "Piso 1" e "Piso 2".
* **Como funciona:** Ao clicar em um botão, o componente envia o comando `dispatch({ type: 'SET_FLOOR', payload: 1 })`.
* **Efeito na Interface:** O `useReducer` altera a propriedade `selectedFloor`. A imagem da planta técnica troca na tela de forma reativa sem recarregar a página.

### 👁️ 3. `VisualizationControls.jsx` (Filtro de Modo Visual)

* **O que faz:** Alterna entre os modos **PESSOAS**, **CONCENTRAÇÃO** e **FLUXO**.
* **Como funciona:** Envia o comando `SET_VIEW_MODE` para o estado global.
* **Efeito na Interface:**
  * Modo **PESSOAS:** Instrui o sistema a desenhar cada visitante como um ponto individual.
  * Modo **CONCENTRAÇÃO:** Instrui o sistema a renderizar manchas de calor radiais (*heatmap*).
  * Modo **FLUXO:** Exibe os vetores e direções de movimentação.

### ⏱️ 4. `Timeline.jsx` (Motor de Simulação Temporal)

* **O que faz:** Controla o relógio virtual (ex: 10:00, 10:15) e a reprodução (Play/Pause).
* **Como funciona:** Quando a simulação está ativa (`isPlaying: true`), o componente executa um temporizador automático (`setInterval`). A cada segundo:
  1. Avança o horário virtual em 15 minutos.
  2. Gera uma nova matriz de coordenadas $(X, Y)$ para os visitantes.
  3. Dispara a ação `SET_VISITORS` para o estado global.

### 📊 5. `MetricsPanel.jsx` (Painel Analítico)

* **O que faz:** Exibe a quantidade estimada de visitantes e os filtros ativos.
* **Como funciona:** Consome a lista de visitantes armazenada em `state.visitors` e calcula os indicadores exibidos na interface.

### 🗺️ 6. `MallMap.jsx` (Container da Planta Técnica)

* **O que faz:** Renderiza a imagem de fundo correspondente ao andar selecionado (`planta-geral.jpg`, `piso1.jpg` ou `piso2.jpg`).
* **Como funciona:** Lê a variável `selectedFloor` do estado global:
  * `selectedFloor === 0` $\rightarrow$ Exibe a Planta Mix com os estacionamentos e acessos.
  * `selectedFloor === 1` $\rightarrow$ Exibe o 1º Pavimento (Térreo).
  * `selectedFloor === 2` $\rightarrow$ Exibe o 2º Pavimento (Praça de Alimentação).
* **Interatividade:** O clique na foto captura a área e envia a ação `SET_REGION`.

### 🔴 7. `VisitorMarkers.jsx` (Camada de Renderização Gráfica)

* **O que faz:** Desenha os marcadores e camadas visuais por cima da imagem do mapa.
* **Como funciona:** Mapeia o vetor `visitors` contendo coordenadas percentuais $\{x, y\}$:
  * Utiliza posicionamento relativo (`position: absolute; left: X%; top: Y%`), garantindo responsividade em qualquer tamanho de monitor.

### 🔍 8. `AreaDetails.jsx` (Painel de Inspeção por Setor)

* **O que faz:** Exibe informações detalhadas sobre a área inspecionada.
* **Como funciona:** Lê a propriedade `selectedRegion` do estado e atualiza a descrição na tela dinamicamente conforme a interação do usuário com a planta.

## 4. Guia de Apresentação para a Banca (Roteiro de 2 Minutos)

1. **Introdução:**
   *"Desenvolvemos uma plataforma de inteligência visual para shopping centers aplicada ao Capim Dourado Shopping, permitindo mapear e analisar a circulação de visitantes sobre as plantas arquitetônicas reais."*

2. **Requisito Técnico (Gerenciamento de Estado):**
   *"Para atender ao requisito de gerenciamento de estado na interface, combinamos o hook `useReducer` com a `Context API` do React, centralizando todas as variáveis dinâmicas em uma fonte única da verdade."*

3. **Demonstração Prática:**
   *"Ao alternar o pavimento, o modo de visualização ou acionar a simulação na Timeline, as ações são enviadas para o reducer central, reordenando o mapa, os marcadores de visitantes e o painel de métricas de forma síncrona, sem recarregar a página."*

4. **Visão de Futuro / Câmeras:**
   *"A arquitetura foi projetada de modo desacoplado: o gerador de posições da Timeline pode ser substituído diretamente por uma conexão WebSocket alimentada por algoritmos de visão computacional em câmeras de segurança."*