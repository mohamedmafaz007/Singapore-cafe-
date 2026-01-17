import { motion } from 'framer-motion';
import { Drink } from '@/data/drinks';
import { toast } from 'sonner';
import ParticleField from './ParticleField';
import { useEffect, useState } from 'react';

interface FullScreenDrinkProps {
    drink: Drink;
    isActive: boolean;
}

const FullScreenDrink = ({ drink, isActive }: FullScreenDrinkProps) => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const handleOrder = () => {
        toast.success(`Reserved ${drink.name}`);
    };

    // 3D Tilt effect (desktop only)
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (window.innerWidth < 768) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseXRelative = e.clientX - rect.left - centerX;
        const mouseYRelative = e.clientY - rect.top - centerY;

        setMouseX(mouseXRelative / centerX);
        setMouseY(mouseYRelative / centerY);
    };

    const handleMouseLeave = () => {
        setMouseX(0);
        setMouseY(0);
    };

    // Reset tilt when slide changes
    useEffect(() => {
        if (!isActive) {
            setMouseX(0);
            setMouseY(0);
        }
    }, [isActive]);

    const rotateY = mouseX * 3;
    const rotateX = -mouseY * 3;

    return (
        <motion.section
            className="h-screen w-screen min-w-[100vw] snap-center relative flex flex-col items-center justify-center overflow-hidden preserve-3d"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 1 : 0.3,
                rotateY: rotateY,
                rotateX: rotateX,
            }}
            transition={{
                opacity: { duration: 0.5 },
                rotateY: { type: "spring", stiffness: 300, damping: 30 },
                rotateX: { type: "spring", stiffness: 300, damping: 30 },
            }}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Particle Field */}
            <ParticleField type={drink.category} isActive={isActive} />

            {/* Background Layer - Furthest depth */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    z: isActive ? -100 : -50,
                    scale: isActive ? 1.1 : 1,
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <motion.img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover contrast-[1.1] brightness-[0.75]"
                    loading="eager"
                    animate={{
                        scale: isActive ? 1.15 : 1,
                    }}
                    transition={{
                        duration: 10,
                        ease: "linear",
                    }}
                />

                {/* Visual Depth layers */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
            </motion.div>

            {/* Content Layer - Medium depth - RESPONSIVE */}
            <motion.div
                className="relative z-20 w-full h-full flex flex-col items-start justify-end pb-16 sm:pb-20 md:pb-32 px-4 sm:px-8 md:px-16 lg:px-32"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    z: isActive ? 50 : 0,
                }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <div className="w-full max-w-5xl">

                    {/* Brand Tagline - 3D Card entrance - RESPONSIVE */}
                    <motion.div
                        className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6 opacity-60"
                        initial={{ rotateX: -90, opacity: 0, z: -100 }}
                        animate={isActive ? {
                            rotateX: 0,
                            opacity: 0.6,
                            z: 0,
                        } : {
                            rotateX: -90,
                            opacity: 0,
                            z: -100,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="w-6 sm:w-8 md:w-12 h-[2px] bg-accent" />
                        <span className="text-[8px] sm:text-[9px] md:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] text-white">
                            The Tea Shop Collection
                        </span>
                    </motion.div>

                    {/* Headline - Massive 3D Typography - RESPONSIVE */}
                    <motion.h2
                        className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[14rem] font-black text-white leading-[0.7] tracking-tighter uppercase mb-4 sm:mb-6 md:mb-8 text-3d"
                        initial={{ rotateY: 90, opacity: 0, z: -200 }}
                        animate={isActive ? {
                            rotateY: 0,
                            opacity: 1,
                            z: 100,
                        } : {
                            rotateY: 90,
                            opacity: 0,
                            z: -200,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {drink.name}
                    </motion.h2>

                    {/* Meta Info & Action - Staggered 3D entrance - RESPONSIVE */}
                    <motion.div
                        className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end gap-6 sm:gap-8 md:gap-12"
                        initial={{ y: 60, opacity: 0, z: -50 }}
                        animate={isActive ? {
                            y: 0,
                            opacity: 1,
                            z: 80,
                        } : {
                            y: 60,
                            opacity: 0,
                            z: -50,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-accent text-[8px] sm:text-[9px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em]">Price for Excellence</span>
                            <span className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter">${drink.price.toFixed(2)}</span>
                        </div>

                        <motion.button
                            onClick={handleOrder}
                            className="px-8 py-4 sm:px-12 sm:py-5 md:px-16 md:py-7 lg:px-24 lg:py-10 bg-white text-black hover:bg-accent hover:text-white rounded-xl sm:rounded-2xl md:rounded-[1.5rem] font-black text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-widest transition-all duration-700 shadow-3xl active:scale-95"
                            whileHover={{ scale: 1.05, z: 150 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            Order Now
                        </motion.button>
                    </motion.div>

                    {/* Description - Slide from side with depth - RESPONSIVE */}
                    <motion.p
                        className="mt-6 sm:mt-8 md:mt-12 text-white/40 text-xs sm:text-sm md:text-base lg:text-lg font-bold max-w-xl leading-relaxed tracking-wide sm:tracking-wider md:tracking-widest uppercase border-l-2 border-accent pl-4 sm:pl-6 md:pl-10 min-h-[3rem] sm:min-h-[4rem] md:h-16 flex items-center"
                        initial={{ x: -60, opacity: 0, z: -30 }}
                        animate={isActive ? {
                            x: 0,
                            opacity: 1,
                            z: 60,
                        } : {
                            x: -60,
                            opacity: 0,
                            z: -30,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        Experience the {drink.category === 'hot' ? 'intense warmth' : 'glacier coolness'} of hand-selected {drink.category} ingredients.
                    </motion.p>
                </div>
            </motion.div>

            {/* UI Frame - Closest layer with reveal animation - RESPONSIVE */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-30 border-[1px] border-white/5 m-4 sm:m-6 md:m-8 lg:m-16"
                initial={{ scale: 1.2, opacity: 0, z: -50 }}
                animate={isActive ? {
                    scale: 1,
                    opacity: 1,
                    z: 200,
                } : {
                    scale: 1.2,
                    opacity: 0,
                    z: -50,
                }}
                transition={{
                    duration: 1.5,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformStyle: 'preserve-3d' }}
            />
        </motion.section>
    );
};

export default FullScreenDrink;
