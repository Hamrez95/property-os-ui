import {
  AlertTriangle, CheckCircle2, Clock3, LockKeyhole, RefreshCcw, Search, ShieldCheck
} from 'lucide-react'
import { Status } from './ui'

export function QualityGallery() {
  return <section className="qa-gallery" aria-labelledby="qa-title">
    <div className="qa-heading">
      <div><span>Quality contract</span><h2 id="qa-title">States · Accessibility · RTL / LTR</h2></div>
      <small>Non-color-only status · visible focus · logical layout</small>
    </div>

    <div className="qa-state-grid">
      <article className="qa-state-card">
        <div className="qa-state-icon loading"><RefreshCcw size={17}/></div>
        <div><strong>Loading</strong><span>حفظ layout هنگام دریافت داده</span></div>
        <div className="qa-skeleton"><i/><i/><i/></div>
      </article>
      <article className="qa-state-card">
        <div className="qa-state-icon empty"><Search size={17}/></div>
        <div><strong>Empty</strong><span>بدون ملک مطابق فیلتر</span></div>
        <button>پاک‌کردن فیلترها</button>
      </article>
      <article className="qa-state-card">
        <div className="qa-state-icon error"><AlertTriangle size={17}/></div>
        <div><strong>Error</strong><span>بازیابی اطلاعات ممکن نشد</span></div>
        <button>تلاش دوباره</button>
      </article>
      <article className="qa-state-card">
        <div className="qa-state-icon forbidden"><LockKeyhole size={17}/></div>
        <div><strong>Forbidden</strong><span>این نقش دسترسی ندارد</span></div>
        <Status tone="neutral">محدودیت نقش</Status>
      </article>
      <article className="qa-state-card">
        <div className="qa-state-icon stale"><Clock3 size={17}/></div>
        <div><strong>Stale</strong><span>آخرین همگام‌سازی ۲ ساعت قبل</span></div>
        <Status tone="warning">نیاز به بروزرسانی</Status>
      </article>
      <article className="qa-state-card">
        <div className="qa-state-icon success"><CheckCircle2 size={17}/></div>
        <div><strong>Verified</strong><span>وضعیت با متن و آیکن</span></div>
        <Status tone="verified">تأییدشده</Status>
      </article>
    </div>

    <div className="qa-direction-grid">
      <div className="qa-direction-card" dir="rtl">
        <span>RTL — فارسی</span>
        <div className="qa-mini-header"><strong>جزئیات ملک</strong><ShieldCheck size={16}/></div>
        <div className="qa-mini-row"><span>وضعیت</span><Status tone="verified">تأییدشده</Status></div>
        <div className="qa-mini-row"><span>آخرین بررسی</span><b>امروز</b></div>
        <button className="btn primary">ادامه</button>
      </div>
      <div className="qa-direction-card" dir="ltr">
        <span>LTR — English</span>
        <div className="qa-mini-header"><strong>Property details</strong><ShieldCheck size={16}/></div>
        <div className="qa-mini-row"><span>Status</span><Status tone="verified">Verified</Status></div>
        <div className="qa-mini-row"><span>Last reviewed</span><b>Today</b></div>
        <button className="btn primary">Continue</button>
      </div>
      <div className="qa-access-card">
        <ShieldCheck size={21}/>
        <div><strong>Accessibility baseline</strong><span>44px targets · focus-visible · reduced motion · semantic status · readable contrast</span></div>
      </div>
    </div>
  </section>
}
