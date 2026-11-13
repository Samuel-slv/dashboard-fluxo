import React from 'react';
import Header from './Header';
import FloorSelector from './FloorSelector';
import VisualizationControls from './VisualizationControls';
import Timeline from './Timeline';
import MetricsPanel from './MetricsPanel';
import MallMap from './MallMap';
import AreaDetails from './AreaDetails';

export default function Dashboard() {
    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
            {/* Injeção de CSS para as animações dos marcadores e efeitos visuais */}
            <style>{`
        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .marker-anim { animation: pulse-dot 2s infinite; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

            <Header />

            <div style={{ display: 'flex', gap: '2rem', padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>

                {/* Barra Lateral Esquerda */}
                <aside style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <FloorSelector />
                        <VisualizationControls />
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <Timeline />
                        <MetricsPanel />
                    </div>
                </aside>

                {/* Área Principal do Mapa */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ flex: 1, borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <MallMap />
                    </div>
                    <AreaDetails />
                </main>

            </div>
        </div>
    );
}