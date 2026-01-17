import React from 'react';

interface ParticleFieldProps {
    type: 'hot' | 'cold';
    isActive: boolean;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ type, isActive }) => {
    if (!isActive) return null;

    const particleCount = 20;
    const particles = Array.from({ length: particleCount }, (_, i) => i);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
            {particles.map((i) => {
                const delay = Math.random() * 5;
                const duration = 6 + Math.random() * 4;
                const floatX = (Math.random() - 0.5) * 100;
                const floatZ = Math.random() * 200 - 100;
                const size = type === 'hot' ? 4 + Math.random() * 4 : 3 + Math.random() * 3;
                const startX = Math.random() * 100;
                const startY = type === 'hot' ? 80 + Math.random() * 20 : -10;

                return (
                    <div
                        key={i}
                        className="absolute animate-float-particle"
                        style={{
                            left: `${startX}%`,
                            top: `${startY}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            '--float-x': `${floatX}px`,
                            '--float-z': `${floatZ}px`,
                            '--delay': `${delay}s`,
                            '--duration': `${duration}s`,
                        } as React.CSSProperties}
                    >
                        <div
                            className={`w-full h-full rounded-full ${type === 'hot'
                                    ? 'bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                                    : 'bg-cyan-200/30 shadow-[0_0_8px_rgba(0,255,255,0.4)]'
                                }`}
                            style={{
                                filter: 'blur(1px)',
                                transform: `translateZ(${floatZ}px)`,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ParticleField;
