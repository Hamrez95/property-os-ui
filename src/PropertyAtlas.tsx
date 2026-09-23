import { useState } from 'react'
import { Building2, ChevronLeft, MapPinned, MoonStar, Sparkles, Trees, X } from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'
import { useRoleScope } from './RoleScopeContext'

type AtlasPlace = { id: string; label: string; type: string; meta: string; role: string; status: string; tone: 'verified' | 'warning' | 'info'; route: string; marker: string }

const places: AtlasPlace[] = [
  { id: 'apartment', label: 'واحد ۱ · نیاوران', type: 'مالک', meta: 'آپارتمان · ۱۴۰ متر', role: 'مالک واحد ۱', status: '۱ اقدام باز', tone: 'warning', route: '/property/apartment', marker: 'apartment' },
  { id: 'villa', label: 'ویلای لواسان', type: 'مالک', meta: 'ویلا · ۲۳۰ متر بنا', role: 'مالک ۶/۶ دانگ', status: 'آماده مرور', tone: 'verified', route: '/property/villa', marker: 'villa' },
  { id: 'building', label: 'ساختمان نیاوران', type: 'مدیریت', meta: '۱۲ واحد · مشاعات', role: 'مدیر ساختمان', status: '۲ بدهکار', tone: 'warning', route: '/building', marker: 'hub' },
]

export function PropertyAtlasWelcome() {
  return <Phone active="none">
    <section className="atlas-welcome">
      <img src="/images/property-atlas-evening.webp" alt="نمای آزمایشی از محله دارایی‌های Property OS"/>
      <div className="atlas-welcome-shade"/>
      <div className="atlas-welcome-copy"><span>PROPERTY ATLAS · CONCEPT</span><h1>دارایی‌هایت را<br/>مثل یک محله ببین</h1><p>یک لایهٔ تصویریِ اختیاری برای دیدن رابطه‌ها، نه جایگزین کارهای مهم روزانه.</p></div>
      <div className="atlas-welcome-actions"><button className="btn primary" onClick={() => go('/atlas')}><MapPinned size={16}/>ورود به Atlas</button><button onClick={() => go('/home')}>بازگشت به خانهٔ فعلی</button></div>
    </section>
  </Phone>
}

export function PropertyAtlas() {
  const { context } = useRoleScope()
  const [selected, setSelected] = useState<AtlasPlace>(places[0])
  const [legendOpen, setLegendOpen] = useState(false)
  return <Phone title="Property Atlas" active="home">
    <section className="atlas-intro"><div><span>EXPERIMENT · VISUAL HOME</span><h2>محلهٔ دارایی‌های من</h2><p>این نمای آزمایشی، نقش‌ها و Property Recordهای مرتبط را به شکل نقشه‌ای آرام نشان می‌دهد.</p></div><button onClick={() => setLegendOpen(!legendOpen)} aria-expanded={legendOpen} aria-label="راهنمای Atlas"><Sparkles size={17}/></button></section>
    {legendOpen && <div className="atlas-legend"><span><i className="owner"/>دارایی</span><span><i className="tenant"/>سکونت</span><span><i className="manager"/>مدیریت</span><button onClick={() => setLegendOpen(false)} aria-label="بستن راهنما"><X size={13}/></button></div>}
    <div className="atlas-scene">
      <img src="/images/property-atlas-evening.webp" alt="نمای ایزومتریک محلهٔ دارایی‌ها"/>
      <div className="atlas-atmosphere" aria-hidden="true"><MoonStar/></div>
      {places.map(place => <button key={place.id} className={`atlas-marker ${place.marker} ${selected.id === place.id ? 'selected' : ''}`} onClick={() => setSelected(place)} aria-pressed={selected.id === place.id}>
        <i/><span>{place.type}</span>
      </button>)}
    </div>
    <section className="atlas-selection" aria-live="polite">
      <div className="atlas-selection-icon"><Building2 size={18}/></div><div><span>{selected.role}</span><strong>{selected.label}</strong><small>{selected.meta}</small></div><Status tone={selected.tone}>{selected.status}</Status>
      <button className="atlas-open" onClick={() => go(selected.route)} aria-label={`باز کردن ${selected.label}`}><ChevronLeft size={18}/></button>
    </section>
    <section className="atlas-context"><Trees size={18}/><div><strong>{context.label}</strong><span>نقشه در آینده می‌تواند فقط دارایی‌ها و کارهای مرتبط با همین context را برجسته کند.</span></div></section>
    <div className="atlas-footnote">Prototype decision surface · این نما جایگزین لیست، جست‌وجو یا یادآوری‌های عملیاتی نیست.</div>
  </Phone>
}
