import React from 'react';
import { Activity, LayoutDashboard, User } from 'lucide-react';

export default function Header() {
    return (
        <header style={{
            padding: '1rem 2rem',
            background: '#0f172a',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#3b82f6', padding: '8px', borderRadius: '8px' }}>
                    <Activity size={24} color="white" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.5px' }}>
                        FlowMetrics <span style={{ color: '#94a3b8', fontWeight: '400' }}>| Capim Dourado</span>
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Inteligência de Fluxo e Ocupação</span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Visão da Administração</span>
                <div style={{ background: '#1e293b', padding: '8px', borderRadius: '50%', border: '1px solid #334155' }}>
                    <User size={18} color="#cbd5e1" />
                </div>
            </div>
        </header>
    );
}