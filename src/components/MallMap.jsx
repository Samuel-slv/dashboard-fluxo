import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import VisitorMarkers from './VisitorMarkers';
import { Maximize } from 'lucide-react';

export default function MallMap() {
    const { state, dispatch } = useContext(DashboardContext);

    const getFloorImage = (floor) => {
        switch (floor) {
            case 0: return '/planta-geral.jpg';
            case 1: return '/piso1.jpg';
            case 2: return '/piso2.jpg';
            default: return '/planta-geral.jpg';
        }
    };

    const getFloorName = (floor) => {
        if (floor === 0) return 'Planta Geral / Estacionamentos';
        return `Pavimento ${floor}`;
    };

    return (
        <div
            onClick={(e) => {
                // Pega a coordenada aproximada do clique para enriquecer a UX
                const rect = e.target.getBoundingClientRect();
                const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                dispatch({ type: 'SET_REGION', payload: `${getFloorName(state.selectedFloor)} (Setor X:${x} Y:${y})` });
            }}
            style={{
                width: '100%',
                height: '100%',
                minHeight: '550px',
                backgroundImage: `url(${getFloorImage(state.selectedFloor)})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                position: 'relative',
                cursor: 'crosshair',
                overflow: 'hidden',
            }}
        >
            {/* Badge flutuante sobre o mapa */}
            <div className="glass-panel float" style={{
                position: 'absolute',
                top: 20,
                left: 20,
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                color: '#0f172a',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <Maximize size={16} color="#3b82f6" /> {getFloorName(state.selectedFloor)}
            </div>

            <VisitorMarkers />
        </div>
    );
}