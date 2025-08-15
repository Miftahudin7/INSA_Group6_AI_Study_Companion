import { BookOpen, Calculator, Atom, Beaker, Heart, Globe } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: React.ComponentType<any>;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  studyTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  topics: string[];
  recentActivity: {
    type: 'note' | 'quiz' | 'lesson';
    title: string;
    date: string;
  }[];
}

export const subjects: Subject[] = [
  {
    id: 'english',
    name: 'English Literature',
    color: '#3B82F6',
    icon: BookOpen,
    progress: 68,
    totalLessons: 25,
    completedLessons: 17,
    nextLesson: 'Shakespeare: Hamlet Analysis',
    studyTime: '12h 30m',
    difficulty: 'Intermediate',
    description: 'Explore classic and contemporary literature, poetry analysis, and creative writing techniques.',
    topics: ['Poetry Analysis', 'Shakespeare', 'Modern Literature', 'Creative Writing'],
    recentActivity: [
      { type: 'note', title: 'Romeo & Juliet Character Analysis', date: '2 hours ago' },
      { type: 'quiz', title: 'Poetry Forms Quiz', date: 'Yesterday' },
      { type: 'lesson', title: 'Metaphor and Symbolism', date: '3 days ago' },
    ],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: '#10B981',
    icon: Calculator,
    progress: 84,
    totalLessons: 30,
    completedLessons: 25,
    nextLesson: 'Calculus: Integration by Parts',
    studyTime: '18h 45m',
    difficulty: 'Advanced',
    description: 'Master algebra, geometry, calculus, and statistical analysis for advanced problem-solving.',
    topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'],
    recentActivity: [
      { type: 'quiz', title: 'Derivatives Practice', date: '1 hour ago' },
      { type: 'note', title: 'Integration Techniques', date: '4 hours ago' },
      { type: 'lesson', title: 'Chain Rule Applications', date: 'Yesterday' },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    color: '#8B5CF6',
    icon: Atom,
    progress: 45,
    totalLessons: 28,
    completedLessons: 12,
    nextLesson: 'Quantum Mechanics Basics',
    studyTime: '8h 20m',
    difficulty: 'Advanced',
    description: 'Understand the fundamental laws of nature, from classical mechanics to quantum physics.',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics'],
    recentActivity: [
      { type: 'lesson', title: 'Wave-Particle Duality', date: '3 hours ago' },
      { type: 'note', title: 'Energy Conservation Laws', date: 'Yesterday' },
      { type: 'quiz', title: 'Motion & Forces', date: '2 days ago' },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: '#F59E0B',
    icon: Beaker,
    progress: 72,
    totalLessons: 22,
    completedLessons: 16,
    nextLesson: 'Organic Chemistry: Alkenes',
    studyTime: '14h 15m',
    difficulty: 'Intermediate',
    description: 'Explore chemical reactions, molecular structures, and the periodic table.',
    topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
    recentActivity: [
      { type: 'note', title: 'Chemical Bonding Types', date: '30 minutes ago' },
      { type: 'lesson', title: 'Redox Reactions', date: '2 hours ago' },
      { type: 'quiz', title: 'Periodic Table Trends', date: 'Yesterday' },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    color: '#EF4444',
    icon: Heart,
    progress: 56,
    totalLessons: 26,
    completedLessons: 14,
    nextLesson: 'Cell Division: Mitosis & Meiosis',
    studyTime: '10h 50m',
    difficulty: 'Beginner',
    description: 'Study living organisms, from cellular biology to ecosystems and evolution.',
    topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Anatomy'],
    recentActivity: [
      { type: 'quiz', title: 'DNA Structure & Function', date: '1 hour ago' },
      { type: 'note', title: 'Photosynthesis Process', date: '5 hours ago' },
      { type: 'lesson', title: 'Enzyme Kinetics', date: 'Yesterday' },
    ],
  },
  {
    id: 'history',
    name: 'World History',
    color: '#06B6D4',
    icon: Globe,
    progress: 38,
    totalLessons: 24,
    completedLessons: 9,
    nextLesson: 'Industrial Revolution Impact',
    studyTime: '6h 40m',
    difficulty: 'Beginner',
    description: 'Journey through human civilization, exploring major events and cultural developments.',
    topics: ['Ancient Civilizations', 'Medieval Period', 'Modern History', 'World Wars'],
    recentActivity: [
      { type: 'note', title: 'French Revolution Timeline', date: '2 hours ago' },
      { type: 'lesson', title: 'Roman Empire Expansion', date: 'Yesterday' },
      { type: 'quiz', title: 'World War I Causes', date: '3 days ago' },
    ],
  },
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};