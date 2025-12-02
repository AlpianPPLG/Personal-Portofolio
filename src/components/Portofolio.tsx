import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories, techStacks } from "../data/projects";
import { ProjectCard } from "./ui/ProjectCard";
import { ProjectModal } from "./ui/ProjectModal";
import { ProjectFilter } from "./ui/ProjectFilter";
import { PortfolioCardSkeleton } from "./ui/Skeleton";
import { ProgressiveLoader } from "./ui/BlurImage";
import type { Project } from "../types";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeCategory, selectedTechStacks, searchTerm]);

  // Reset loading when filters change
  useEffect(() => {
    if (activeCategory !== "All" || selectedTechStacks.length > 0 || searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeCategory, selectedTechStacks, searchTerm]);

  // Handle tech stack filter toggle
  const handleTechStackChange = (tech: string) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchTerm("");
    setSelectedTechStacks([]);
  };

  // Filter projects based on category, search, and tech stack
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTechStack =
        selectedTechStacks.length === 0 ||
        selectedTechStacks.every((tech) =>
          project.techStack?.includes(tech)
        );

      return matchesCategory && matchesSearch && matchesTechStack;
    });
  }, [activeCategory, searchTerm, selectedTechStacks]);
  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
            Portfolio
          </h2>
          <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Featured Projects
          </p>
          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Explore my latest work and interactive projects
          </p>
        </div>

        {/* Filter & Search */}
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          techStacks={techStacks}
          selectedTechStacks={selectedTechStacks}
          onTechStackChange={handleTechStackChange}
          onClearFilters={handleClearFilters}
        />

        {/* Results count */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </p>

        {/* Portfolio Grid with AnimatePresence for smooth transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 6 }, (_, index) => (
                <ProgressiveLoader
                  key={`skeleton-${index}`}
                  isLoading={true}
                  skeleton={<PortfolioCardSkeleton />}
                  delay={index * 100}
                >
                  <div />
                </ProgressiveLoader>
              ))
            ) : (
              // Show actual portfolio cards
              filteredProjects.map((project, index) => (
                <ProgressiveLoader
                  key={project.id}
                  isLoading={false}
                  skeleton={<PortfolioCardSkeleton />}
                  delay={index * 150}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </ProgressiveLoader>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No projects found matching your criteria
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Portfolio;
