export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
  icon?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

// Work Experience Data
export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Company',
    location: 'Remote',
    startDate: '2023-01',
    endDate: '',
    current: true,
    description: [
      'Developed and maintained responsive web applications using React and TypeScript',
      'Collaborated with design team to implement pixel-perfect UI components',
      'Optimized application performance, reducing load time by 40%',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Git'],
  },
  {
    id: '2',
    title: 'Web Developer Intern',
    company: 'Digital Agency',
    location: 'Jakarta, Indonesia',
    startDate: '2022-06',
    endDate: '2022-12',
    current: false,
    description: [
      'Built client websites using HTML, CSS, JavaScript, and React',
      'Implemented responsive designs and cross-browser compatibility',
      'Worked with RESTful APIs and integrated third-party services',
      'Participated in agile development process and daily standups',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
  },
];

// Education Data
export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Computer Science',
    school: 'University Of Mulawarman',
    location: 'Indonesia',
    startDate: '2026-07',
    endDate: '2029-07',
    current: false,
    description: 'Focused on Software Engineering and Web Development',
    gpa: '3.8/4.0',
  },
  {
    id: '2',
    degree: 'High School',
    school: 'SMKN 7 Samarinda',
    location: 'Indonesia',
    startDate: '2023-07',
    endDate: '2026-07',
    current: false,
    description: 'Major in Software Engineering (PPLG - Pengembangan Perangkat Lunak dan Gim)',
  },
];

// Skills Data
export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', level: 90, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 85, category: 'Frontend' },
  { id: '3', name: 'JavaScript', level: 90, category: 'Frontend' },
  { id: '4', name: 'HTML5/CSS3', level: 95, category: 'Frontend' },
  { id: '5', name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { id: '6', name: 'Framer Motion', level: 80, category: 'Frontend' },

  // Backend
  { id: '7', name: 'Node.js', level: 75, category: 'Backend' },
  { id: '8', name: 'REST APIs', level: 80, category: 'Backend' },
  { id: '9', name: 'MongoDB', level: 70, category: 'Backend' },

  // Tools
  { id: '10', name: 'Git & GitHub', level: 85, category: 'Tools' },
  { id: '11', name: 'Vite', level: 85, category: 'Tools' },
  { id: '12', name: 'VS Code', level: 90, category: 'Tools' },
  { id: '13', name: 'Figma', level: 75, category: 'Tools' },

  // Soft Skills
  { id: '14', name: 'Problem Solving', level: 90, category: 'Soft Skills' },
  { id: '15', name: 'Team Collaboration', level: 85, category: 'Soft Skills' },
  { id: '16', name: 'Communication', level: 80, category: 'Soft Skills' },
];

// Certifications Data
export const certifications: Certification[] = [
  {
    id: '1',
    name: 'React Developer Certification',
    issuer: 'Meta/Facebook',
    date: '2023-08',
    credentialId: 'REACT-2023-12345',
    url: 'https://www.coursera.org/',
  },
  {
    id: '2',
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2022-12',
    url: 'https://www.freecodecamp.org/',
  },
  {
    id: '3',
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2022-06',
    url: 'https://www.freecodecamp.org/',
  },
];

// Achievements Data
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Hackathon Winner',
    description: 'Won 1st place in Web Development Competition',
    date: '2023-11',
  },
  {
    id: '2',
    title: 'Open Source Contributor',
    description: 'Contributed to multiple open-source projects on GitHub',
    date: '2023-ongoing',
  },
  {
    id: '3',
    title: 'Portfolio Excellence',
    description: 'Featured portfolio on design showcase platforms',
    date: '2023-08',
  },
  {
    id: '4',
    title: 'Best Student Project',
    description: 'Awarded best final year project in Computer Science',
    date: '2024-05',
  },
];

// Personal Info
export const personalInfo = {
  name: 'Alpian',
  title: 'Full Stack Developer',
  email: 'Nova07pplg@gmail.com',
  phone: '+62 812-5844-194',
  location: 'Indonesia',
  website: 'https://alpian-porto.vercel.app/',
  github: 'https://github.com/AlpianPPLG',
  linkedin: 'https://www.linkedin.com/in/alpian-alpian-7a16522bb/',
  summary: 'Full-stack developer specializing in React, TypeScript, Node.js, and modern web tooling. I build end-to-end, scalable applications with clean architecture, accessible UI, and a strong focus on performance and developer experience.',
};
