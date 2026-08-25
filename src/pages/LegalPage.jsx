import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function LegalPage() {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/legal/adatkezeles.html').then(response => response.text()).then(html => setContent(html.replace(/\sonclick="[^"]*"/g, '')))
  }, [])
  return <main className="legal-page"><div className="container"><p className="eyebrow">Jogi információk</p><h1>Adatkezelési tájékoztató</h1><article className="legal-card legal-content" dangerouslySetInnerHTML={{ __html: content }} /><Link className="button button-outline" to="/">Vissza a főoldalra</Link></div></main>
}
