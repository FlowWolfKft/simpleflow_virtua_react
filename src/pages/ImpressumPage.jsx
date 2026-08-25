import { Link } from 'react-router-dom'

export default function ImpressumPage() {
  return <main className="legal-page"><div className="container"><p className="eyebrow">Jogi információk</p><h1>Impresszum</h1><article className="legal-card"><h2>Tulajdonos és tárhelyszolgáltató</h2><ul><li>Név: Flow-Wolf Kft.</li><li>Székhely: 1031 Budapest, Vízimolnár utca 24. 3. em. 8.</li><li>Adószám: 14805080-2-41</li><li>Cégjegyzékszám: 01-09-920694</li><li>Nyilvántartásba vevő hatóság: Fővárosi Cégbíróság</li><li>E-mail: info@flowwolf.hu</li></ul></article><Link className="button button-outline" to="/">Vissza a főoldalra</Link></div></main>
}
