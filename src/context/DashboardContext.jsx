import React, { createContext, useReducer } from 'react';

// Gera pessoas espalhadas no mapa para não abrir vazio
const generateInitialVisitors = () => {
  return Array.from({ length: 35 }).map(() => ({
    x: Math.floor(Math.random() * 90) + 5,
    y: Math.floor(Math.random() * 90) + 5
  }));
};

const initialState = {
  selectedFloor: 1,
  viewMode: 'PESSOAS',
  visitors: generateInitialVisitors(),
  selectedTime: '10:00',
  isPlaying: false,
  selectedRegion: null,
  activeFilters: ['Lojas Âncoras', 'Praça de Alimentação', 'Corredores']
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_FLOOR': 
      return { 
        ...state, 
        selectedFloor: action.payload,
        visitors: generateInitialVisitors(), 
        selectedRegion: null 
      };
    case 'SET_VIEW_MODE': return { ...state, viewMode: action.payload };
    case 'SET_VISITORS': return { ...state, visitors: action.payload };
    case 'SET_TIME': return { ...state, selectedTime: action.payload };
    case 'TOGGLE_PLAY': return { ...state, isPlaying: !state.isPlaying };
    case 'SET_REGION': return { ...state, selectedRegion: action.payload };
    case 'SET_FILTERS': return { ...state, activeFilters: action.payload };
    default: return state;
  }
}

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}