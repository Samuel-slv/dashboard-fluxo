import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Layers } from 'lucide-react';

export default function FloorSelector() {
    const { state, dispatch } = useContext(DashboardContext);

    const floors = [
        { id: 0, label: 'Visão Mix' },
        { id: 1, label: 'Piso 1' },
        { id: 2, label: 'Piso 2' }
    ];

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <Layers size={18} /> Seleção de Pavimento
            </h4>
            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                {floors.map(floor => (
                    <button
                        key={floor.id}
                        onClick={() => dispatch({ type: 'SET_FLOOR', payload: floor.id })}
                        style={{
                            flex: 1,
                            background: state.selectedFloor === floor.id ? '#ffffff' : 'transparent',
                            color: state.selectedFloor === floor.id ? '#0f172a' : '#64748b',
                            padding: '0.5rem',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: state.selectedFloor === floor.id ? '600' : '500',
                            boxShadow: state.selectedFloor === floor.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s ease-in-out',
                            fontSize: '0.875rem'
                        }}
                    >
                        {floor.label}
                    </button>
                ))}
            </div>
        </div>
    );
}/*  */