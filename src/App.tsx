import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X, Play, Volume2, Clapperboard, Aperture, MoveUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, projects, type Project } from './data/site'
import ProjectModal from './components/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const services = [
  ['01', 'Video editing', 'Story-first editing, precise pacing, and a clear emotional arc.'],
  ['02', 'Motion design', 'Purposeful animation, kinetic typography, and graphic systems.'],
  ['03', 'Brand films', 'Distinctive visual stories built around a brand’s point of view.'],
  ['04', 'Social content', 'Platform-ready reels and short-form films designed to hold attention.'],
  ['05', 'Color grading', 'A considered color language that gives every frame its own atmosphere.'],
  ['06', 'Sound design', 'Texture, transitions, and sound-led detail that make visuals feel alive.'],
]

const process = [
  ['01', 'DISCOVER', 'We define the brief, audience, objectives, and the feeling the film should leave behind.'],
  ['02', 'SHAPE', 'We build the story, gather references, and map the visual direction before editing begins.'],
  ['03', 'CRAFT', 'Footage, motion, sound, and pacing come together through focused creative iterations.'],
  ['04', 'FINISH', 'We refine color, mix, details, and delivery formats until every frame feels intentional.'],
]

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [showreelOpen, setShowreelOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [formValues, setFormValues] = useState({ name: '', email: '', project: '' })
  const heroRef = useRef<HTMLElement>(null)
  const reelVideoRef = useRef<HTMLVideoElement>(null)

  const closeShowreel = useCallback(() => {
    setShowreelOpen(false)
    reelVideoRef.current?.pause()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title .line-inner, .hero-description, .hero-actions, .hero-foot', {
        y: 38, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.12,
      })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((el) => {
        gsap.fromTo(el, { y: 45, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!showreelOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeShowreel() }
    window.addEventListener('keydown', onKey)
    reelVideoRef.current?.play().catch(() => undefined)
    return () => window.removeEventListener('keydown', onKey)
  }, [showreelOpen, closeShowreel])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${formValues.name}`)
    const body = encodeURIComponent(`Name: ${formValues.name}\nEmail: ${formValues.email}\n\nProject brief:\n${formValues.project}`)
    setFormStatus('Opening your email app to send the enquiry…')
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const scrollTo = (id: string) => {
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main ref={heroRef}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${site.brand} home`}><span className="brand-mark"><Aperture size={19} strokeWidth={1.7} /></span>{site.brand}<span className="brand-period">.</span></a>
        <nav className={`desktop-nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Main navigation">
          {['work', 'services', 'about', 'contact'].map((item) => <a key={item} href={`#${item}`} onClick={() => setMobileMenu(false)}>{item}</a>)}
        </nav>
        <a className="header-cta" href="#contact">LET'S TALK <ArrowUpRight size={15} /></a>
        <button className="mobile-menu-button icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? 'Close menu' : 'Open menu'}>{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top" aria-label="Introduction">
        <div className="hero-media">
          <video className="hero-video" autoPlay muted loop playsInline poster={site.heroPoster} preload="metadata" aria-hidden="true">
            <source src={site.heroVideo} type="video/mp4" />
          </video>
          <div className="hero-image-fallback" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content page-gutter">
          <div className="hero-kicker"><span className="status-dot" /> INDEPENDENT CREATIVE / AVAILABLE FOR PROJECTS</div>
          <h1 className="hero-title"><span className="line"><span className="line-inner">CRAFTING</span></span><span className="line"><span className="line-inner">VISUAL</span></span><span className="line title-last"><span className="line-inner">EXPERIENCES<span className="orange-period">.</span></span></span></h1>
          <p className="hero-description">VIDEO EDITOR <i>·</i> MOTION DESIGNER <i>·</i> VISUAL STORYTELLER</p>
          <div className="hero-actions"><button className="button button-light" onClick={() => scrollTo('work')}>EXPLORE MY WORK <ArrowUpRight size={17} /></button><button className="button button-ghost" onClick={() => scrollTo('contact')}>LET'S CREATE SOMETHING <ArrowDownRight size={17} /></button></div>
        </div>
        <div className="hero-foot page-gutter"><span>STORIES IN MOTION. FEELING IN EVERY FRAME.</span><button onClick={() => scrollTo('work')}>SCROLL TO EXPLORE <ArrowDown size={14} /></button><span className="hero-index">01 — 05</span></div>
      </section>

      <section className="intro-section page-gutter">
        <p className="eyebrow" data-reveal><span className="eyebrow-line" /> THE ART OF THE CUT</p>
        <div className="intro-grid" data-reveal><h2>Every frame has a purpose.<br /><span>Every cut, a feeling.</span></h2><p>Turning raw footage into cinematic stories that capture attention, communicate emotion, and leave a lasting impression. Built on instinct, shaped by detail, finished with intention.</p></div>
        <div className="intro-bottom"><span>EDIT WITH INTENTION</span><span>01 / THE APPROACH</span></div>
      </section>

      <section className="work-section page-gutter" id="work">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="eyebrow-line" /> SELECTED WORK</p><h2>THE FRAME<br /><span>IS YOURS.</span></h2></div><p className="section-note">A selection of visual explorations.<br />Each project begins with a feeling.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => <button className={`project-card project-card-${index + 1}`} key={project.id} onClick={() => setActiveProject(project)} aria-label={`View project ${project.title}`}>
            <div className="project-image-wrap"><img src={project.image} alt="" loading="lazy" /><div className="project-image-shade" /><span className="project-number">0{index + 1} / 0{projects.length}</span><span className="project-view">VIEW PROJECT <ArrowUpRight size={16} /></span><span className="project-play"><Play size={18} fill="currentColor" /></span></div>
            <div className="project-info"><div><h3>{project.title}</h3><p>{project.category}</p></div><span>{project.year}</span></div>
            {project.sample && <span className="sample-tag">SAMPLE PROJECT</span>}
          </button>)}
        </div>
        <p className="gallery-disclaimer">Portfolio imagery is illustrative sample content. Replace with your own work before publishing.</p>
      </section>

      <section className="showreel-section">
        <div className="showreel-bg" style={{ backgroundImage: `url("${site.heroPoster}")` }} />
        <div className="showreel-overlay" />
        <div className="showreel-content page-gutter" data-reveal><p className="eyebrow"><span className="eyebrow-line" /> THE SHOWREEL / 2025—26</p><h2>LESS TALK.<br /><span>MORE CINEMA.</span></h2><button className="reel-play-button" onClick={() => setShowreelOpen(true)} aria-label="Open showreel player"><Play fill="currentColor" size={23} /></button><p className="reel-caption">A moving collection of moments, rhythm, and light.</p></div>
        <span className="showreel-side-label">A VISUAL STATEMENT — NOT JUST A MONTAGE</span>
      </section>

      <section className="services-section page-gutter" id="services">
        <div className="section-heading services-heading" data-reveal><div><p className="eyebrow"><span className="eyebrow-line" /> WHAT I BRING TO THE FRAME</p><h2>MADE TO<br /><span>MOVE YOU.</span></h2></div><p className="section-note">From the first rough cut to the final color pass — every detail serves the story.</p></div>
        <div className="service-list">{services.map(([number, title, description]) => <div className="service-row" key={number} data-reveal><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={20} /></div>)}</div>
      </section>

      <section className="about-section page-gutter" id="about">
        <div className="about-visual" data-reveal><img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1300&q=85" alt="Cinematic editing room with a film screen" loading="lazy" /><span className="about-image-label">IN PURSUIT OF THE PERFECT FRAME</span><span className="about-image-index">FIG. 01</span></div>
        <div className="about-copy" data-reveal><p className="eyebrow"><span className="eyebrow-line" /> BEHIND THE FRAME</p><h2>BEHIND EVERY FRAME,<br /><span>THERE'S A STORY.</span></h2><p className="about-description">I'm a video editor and motion designer passionate about transforming raw footage into meaningful visual experiences. I combine storytelling, rhythm, sound, color, and motion to create work that captures attention and stays memorable.</p><p className="about-description muted">For me, great editing is more than a sequence of cuts. It's knowing what to show, what to hold, and when to let a moment breathe.</p><a href="#contact" className="text-link">LET'S MAKE SOMETHING MATTER <ArrowUpRight size={16} /></a><div className="about-signature"><span>{site.name}</span><span>EDITOR / STORYTELLER</span></div></div>
      </section>

      <section className="process-section page-gutter">
        <div className="process-header" data-reveal><p className="eyebrow"><span className="eyebrow-line" /> THE METHOD</p><h2>FROM FIRST THOUGHT<br />TO <span>FINAL FRAME.</span></h2><p>Good work doesn't happen by accident. It happens through curiosity, collaboration, and care.</p></div>
        <div className="process-list">{process.map(([number, title, description]) => <div className="process-row" key={number} data-reveal><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p><ArrowDownRight className="process-icon" size={21} /></div>)}</div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-backdrop" />
        <div className="contact-content page-gutter">
          <div className="contact-title" data-reveal><p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</p><h2>HAVE A STORY<br /><span>WORTH TELLING?</span></h2><p>Let's turn your next idea into something unforgettable.</p></div>
          <div className="contact-grid">
            <div className="contact-aside" data-reveal><span className="contact-big-arrow"><MoveUpRight size={40} strokeWidth={1} /></span><p>Have a project in mind, a collaboration to explore, or just want to talk about the craft?</p><a className="contact-email" href={`mailto:${site.email}`}>{site.email} <ArrowUpRight size={17} /></a><span className="eyebrow contact-response"><span className="status-dot" /> OPEN FOR SELECT PROJECTS</span></div>
            <form className="contact-form" onSubmit={handleSubmit} data-reveal><label>Your name<input required minLength={2} value={formValues.name} onChange={e => setFormValues({ ...formValues, name: e.target.value })} placeholder="How should I call you?" /></label><label>Email address<input required type="email" value={formValues.email} onChange={e => setFormValues({ ...formValues, email: e.target.value })} placeholder="you@company.com" /></label><label>Tell me about your project<textarea required minLength={10} rows={3} value={formValues.project} onChange={e => setFormValues({ ...formValues, project: e.target.value })} placeholder="A few words about your idea, timeline, or vision…" /></label><button className="button button-light submit-button" type="submit">START A PROJECT <ArrowUpRight size={17} /></button><p className="form-note" aria-live="polite">{formStatus || 'This form opens your email app. Configure site.email in src/data/site.ts.'}</p></form>
          </div>
        </div>
      </section>

      <footer className="site-footer page-gutter"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Aperture size={18} /></span>{site.brand}<span className="brand-period">.</span></a><span className="footer-tagline">MADE OF MOMENTS. BUILT TO MOVE.</span><div className="footer-socials"><a href={site.instagram} target="_blank" rel="noreferrer">IG <ArrowUpRight size={12} /></a><a href={site.youtube} target="_blank" rel="noreferrer">YT <ArrowUpRight size={12} /></a><a href={site.vimeo} target="_blank" rel="noreferrer">VM <ArrowUpRight size={12} /></a><a href={site.linkedin} target="_blank" rel="noreferrer">IN <ArrowUpRight size={12} /></a></div><span className="copyright">© {new Date().getFullYear()} {site.name}. ALL RIGHTS RESERVED.</span><button className="back-top" onClick={() => scrollTo('top')}>BACK TO TOP <ArrowUpRight size={14} /></button></footer>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      {showreelOpen && <div className="showreel-modal" role="dialog" aria-modal="true" aria-label="Showreel player"><button className="showreel-close icon-button" onClick={closeShowreel} aria-label="Close showreel"><X size={24} /></button>{site.showreelVideo ? <video ref={reelVideoRef} src={site.showreelVideo} controls autoPlay playsInline /> : <div className="showreel-empty"><Clapperboard size={42} strokeWidth={1} /><p className="eyebrow">SHOWREEL NOT CONFIGURED</p><h2>YOUR BEST WORK<br />GOES HERE.</h2><p>Add your showreel file to <code>public/media/showreel.mp4</code> and set <code>showreelVideo: '/media/showreel.mp4'</code> in <code>src/data/site.ts</code>.</p><button className="button button-light" onClick={closeShowreel}>BACK TO PORTFOLIO <ArrowRight size={16} /></button></div>}</div>}
      <div className="sound-note"><Volume2 size={12} /> SOUND ON IN PROJECTS</div>
    </main>
  )
}

export default App
