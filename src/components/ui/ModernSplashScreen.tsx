import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernSplashScreenProps {
  onFinish: () => void;
  duration?: number;
  variant?: 'minimal' | 'geometric' | 'particles' | 'neon';
}

const ModernSplashScreen: React.FC<ModernSplashScreenProps> = ({
  onFinish,
  duration = 4000,
  variant = 'geometric'
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const phases = [
    "Initializing...",
    "Loading Assets...",
    "Preparing Interface...",
    "Almost Ready...",
    "Welcome!"
  ];

  useEffect(() => {
    // Logo animation trigger
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Phase progression
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev < phases.length - 1) return prev + 1;
        return prev;
      });
    }, duration / phases.length);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.8;
      });
    }, duration / 125);

    const finishTimer = setTimeout(onFinish, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(finishTimer);
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [onFinish, duration, phases.length]);

  const renderVariant = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimalVariant();
      case 'particles':
        return renderParticlesVariant();
      case 'neon':
        return renderNeonVariant();
      default:
        return renderGeometricVariant();
    }
  };

  const renderGeometricVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      {/* Geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/10"
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              left: `${20 + (i % 5) * 20}%`,
              top: `${20 + Math.floor(i / 5) * 20}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md">
        <AnimatePresence>
          {showLogo && (
            <>
              {/* Hexagonal logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative mx-auto mb-8 w-32 h-32"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 transform rotate-45 rounded-lg"></div>
                <div className="absolute inset-2 bg-gray-900 transform rotate-45 rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-white transform -rotate-45">AP</span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
              >
                ALPIAN
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl text-gray-300 mb-12"
              >
                Creative Developer
              </motion.p>
            </>
          )}
        </AnimatePresence>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-6"
        >
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 text-lg font-medium"
          >
            {phases[currentPhase]}
          </motion.p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute right-0 top-0 h-full w-8 bg-white/30 blur-sm"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderNeonVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Neon grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite'
      }}>
      </div>

      <style>
        {`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}
      </style>

      <div className="relative z-10 text-center">
        {showLogo && (
          <>
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mx-auto mb-8 w-40 h-40 relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                <div className="absolute inset-4 rounded-full border-2 border-pink-500 shadow-[0_0_15px_rgba(255,20,147,0.5)]">
                  <div className="absolute inset-6 rounded-full bg-black flex items-center justify-center">
                    <span className="text-4xl font-bold text-white font-mono">AP</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl font-bold text-white mb-4 font-mono tracking-wider"
              style={{
                textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              ALPIAN.DEV
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl text-pink-400 mb-12 font-mono"
              style={{
                textShadow: '0 0 10px rgba(255, 20, 147, 0.8)'
              }}
            >
              {"<DEVELOPER />"}
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-6"
        >
          <div className="text-cyan-400 text-lg font-mono tracking-wide">
            [{phases[currentPhase]}]
          </div>

          <div className="w-80 mx-auto">
            <div className="flex justify-between text-sm text-cyan-300 mb-2 font-mono">
              <span>LOADING_</span>
              <span>{Math.round(progress).toString().padStart(3, '0')}%</span>
            </div>
            <div className="w-full bg-gray-900 rounded-none h-4 border border-cyan-400 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderMinimalVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        {showLogo && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-black flex items-center justify-center">
                <span className="text-3xl font-light text-white">A</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-light text-black mb-8 tracking-[0.2em]"
            >
              ALPIAN PORTOFOLIO
            </motion.h1>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-64 mx-auto"
        >
          <div className="w-full bg-gray-200 h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <motion.p
            className="text-sm text-gray-600 mt-4 font-light tracking-wide"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phases[currentPhase]}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderParticlesVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {showLogo && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.2
              }}
              className="mx-auto mb-8 w-32 h-32 relative"
            >
              {/* Orbiting rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-white/30 rounded-full"
                  style={{
                    width: `${100 + i * 20}%`,
                    height: `${100 + i * 20}%`,
                    left: `${-i * 10}%`,
                    top: `${-i * 10}%`,
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              <div className="absolute inset-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AP</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-5xl font-bold text-white mb-4"
            >
              ALPIAN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-xl text-purple-200 mb-12"
            >
              Digital Creator
            </motion.p>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-6"
        >
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-lg"
          >
            {phases[currentPhase]}
          </motion.p>

          <div className="w-80 mx-auto space-y-2">
            <div className="flex justify-between text-sm text-purple-300">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return renderVariant();
};

export default ModernSplashScreen;
