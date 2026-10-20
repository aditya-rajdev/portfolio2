// Update this file to personalize the portfolio and replace sample media.
export const site = {
  brand: 'FRAME',
  name: 'Your Name',
  role: 'Independent Video Editor & Motion Designer',
  email: 'hello@example.com',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
  vimeo: 'https://vimeo.com/',
  linkedin: 'https://linkedin.com/',
  heroVideo: 'https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4',
  heroPoster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=85',
  showreelVideo: '', // Add your real showreel URL or /media/showreel.mp4
}

export type Project = {
  id: number
  title: string
  category: string
  year: string
  description: string
  role: string
  tools: string
  image: string
  video?: string
  sample?: boolean
}

export const projects: Project[] = [
  {
    id: 1, title: 'After the Light', category: 'CINEMATIC FILM', year: '2025',
    description: 'A sample cinematic study in atmosphere, contrast, and visual rhythm.',
    role: 'Editing concept · Color direction', tools: 'Premiere Pro · DaVinci Resolve',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1500&q=85',
    sample: true,
  },
  {
    id: 2, title: 'Motion / Matter', category: 'MOTION DESIGN', year: '2025',
    description: 'An experimental visual direction exploring shape, pace, and movement.',
    role: 'Concept · Motion design', tools: 'After Effects · Illustrator',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1500&q=85',
    sample: true,
  },
  {
    id: 3, title: 'Built for the Night', category: 'SPEC COMMERCIAL', year: '2024',
    description: 'A sample commercial treatment with dramatic light and precise pacing.',
    role: 'Edit concept · Sound direction', tools: 'Premiere Pro · DaVinci Resolve',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1500&q=85',
    sample: true,
  },
  {
    id: 4, title: 'No Fixed Route', category: 'TRAVEL FILM', year: '2024',
    description: 'A sample travel-film concept built around movement and discovery.',
    role: 'Editing concept · Color direction', tools: 'Premiere Pro · DaVinci Resolve',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85',
    sample: true,
  },
  {
    id: 5, title: 'Frequency', category: 'MUSIC VISUAL', year: '2024',
    description: 'A sample music-led visual concept focused on rhythm and texture.',
    role: 'Edit concept · Visual treatment', tools: 'After Effects · Premiere Pro',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1500&q=85',
    sample: true,
  },
]
