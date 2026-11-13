import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { MapPin, Store, AlertCircle } from 'lucide-react';

export default function AreaDetails() {
    const { state } = useContext(DashboardContext);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <MapPin size={20} color="#3b82f6" />
                <h3 style={{ margin: 0, color: '#1e293b' }}>Inteligência por Zonas</h3>
            </div>

            {state.selectedRegion ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', color: '#64748b' }}>Zona Inspecionada</p>
                        <p style={{ margin: 0, fontWeight: '600', color: '#0f172a', fontSize: '1.1rem' }}>{state.selectedRegion}</p>
                    </div>
                    <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Store size={14} /> Âncoras Próximas</p>
                        <p style={{ margin: 0, fontWeight: '500', color: '#334155' }}>
                            {state.selectedFloor === 1 ? 'C&A, Riachuelo' : 'Centauro, Outback'}
                        </p>
                    </div>
                    <div style={{ background: '#fffbeb', padding: '0.75rem', borderRadius: '6px', border: '1px solid #fef3c7' }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            <AlertCircle size={14} /> Insight do Algoritmo
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#92400e' }}>
                            Tendência de gargalo nesta área nos próximos 45 min. Sugere-se otimização de limpeza.
                        </p>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
                    <MapPin size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                    <p style={{ margin: 0 }}>Clique em qualquer ponto da planta no mapa acima para isolar a análise de fluxo da zona.</p>
                </div>
            )}
        </div>
    );
}/*  */