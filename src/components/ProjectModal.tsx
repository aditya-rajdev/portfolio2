import { useEffect } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/site'

type Props = { project: Project | null; onClose: () => void }

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  if (!project) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close project details"><X size={21} /></button>
        <div className="modal-image" style={{ backgroundImage: `url("${project.image}")` }}>
          {project.video && <video src={project.video} controls playsInline autoPlay />}
          {!project.video && <span className="modal-placeholder">PROJECT PREVIEW / REPLACE WITH YOUR FILM</span>}
        </div>
        <div className="modal-copy">
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h2 id="modal-title">{project.title}</h2>
          <p>{project.description}</p>
          <div className="modal-meta"><div><span>CREATIVE ROLE</span><p>{project.role}</p></div><div><span>TOOLS</span><p>{project.tools}</p></div></div>
          {project.sample && <p className="sample-note">SAMPLE CONCEPT — replace with your own work before publishing.</p>}
          <a className="text-link" href="#contact" onClick={onClose}>DISCUSS A PROJECT <ArrowUpRight size={16} /></a>
        </div>
      </section>
    </div>
  )
}