"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { label: "Years of Experience", value: "3+" },
    { label: "Complete Project", value: "220+" },
    { label: "Client", value: "60+" },
  ];

  return (
    <div
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden pt-20"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Section */}
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white"
          >
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-2xl mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
              >
                Full Stack Developer
              </motion.h2>
              <motion.h1
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold"
              >
                Alpian
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 mt-4"
              />
            </div>

            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300"
            >
              Full-stack developer with 3+ years building end-to-end, high-performance web apps. I work across the stack—React & TypeScript on the front end, Node.js and APIs on the back end—with a strong focus on clean UI, performance, and DX.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-300 px-6 py-3 rounded-full text-black font-medium hover:from-yellow-300 hover:to-yellow-200 transition-all duration-300"
              >
                <a
                  href={`https://wa.me/+628125844194`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-lg">Let's talk</span>
                </a>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>

              <motion.button
                variants={fadeInUp}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resume')}
                className="group flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-lg">View Resume</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Center Section - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `perspective(1000px) rotateX(${
                mousePosition.y * 0.05
              }deg) rotateY(${mousePosition.x * 0.05}deg)`,
            }}
            className="relative w-full max-w-md mx-auto lg:max-w-full"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <img
                src="/img/Foto.jpg"
                alt="Alpian profile"
                className="relative rounded-lg shadow-2xl w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Right Section - Stats */}
          <div className="space-y-12 text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: index * 0.2 + 0.6 }}
                className="text-right"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                  className="text-lg text-gray-300"
                >
                  {stat.label}
                </motion.p>
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.2 + 1,
                  }}
                  className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
