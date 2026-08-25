import { MonitorSmartphone, BriefcaseBusiness, Check, ClipboardCheck, Clock3, Palette, Calculator, ShieldCheck } from 'lucide-react'
import Header from '../components/Header'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const benefits = [
  [Clock3, 'Rugalmas együttműködés', 'Eseti vagy állandó megbízással, a vállalkozásod aktuális igényeihez igazodva dolgozunk együtt.'],
  [Calculator, 'Kiszámítható költségek', 'Nincsenek alkalmazotti terhek vagy rejtett költségek: pontosan látod, mire és mennyi időt fordítottam.'],
  [ShieldCheck, 'Megbízható háttérmunka', 'Naprakészen tartom az adminisztratív ügyeket, miközben Te arra koncentrálhatsz, amiben igazán jó vagy.'],
]

const services = [
  { icon: ClipboardCheck, title: 'Teljes körű adminisztráció', items: ['E-mailek és időpontok kezelése', 'Határidős feladatok nyomon követése', 'Kapcsolattartás ügyfelekkel és partnerekkel', 'Könyvelési anyagok összeállítása'] },
  { icon: MonitorSmartphone, title: 'Online felületek kezelése', items: ['Facebook- és Instagram-tartalmak', 'Oldalak és csoportok moderálása', 'Hírlevelek és információs e-mailek', 'Weboldal tartalmak kezelése, szövegírás és blogcikkek készítése'] },
  { icon: Palette, title: 'Arculat, webdesign és weboldal', items: ['Logó- és arculattervezés', 'UX/UI és webdesign', 'Modern React weboldalak', 'Kapcsolódó szolgáltatások a Pixelliberty oldalán'], link: 'https://pixelliberty.hu' },
]

const packages = [
  { name: 'Esszencia', hours: '12 óra / hó', price: '84 000 Ft + ÁFA', text: 'Ha néhány visszatérő háttérfeladatot szeretnél rendszeresen és megbízhatóan kiszervezni.', features: ['Havi 12 órás időkeret', 'Előre egyeztetett adminisztratív feladatok', 'Ütemezett munkavégzés az egyeztetett prioritások szerint'] },
  { name: 'Fókusz', hours: '20 óra / hó', price: '132 000 Ft + ÁFA', text: 'Ha már több területen is szükséged van folyamatos segítségre és kiszámítható háttértámogatásra.', features: ['Havi 20 órás időkeret', 'Többféle adminisztratív és online feladat', 'Rendszeres egyeztetés és feladattervezés'], featured: true },
  { name: 'Prémium', hours: '40 óra / hó', price: '252 000 Ft + ÁFA', text: 'Ha jelentős mennyiségű háttérfeladatot adnál át, és hosszú távú, szorosabb együttműködést keresel.', features: ['Havi 40 órás időkeret', 'Összetett és rendszeresen visszatérő feladatok', 'Kiemelt kapacitás és folyamatos kapcsolattartás'] },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy"><p className="eyebrow">Simple Flow · online vállalkozástámogatás</p><h1>Stabil háttértámogatás, hogy Te a vállalkozásodra koncentrálhass!</h1><p className="hero-lead">Modern online megoldások és megbízható virtuális asszisztencia kevesebb stresszel, átláthatóbb működéssel.</p><div className="hero-actions"><a className="button" href="#contact">Konzultációt kérek!</a><a className="text-link" href="#services">Megnézem a szolgáltatásokat <span aria-hidden="true">→</span></a></div></div>
            <div className="hero-visual"><div className="image-frame"><img src="/assets/hero.webp" alt="Világos, nyugodt irodai környezet laptoppal" /></div><div className="floating-note"><BriefcaseBusiness /><span><strong>10+ év</strong> nagyvállalati tapasztalat</span></div></div>
          </div>
        </section>

        <section className="section benefits-section">
          <div className="container"><SectionHeading eyebrow="Virtuális asszisztencia" title="Több idő arra, ami igazán számít" text="Rugalmas, szerződéses együttműködésben veszem át azokat a háttérfeladatokat, amelyek fontosak, de elviszik a figyelmedet a vállalkozásod lényegéről." /><div className="benefit-grid">{benefits.map(([Icon, title, text]) => <article className="benefit" key={title}><span className="icon-box"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <section id="services" className="section services-section">
          <div className="container"><SectionHeading eyebrow="Szolgáltatások" title="Pont annyi támogatás, amennyire szükséged van" text="A napi adminisztrációtól az online jelenléten át a webes megoldásokig több oldalról segítem a vállalkozásod működését." /><div className="service-grid">{services.map(({ icon: Icon, title, items, link }) => <article className="service-card" key={title}><span className="icon-box"><Icon /></span><h3>{title}</h3><ul>{items.map(item => <li key={item}><Check />{item}</li>)}</ul>{link && <a className="text-link" href={link} target="_blank" rel="noreferrer">Tovább a Pixelliberty oldalára →</a>}</article>)}</div></div>
        </section>

        <section id="packages" className="section packages-section">
          <div className="container"><SectionHeading eyebrow="Csomagajánlatok" title="Kiszámítható keretek, átlátható díjazás" text="Az első online konzultáció minden esetben díjmentes. Ha egyik csomag sem pontosan neked való, személyre szabott ajánlatot készítek." /><div className="package-grid">{packages.map(pkg => <article className={`package-card${pkg.featured ? ' featured' : ''}`} key={pkg.name}>{pkg.featured && <span className="package-badge">Legnépszerűbb</span>}<p className="eyebrow">{pkg.hours}</p><h3>{pkg.name}</h3><p>{pkg.text}</p><ul>{pkg.features.map(item => <li key={item}><Check />{item}</li>)}</ul><p className="price">{pkg.price}</p><a className={pkg.featured ? 'button' : 'button button-outline'} href={`#contact`}>Ajánlatot kérek!</a></article>)}</div></div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid"><div className="about-visual"><img src="/assets/about.webp" alt="Farkas-Gyovai Mónika, a Simple Flow alapítója" /></div><div><SectionHeading eyebrow="Rólam" title="A Simple Flow nemcsak név, hanem munkamódszer" /><p>Több mint tíz év nagyvállalati adminisztárcióban szerzett tapasztalat megtanított arra, hogy
  rendszerben gondolkodjak, felismerjem a prioritásokat és felelősséget
  vállaljak a rám bízott feladatokért.</p><p>Amikor együtt dolgozunk, nem várok minden lépésnél újabb utasításra.
  Megismerem a vállalkozásod működését, kérdezek, amikor szükséges,
  önállóan haladok, és időben jelzem, ha valami figyelmet vagy döntést igényel.</p><p> Az adminisztrációt, az online felületeket és a webes feladatokat nem
  egymástól elszigetelt teendőként kezelem. Az összefüggéseket keresem,
  hogy ne egy újabb ember legyek, akit koordinálnod kell, hanem valódi,
  megbízható háttértámogatást kapj.</p><a className="button" href="#contact">Beszéljük át a feladataidat!</a></div></div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid"><div><SectionHeading eyebrow="Kapcsolat" title="Dolgozzunk együtt!" text="Írd meg röviden, miben lenne szükséged támogatásra, és egy díjmentes, 30 perces online konzultáción átbeszéljük a lehetőségeket." /><div className="contact-image"></div></div><ContactForm /></div>
        </section>
      </main>
      <Footer />
    </>
  )
}
