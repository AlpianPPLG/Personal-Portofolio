import {
  Code,
  Palette,
  Zap,
  Globe,
  Coffee,
  Heart,
  Brain,
  Rocket,
  Target,
} from "lucide-react";

const About = () => {
  const skills = [
    {
      name: "Web Development",
      icon: Code,
      color: "text-blue-500",
      description: "Building responsive web applications",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      color: "text-purple-500",
      description: "Creating intuitive user interfaces",
    },
    {
      name: "Fast Performance",
      icon: Zap,
      color: "text-yellow-500",
      description: "Optimizing for speed and efficiency",
    },
    {
      name: "Global Reach",
      icon: Globe,
      color: "text-green-500",
      description: "Building for worldwide audience",
    },
    {
      name: "Problem Solving",
      icon: Brain,
      color: "text-red-500",
      description: "Finding creative solutions",
    },
    {
      name: "Goal Oriented",
      icon: Target,
      color: "text-indigo-500",
      description: "Focused on achieving results",
    },
  ];

  const stats = [
    { icon: Coffee, value: "200+", label: "Projects Completed" },
    { icon: Heart, value: "50+", label: "Happy Clients" },
    { icon: Rocket, value: "3+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
            About Me
          </h2>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate about creating beautiful and functional digital
            experiences that make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <img
                src="/img/Foto.jpg"
                alt="Developer workspace"
                className="rounded-lg shadow-2xl transform transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hi, I'm Alpian. Nice to meet you.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I'm a Full Stack Developer with over 3 years of experience building
              end-to-end web applications. I combine strong frontend skills
              (React, TypeScript, Tailwind) with solid backend fundamentals
              (Node.js, REST APIs) to deliver scalable and maintainable products.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              My approach blends clean architecture, accessible UI, and
              performance-first thinking. I love shipping features that feel great
              to use and are a joy to maintain for teams.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition duration-500 hover:-translate-y-2"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition duration-500`}
                >
                  <skill.icon className={`w-8 h-8 ${skill.color}`} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
