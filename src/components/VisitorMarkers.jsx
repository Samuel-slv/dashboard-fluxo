import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

export default function VisitorMarkers() {
    const { state } = useContext(DashboardContext);

    if (state.viewMode === 'PESSOAS') {
        return state.visitors.map((v, i) => (
            <div
                key={i}
                className="marker-anim"
                style={{
                    position: 'absolute', left: `${v.x}%`, top: `${v.y}%`,
                    width: '10px', height: '10px', background: '#ef4444',
                    borderRadius: '50%', // Alterado para redondo para parecer radar
                    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none'
                }}
            />
        ));
    }

    if (state.viewMode === 'CONCENTRAÇÃO') {
        return (
            <div style={{
                width: '100%', height: '100%',
                // Gradiente mais sofisticado imitando heatmap real
                background: `
          radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)
        `,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '2rem'
            }}>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', color: '#991b1b' }}>
                    🔥 Zonas de Calor Ativas
                </div>
            </div>
        );
    }

    if (state.viewMode === 'FLUXO') {
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', background: 'rgba(255,255,255,0.4)' }}>
                {/* Simulando setas de direção de fluxo com SVG */}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" opacity="0.6" />
                        </marker>
                    </defs>
                    <line x1="20%" y1="80%" x2="40%" y2="50%" stroke="#2563eb" strokeWidth="4" strokeDasharray="8,8" opacity="0.6" markerEnd="url(#arrowhead)" />
                    <line x1="80%" y1="20%" x2="50%" y2="40%" stroke="#2563eb" strokeWidth="4" strokeDasharray="8,8" opacity="0.6" markerEnd="url(#arrowhead)" />
                </svg>
                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontWeight: 'bold', color: '#1d4ed8', background: 'white', padding: '0.5rem', borderRadius: '4px' }}>
                    ↗ Tendência de Migração
                </div>
            </div>
        );
    }
    return null;
}