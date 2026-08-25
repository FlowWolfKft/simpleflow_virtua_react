import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Brand from './Brand'

const links = [
  ['#services', 'Szolgáltatások'],
  ['#packages', 'Csomagok'],
  ['#about', 'Rólam'],
  ['#contact', 'Kapcsolat'],
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Simple Flow – főoldal">
          <Brand />
        </a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Fő navigáció">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="button button-small" href="#contact" onClick={() => setOpen(false)}>Konzultáció</a>
        </nav>
      </div>
    </header>
  )
}
