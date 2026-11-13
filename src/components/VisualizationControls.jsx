import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Users, Flame, Navigation } from 'lucide-react';

export default function VisualizationControls() {
    const { state, dispatch } = useContext(DashboardContext);

    const modes = [
        { id: 'PESSOAS', icon: Users, color: '#3b82f6' },
        { id: 'CONCENTRAÇÃO', icon: Flame, color: '#ef4444' },
        { id: 'FLUXO', icon: Navigation, color: '#10b981' }
    ];

    return (
        <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '0.9rem' }}>Modo de Análise</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {modes.map(({ id, icon: Icon, color }) => {
                    const isActive = state.viewMode === id;
                    return (
                        <button
                            key={id}
                            onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: id })}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                width: '100%', padding: '0.75rem 1rem',
                                border: isActive ? `1px solid ${color}` : '1px solid #e2e8f0',
                                borderRadius: '8px', cursor: 'pointer',
                                background: isActive ? `${color}15` : '#ffffff', // cor com 15% de opacidade
                                color: isActive ? color : '#475569',
                                fontWeight: isActive ? '600' : '500',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon size={18} color={isActive ? color : '#64748b'} />
                            <span style={{ textTransform: 'capitalize' }}>
                                {id.toLowerCase()}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}