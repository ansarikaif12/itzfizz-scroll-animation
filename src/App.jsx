
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '58%', label: 'Less time spent searching' },
  { value: '23%', label: 'Improvement in efficiency' },
  { value: '27%', label: 'Better user engagement' },
  { value: '40%', label: 'Faster decision making' },
]

export default function App() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.7 })
        .from('.hero-title', { y: 35, duration: 0.9 }, '-=0.35')
        .from('.stat-card', {
          y: 20,
          opacity: 0,
          duration: 0.65,
          stagger: 0.15,
        }, '-=0.3')


      const drive = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      drive
        .to('.car', {
          x: () => {
            const road = sectionRef.current.querySelector('.road')
            const car = sectionRef.current.querySelector('.car')
            return road.clientWidth - car.offsetWidth
          },
          ease: 'none',
        }, 0)
        .to('.green-trail', {
          width: () => {
            const road = sectionRef.current.querySelector('.road')
            return road.clientWidth - 65
          },
          ease: 'none',
        }, 0)




        .fromTo(
          '.reveal-letter',
          {
            opacity: 0.35,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            ease: 'none',
          },
          0
        )




    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <section className="hero" ref={sectionRef}>
        <nav className="navbar">
          <a href="#" className="brand">itz<span>fizz.</span></a>
          <span className="nav-label">CREATIVE DIGITAL EXPERIENCE</span>
          <a href="#about" className="menu-link">EXPLORE ↗</a>
        </nav>

        <div className="hero-content">
          <p className="hero-eyebrow">DRIVE THE CHANGE · 2026</p>


          <h1 className="hero-title">
            <span className="title-line">
              {'WELCOME'.split('').map((letter, index) => (
                <span className="reveal-letter" key={`welcome-${index}`}>
                  {letter}
                </span>
              ))}
            </span>

            <span className="title-line accent-line">
              {'ITZ FIZZ'.split('').map((letter, index) => (
                <span className="reveal-letter" key={`fizz-${index}`}>
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </h1>


          <p className="hero-description">
            A new perspective. A smoother journey.
            <br />
            Experience every detail as it moves.
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.value}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="road">
          <div className="green-trail" />
          <div className="road-line" />
          <div className="car">
            <img src="/images/car.png.png" alt="Car" />
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-dot" />
          SCROLL TO EXPERIENCE
          <span>↓</span>
        </div>

        <span className="hero-index">01 / 03</span>
      </section>

      <section className="about-section" id="about">
        <p>THE JOURNEY CONTINUES</p>
        <h2>Keep moving forward.</h2>
        <span>Scroll-driven motion. Designed with purpose.</span>
      </section>
    </main>
  )
}
