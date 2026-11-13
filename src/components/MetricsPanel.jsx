import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { TrendingUp, Users } from 'lucide-react';

export default function MetricsPanel() {
    const { state } = useContext(DashboardContext);
    const estimatedCount = state.visitors.length * 12; // Multiplicador base

    return (
        <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#334155' }}>Métricas do Pavimento</h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {/* Card 1 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>Ocupação Estimada</span>
                        <Users size={14} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>
                        {estimatedCount}
                    </div>
                    <div style={{ color: '#10b981', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <TrendingUp size={12} /> +14% vs ontem
                    </div>
                </div>

                {/* Card 2 */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>Status da Área</span>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: estimatedCount > 300 ? '#ef4444' : '#10b981' }}>
                        {estimatedCount > 300 ? 'Alta Densidade' : 'Fluxo Normal'}
                    </div>
                </div>
            </div>
        </div>
    );
}