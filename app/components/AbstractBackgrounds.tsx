'use client';

import { useEffect, useState } from 'react';

interface AbstractBackgroundProps {
    type: 'home' | 'about' | 'projects' | 'contact';
    isActive: boolean;
}

interface Particle {
    id: number;
    left: string;
    delay: string;
}

interface ProjectParticle {
    id: number;
    left: string;
    top: string;
    animation: string;
    animationDelay: string;
}

interface ConnectionLine {
    id: number;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    duration: number;
}

export default function AbstractBackground({ type, isActive }: AbstractBackgroundProps) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [projectParticles, setProjectParticles] = useState<ProjectParticle[]>([]);
    const [connectionLines, setConnectionLines] = useState<ConnectionLine[]>([]);

    useEffect(() => {
        if (isActive) {
            if (type === 'home') {
                const newParticles = Array.from({ length: 20 }, (_, i) => ({
                    id: i,
                    left: `${Math.random() * 100}%`,
                    delay: `${Math.random() * 15}s`
                }));
                setParticles(newParticles);
            } else if (type === 'projects') {
                const newProjectParticles = Array.from({ length: 8 }, (_, i) => ({
                    id: i,
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                    animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`
                }));
                setProjectParticles(newProjectParticles);
            } else if (type === 'contact') {
                const newConnectionLines = Array.from({ length: 15 }, (_, i) => ({
                    id: i,
                    x1: `${Math.random() * 100}%`,
                    y1: `${Math.random() * 100}%`,
                    x2: `${Math.random() * 100}%`,
                    y2: `${Math.random() * 100}%`,
                    duration: 5 + Math.random() * 10
                }));
                setConnectionLines(newConnectionLines);
            }
        }
    }, [isActive, type]);

    const renderHomeBackground = () => (
        <div className="abstract-bg">
            {/* Floating Shapes */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            {/* Particles */}
            <div className="particles">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.left,
                            animationDelay: particle.delay
                        }}
                    />
                ))}
            </div>
        </div>
    );

    const renderAboutBackground = () => (
        <div className="abstract-bg">
            {/* Geometric Pattern */}
            <div className="geometric-bg"></div>

            {/* Ripple Effects */}
            <div className="ripple-container">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="ripple"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + i * 10}%`,
                            animationDelay: `${i * 0.8}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );

    const renderProjectsBackground = () => (
        <div className="abstract-bg">
            {/* Animated Grid */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                        animation: 'geometric-move 15s linear infinite'
                    }}
                />
            </div>

            {/* Floating Code Blocks */}
            <div className="absolute inset-0">
                {projectParticles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-4 h-4 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-sm"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animation: particle.animation,
                            animationDelay: particle.animationDelay
                        }}
                    />
                ))}
            </div>
        </div>
    );

    const renderContactBackground = () => {
        return (
            <div className="abstract-bg">
                {/* Swirling Gradients */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-400/20 via-purple-400/10 to-transparent rounded-full"
                        style={{ animation: 'float 20s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-cyan-400/20 via-cyan-400/10 to-transparent rounded-full"
                        style={{ animation: 'float 25s ease-in-out infinite reverse' }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-pink-400/15 via-pink-400/5 to-transparent rounded-full"
                        style={{ animation: 'float 18s ease-in-out infinite' }}
                    />
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" opacity="0.1">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                            <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                        </linearGradient>
                    </defs>
                    {connectionLines.map((line) => (
                        <line
                            key={line.id}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            opacity="0.5"
                        >
                            <animate
                                attributeName="opacity"
                                values="0.1;0.8;0.1"
                                dur={`${line.duration}s`}
                                repeatCount="indefinite"
                            />
                        </line>
                    ))}
                </svg>
            </div>
        );
    };

    const backgrounds = {
        home: renderHomeBackground,
        about: renderAboutBackground,
        projects: renderProjectsBackground,
        contact: renderContactBackground
    };

    return backgrounds[type]();
}