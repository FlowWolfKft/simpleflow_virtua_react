import { Link } from 'react-router-dom'
import Brand from './Brand'

const socials = [
  [
    'https://www.facebook.com/profile.php?id=100088909942906',
    '/assets/facebook.svg',
    'Facebook',
  ],
  [
    'https://www.instagram.com/simpleflowva/',
    '/assets/instagram.svg',
    'Instagram',
  ],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Brand className="footer-logo" /><p>Modern megoldások és stabil asszisztencia a vállalkozásod mögött.</p></div>
        <div><h3>Hasznos linkek</h3><Link to="/impresszum">Impresszum</Link><Link to="/adatkezeles">Adatkezelési tájékoztató</Link><a href="https://pixelliberty.hu" target="_blank" rel="noreferrer">pixelliberty.hu</a></div>
        <div><h3>Kövess</h3><div className="socials">{socials.map(([href, src, label]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><img src={src} alt="" /></a>)}</div></div>
      </div>
      <p className="copyright">
  © {new Date().getFullYear()} Simple Flow – minden jog fenntartva
  {' · '}
  Készítette:{' '}
  <a
    href="https://pixelliberty.hu"
    target="_blank"
    rel="noreferrer"
  >
    Pixelliberty
  </a>
</p>
    </footer>
  )
}
