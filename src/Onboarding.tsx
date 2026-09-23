import { useState } from 'react'
import { ArrowLeft, Building2, FileCheck2, KeyRound, ShieldCheck, Sparkles } from 'lucide-react'
import { Brand, Phone } from './ui'
import { go } from './navigation'

const slides = [
  { icon: Building2, eyebrow: 'PROPERTY RECORD', title: 'ملکت همیشه همراهته', text: 'قرارداد، تعمیرات، مدارک و اتفاق‌های مهم، یک‌جا و قابل پیگیری می‌مانند.' },
  { icon: KeyRound, eyebrow: 'ROLE + SCOPE', title: 'هر نقش، فضای خودش', text: 'مالک، مستأجر یا مدیر ساختمان باشی، فقط کارهای مرتبط با همان نقش و محل را می‌بینی.' },
  { icon: ShieldCheck, eyebrow: 'HISTORY + TRUST', title: 'تاریخچه‌ای که ارزش می‌سازد', text: 'از سرویس کولر تا قرارداد و بازرسی، برای ملک سابقه‌ای قابل اعتماد ساخته می‌شود.' },
  { icon: Sparkles, eyebrow: 'READY', title: 'شروع کنیم', text: 'در صفحهٔ خانه، مسیرهای مهم و نقش فعال تو را خیلی کوتاه معرفی می‌کنیم.' },
]

export function Onboarding() {
  const [step, setStep] = useState(0)
  const slide = slides[step]
  const Icon = slide.icon
  const startResidence = () => go('/join-residence')
  const skip = () => go('/home')
  return <Phone active="none">
    <section className="onboarding" aria-label={`معرفی محصول، مرحله ${step + 1} از ${slides.length}`}>
      <div className="onboarding-top"><Brand compact/><button onClick={skip}>رد کردن</button></div>
      <div className={`onboarding-visual step-${step}`} aria-hidden="true">
        <div className="onboarding-building"><i/><i/><i/><i/><i/><i/></div>
        <div className="onboarding-orbit orbit-one"/><div className="onboarding-orbit orbit-two"/>
        <div className="onboarding-icon"><Icon size={34}/></div>
      </div>
      <div className="onboarding-copy"><span>{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.text}</p></div>
      <div className="onboarding-footer">
        <div className="onboarding-dots" aria-label={`${step + 1} از ${slides.length}`}>{slides.map((_, index) => <i className={index === step ? 'active' : ''} key={index}/>)}</div>
        <button className="btn primary onboarding-next" onClick={() => step === slides.length - 1 ? startResidence() : setStep(step + 1)}>{step === slides.length - 1 ? 'تنظیم محل فعلی' : <>بعدی <ArrowLeft size={16}/></>}</button>
        {step < slides.length - 1 && <button className="onboarding-skip" onClick={skip}>دیگر نشان نده</button>}
      </div>
    </section>
  </Phone>
}
