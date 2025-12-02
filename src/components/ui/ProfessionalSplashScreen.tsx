import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessionalSplashScreenProps {
  onFinish: () => void;
  duration?: number;
  variant?: 'corporate' | 'creative' | 'tech' | 'elegant';
  preloadAssets?: {
    images?: string[];
    fonts?: string[];
  };
}

const ProfessionalSplashScreen: React.FC<ProfessionalSplashScreenProps> = ({
  onFinish,
  duration = 4500,
  variant = 'tech'
                                                                           }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('intro');
  const [progress, setProgress] = useState(0);

  const stages = [
    { text: "Initializing Portfolio", icon: "⚡" },
    { text: "Loading Components", icon: "🔧" },
    { text: "Preparing Experience", icon: "✨" },
    { text: "Finalizing Setup", icon: "🚀" },
    { text: "Ready to Launch", icon: "🎯" }
  ];

  // Smooth progress animation from 0 to 100%
  useEffect(() => {
    const startDelay = 1000; // Start after 1 second
    const targetDuration = duration - 800; // Leave 800ms for exit animation
    const updateInterval = 50; // Update every 50ms for smooth animation
    const incrementPerUpdate = (100 / (targetDuration / updateInterval));

    const startTimer = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + incrementPerUpdate;

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }

          // Update stage based on progress
          const stageIndex = Math.floor((newProgress / 100) * (stages.length - 1));
          setCurrentStage(stageIndex);

          return newProgress;
        });
      }, updateInterval);

      // Cleanup interval when component unmounts or duration ends
      const cleanupTimer = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
      }, targetDuration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(cleanupTimer);
      };
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [duration, stages.length]);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 300);

    const phaseTimer = setTimeout(() => {
      setAnimationPhase('loading');
    }, 1000);

    const finishTimer = setTimeout(() => {
      setAnimationPhase('exit');
      setTimeout(onFinish, 800);
    }, duration);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(phaseTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish, duration]);

  const renderVariant = () => {
    switch (variant) {
      case 'corporate':
        return renderCorporateVariant();
      case 'creative':
        return renderCreativeVariant();
      case 'elegant':
        return renderElegantVariant();
      default:
        return renderTechVariant();
    }
  };

  const renderTechVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
    >
      {/* Matrix-like background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
            style={{
              left: `${(i * 5) % 100}%`,
              height: '100vh',
            }}
            animate={{
              opacity: [0, 1, 0],
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,14.4 50,28.9 25,43.3 0,28.9 0,14.4" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <AnimatePresence mode="wait">
          {showContent && (
            <>
              {/* Logo with holographic effect */}
              <motion.div
                initial={{ scale: 0, rotateY: -180 }}
                animate={{
                  scale: 1,
                  rotateY: 0,
                  rotateX: animationPhase === 'exit' ? 90 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: animationPhase === 'exit' ? 0.5 : 1
                }}
                className="relative mx-auto mb-8 w-40 h-40"
              >
                {/* Orbital rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-cyan-400/30 rounded-full"
                    style={{
                      width: `${120 + i * 15}%`,
                      height: `${120 + i * 15}%`,
                      left: `${-(10 + i * 7.5)}%`,
                      top: `${-(10 + i * 7.5)}%`,
                    }}
                    animate={{
                      rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 2, repeat: Infinity, delay: i * 0.5 }
                    }}
                  />
                ))}

                {/* Central logo */}
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                  <motion.span
                    className="text-4xl font-bold text-white font-mono"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(255,255,255,0.8)",
                        "0 0 20px rgba(0,255,255,0.8)",
                        "0 0 5px rgba(255,255,255,0.8)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AP
                  </motion.span>
                </div>
              </motion.div>

              {/* Main title with glitch effect */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-2"
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-4 font-mono tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,255,255,0.8)",
                      "2px 2px 0px rgba(255,0,255,0.8), -2px -2px 0px rgba(0,255,0,0.8)",
                      "0 0 10px rgba(0,255,255,0.8)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  ALPIAN.DEV
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mb-12"
              >
                <div className="text-2xl text-cyan-400 font-mono mb-2">
                  {"<"}<span className="text-white">FULL STACK DEVELOPER</span>{" />"}
                </div>
                <div className="text-lg text-gray-400 font-mono">
                  Portfolio.initialize();
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Advanced progress section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-6"
        >
          {/* Current stage indicator */}
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center space-x-3 text-cyan-400 text-lg font-mono"
          >
            <span className="text-2xl">{stages[currentStage]?.icon}</span>
            <span>{stages[currentStage]?.text}</span>
          </motion.div>

          {/* Progress visualization */}
          <div className="w-96 max-w-full mx-auto space-y-4">
            {/* Main progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-cyan-300 font-mono">
                <span>LOADING_SYSTEM</span>
                <span>{Math.round(progress).toString().padStart(3, '0')}%</span>
              </div>
              <div className="w-full bg-gray-800 border border-cyan-500/30 h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 0 10px rgba(0,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                >
                  {/* Scanning effect */}
                  <motion.div
                    className="absolute top-0 right-0 w-6 h-full bg-white/40 blur-sm"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Stage indicators */}
            <div className="flex justify-between">
              {stages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full border-2 ${
                    index <= currentStage 
                      ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]' 
                      : 'bg-gray-700 border-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: index <= currentStage ? [1, 1.2, 1] : 1,
                    opacity: index <= currentStage ? 1 : 0.5
                  }}
                  transition={{
                    scale: { duration: 0.3, delay: index * 0.1 },
                    opacity: { duration: 0.3 }
                  }}
                />
              ))}
            </div>
          </div>

          {/* System status */}
          <motion.div
            className="text-center space-y-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-green-400 font-mono text-sm">
              [SYSTEM STATUS: OPERATIONAL]
            </div>
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner tech decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-8 left-8"
      >
        <div className="w-16 h-16 border-l-2 border-t-2 border-cyan-400">
          <div className="w-4 h-4 bg-cyan-400 rounded-full absolute -top-2 -left-2"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8"
      >
        <div className="w-16 h-16 border-r-2 border-b-2 border-purple-400">
          <div className="w-4 h-4 bg-purple-400 rounded-full absolute -bottom-2 -right-2"></div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderCorporateVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-xl">
            <span className="text-4xl font-bold text-white">AP</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-4 tracking-tight"
        >
          ALPIAN PORTOFOLIO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl text-gray-600 mb-12 font-light"
        >
          Professional Web Solutions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-80 mx-auto"
        >
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                <span>{stages[currentStage]?.text}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderCreativeVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-40 h-40">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transform rotate-45"></div>
            <div className="absolute inset-4 bg-white rounded-full transform -rotate-45 flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transform rotate-45">
                AP
              </span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="text-6xl font-bold text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          ALPIAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-2xl text-white/90 mb-12 font-light"
        >
          Creative Digital Artist
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-4"
        >
          <div className="text-white/80 text-lg font-medium">
            {stages[currentStage]?.text} {stages[currentStage]?.icon}
          </div>

          <div className="w-80 mx-auto bg-white/20 rounded-full p-1 backdrop-blur-sm">
            <motion.div
              className="h-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-end pr-3"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white text-sm font-bold">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderElegantVariant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Subtle particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent mx-auto mb-8"></div>

          <h1 className="text-6xl font-thin text-white mb-4 tracking-[0.3em] uppercase">
            Alpian
          </h1>

          <div className="w-24 h-px bg-white mx-auto mb-8"></div>

          <p className="text-xl text-gray-300 font-light tracking-wide">
            Digital Portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-8"
        >
          <div className="text-gray-400 text-sm font-light tracking-wider uppercase">
            {stages[currentStage]?.text}
          </div>

          <div className="w-64 mx-auto">
            <div className="w-full h-px bg-gray-800 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return renderVariant();
};

export default ProfessionalSplashScreen;
