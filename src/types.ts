export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  category: 'Space & Aerospace' | 'AI & Machine Learning' | 'Cybersecurity & AI' | 'Entrepreneurship';
  badge: string;
  description: string[];
  skills: string[];
  iconName: string;
  color: string;
  interactiveDetails?: {
    type: 'satellite' | 'ml-pipeline' | 'cyber-ids' | 'startup';
    stats: { label: string; value: string }[];
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  tags: string[];
  featured: boolean;
  category: 'AI / Automation' | 'Computer Vision' | 'EdTech' | 'Hardware & Neural';
  githubUrl?: string;
  liveDemoAvailable?: boolean;
  highlights: string[];
  metrics: { label: string; value: string }[];
  icon: string;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    description: string;
    tags?: string[];
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  location?: string;
  category: 'Competition' | 'Ideathon' | 'Research' | 'Technical Presentation';
  description: string;
  icon: string;
  badge: string;
  metrics?: string;
  date?: string;
}

export interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseRadius: number;
  pulsePhase: number;
  type?: 'star' | 'satellite' | 'neuron' | 'packet';
}
