import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Play, Pause, Clock } from 'lucide-react';

export default function Timeline() {
  const { state, dispatch } = useContext(DashboardContext);
  
  useEffect(() => {
    let interval;
    if (state.isPlaying) {
      interval = setInterval(() => {
        const [h, m] = state.selectedTime.split(':').map(Number);
        let newH = h, newM = m + 15;
        if (newM >= 60) { newM = 0; newH += 1; }
        if (newH >= 22) newH = 10;
        
        const timeStr = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
        dispatch({ type: 'SET_TIME', payload: timeStr });
        
        const newVisitors = Array.from({ length: Math.floor(Math.random() * 45) + 15 }).map(() => ({
          x: Math.random() * 95,
          y: Math.random() * 95
        }));
        dispatch({ type: 'SET_VISITORS', payload: newVisitors });
      }, 1500); // Suavizado para a animação não ficar frenética
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.selectedTime, dispatch]);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
          <Clock size={18} /> Horário Simulado
        </h4>
        <span style={{ 
          background: '#0f172a', color: '#38bdf8', padding: '4px 12px', 
          borderRadius: '16px', fontWeight: '700', fontSize: '1.1rem', fontFamily: 'monospace' 
        }}>
          {state.selectedTime}
        </span>
      </div>

      <button 
        onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
        style={{ 
          width: '100%', padding: '0.875rem', 
          background: state.isPlaying ? '#fef2f2' : '#eff6ff', 
          color: state.isPlaying ? '#ef4444' : '#3b82f6', 
          border: state.isPlaying ? '1px solid #fca5a5' : '1px solid #93c5fd', 
          borderRadius: '8px', cursor: 'pointer', 
          fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
          transition: 'all 0.2s'
        }}
      >
        {state.isPlaying ? <><Pause size={18}/> Pausar Simulação</> : <><Play size={18}/> Iniciar Predição</>}
      </button>
    </div>
  );
}