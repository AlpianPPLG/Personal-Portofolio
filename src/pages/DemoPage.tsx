import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/ui/SEO';
import { PortfolioCardSkeleton, ServiceCardSkeleton, TimelineSkeleton } from '../components/ui/Skeleton';
import { BlurImage, ProgressiveLoader } from '../components/ui/BlurImage';
import { CodeShowcase } from '../components/ui/CodePlayground';
import { downloadSitemap, downloadRobotsTxt } from '../utils/sitemapGenerator';
import { Download, Globe, Code, Palette, Zap, FileText } from 'lucide-react';

const DemoPage: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState({
    portfolios: true,
    testimonials: true,
    services: true,
    timeline: true
  });

  // Simulate loading delays
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingStates(prev => ({ ...prev, portfolios: false })), 2000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, services: false })), 3000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, testimonials: false })), 4000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, timeline: false })), 5000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead
        title="Demo Features - Alpian Portfolio"
        description="Demonstration of advanced portfolio features including loading skeletons, progressive images, and interactive code playground."
        keywords={['portfolio demo', 'loading skeletons', 'progressive images', 'code playground']}
      />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Portfolio Features Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore the advanced features implemented in this portfolio including loading skeletons,
            progressive image loading, SEO optimization, and an interactive code playground.
          </p>

          {/* SEO Tools */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={downloadSitemap}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Sitemap
            </button>
            <button
              onClick={downloadRobotsTxt}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download Robots.txt
            </button>
          </div>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-20">
          {/* Loading Skeletons Demo */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
            >
              <Zap className="w-8 h-8 text-yellow-500" />
              Loading Skeletons
            </motion.h2>

            {/* Portfolio Cards */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Portfolio Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <ProgressiveLoader
                    key={i}
                    isLoading={loadingStates.portfolios}
                    skeleton={<PortfolioCardSkeleton />}
                    delay={i * 200}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <BlurImage
                        src={`/public/img/Porto${(i % 6) + 1}.png`}
                        alt={`Project ${i + 1}`}
                        className="h-48"
                        placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          Project {i + 1}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          A showcase project demonstrating modern web development techniques and best practices.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">TypeScript</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Tailwind</span>
                        </div>
                        <div className="flex justify-between">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            View Demo
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            View Code
                          </button>
                        </div>
                      </div>
                    </div>
                  </ProgressiveLoader>
                ))}
              </div>
            </div>

            {/* Service Cards */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Service Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }, (_, i) => (
                  <ProgressiveLoader
                    key={i}
                    isLoading={loadingStates.services}
                    skeleton={<ServiceCardSkeleton />}
                    delay={i * 300}
                  >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {i === 0 && <Code className="w-8 h-8 text-white" />}
                        {i === 1 && <Palette className="w-8 h-8 text-white" />}
                        {i === 2 && <Globe className="w-8 h-8 text-white" />}
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                        {i === 0 && 'Web Development'}
                        {i === 1 && 'UI/UX Design'}
                        {i === 2 && 'SEO Optimization'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Professional service with modern techniques and best practices for optimal results.
                      </p>
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                        Learn More
                      </button>
                    </div>
                  </ProgressiveLoader>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Timeline
              </h3>
              <ProgressiveLoader
                isLoading={loadingStates.timeline}
                skeleton={<TimelineSkeleton />}
                delay={500}
              >
                <div className="relative max-w-3xl">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  {Array.from({ length: 4 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="relative flex items-start space-x-6 pb-8"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative z-10">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Milestone {i + 1}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          2023 - Present
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Achievement description showcasing professional growth and project completion.
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ProgressiveLoader>
            </div>
          </section>

          {/* Progressive Image Loading Demo */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Progressive Image Loading
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-video rounded-lg overflow-hidden shadow-lg"
                >
                  <BlurImage
                    src={`/public/img/Porto${(i % 6) + 1}.png`}
                    alt={`Portfolio Image ${i + 1}`}
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Code Playground Demo */}
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Interactive Code Playground
            </motion.h2>
            <CodeShowcase />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
