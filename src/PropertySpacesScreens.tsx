import {
  Building2, CalendarDays, CheckCircle2, ChevronLeft, FileCheck2, FileText,
  Home, KeyRound, MoreVertical, Plus, ShieldCheck, Upload, UserRound, Users,
  WalletCards
} from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

function SectionTitle({title, action}:{title:string,action?:string}) {
  return <div className="flow-section-title"><h3>{title}</h3>{action && <button>{action}</button>}</div>
}

export function AddProperty() {
  return <Phone title="افزودن ملک">
    <div className="flow-progress"><i className="done"/><i className="active"/><i/><span>مرحله ۲ از ۳</span></div>
    <div className="form-card">
      <h3>اطلاعات پایه ملک</h3>
      <label>نوع ملک</label>
      <div className="choice-grid">
        <button className="active"><Home size={17}/>آپارتمان</button>
        <button><Building2 size={17}/>ویلا</button>
        <button><Building2 size={17}/>تجاری</button>
      </div>
      <label>عنوان ملک</label>
      <div className="field-like">آپارتمان نیاوران</div>
      <label>موقعیت</label>
      <div className="field-like">تهران، نیاوران <ChevronLeft size={15}/></div>
      <label>مساحت</label>
      <div className="field-like"><span>۱۴۰</span><small>متر مربع</small></div>
    </div>
    <div className="flow-note"><ShieldCheck size={17}/><span>در این مرحله فقط اطلاعات پایه ثبت می‌شود. مدارک و سطح اعتماد بعداً قابل تکمیل هستند.</span></div>
    <button className="btn primary flow-bottom-cta" onClick={() => go('/property')}>ادامه</button>
  </Phone>
}

export function PropertyDocuments() {
  const docs = [
    ['سند مالکیت','بارگذاری‌شده','verified'],
    ['قرارداد اجاره جاری','معتبر تا ۱۴۰۶/۰۳/۲۱','verified'],
    ['پایان‌کار','نیازمند بررسی','warning'],
    ['قبض عوارض','ثبت توسط مالک','neutral']
  ] as const
  return <Phone title="اسناد ملک">
    <div className="document-hero">
      <div><FileText size={22}/><span>۴ سند</span><strong>۳ مورد دارای اعتبار کافی</strong></div>
      <button className="icon-button" onClick={() => go('/claim-evidence')} aria-label="افزودن مدرک"><Plus size={16}/></button>
    </div>
    <div className="document-list">{docs.map((d,i)=><button className="document-row interactive-row" key={d[0]} onClick={() => go('/claim-evidence')}>
      <div className="document-icon"><FileCheck2 size={17}/></div>
      <div><strong>{d[0]}</strong><span>{d[1]}</span></div>
      <Status tone={d[2]}>{d[2]==='verified'?'تأیید':'بررسی'}</Status>
      <MoreVertical size={16}/>
    </button>)}</div>
    <button className="upload-zone interactive-card" onClick={() => go('/claim-evidence')}><Upload size={18}/><strong>افزودن سند یا تصویر</strong><span>PDF، JPG یا PNG</span></button>
  </Phone>
}

export function PropertyPeople() {
  const people = [
    ['حمیدرضا پاکپور','مالک','تأییدشده','verified'],
    ['علی محمدی','مستأجر','فعال تا ۱۴۰۶/۰۳/۲۱','info'],
    ['مریم پاکپور','نماینده','دسترسی مشاهده','neutral']
  ] as const
  return <Phone title="افراد و نقش‌ها">
    <div className="people-summary"><Users size={23}/><div><strong>۳ فرد مرتبط</strong><span>رابطه افراد با ملک و سطح دسترسی</span></div></div>
    <div className="people-list">{people.map((p,i)=><div className="person-row" key={p[0]}>
      <div className="avatar person-avatar">{p[0][0]}</div>
      <div><strong>{p[0]}</strong><span>{p[1]} · {p[2]}</span></div>
      <Status tone={p[3]}>{p[1]}</Status>
    </div>)}</div>
    <button className="btn secondary flow-wide-button" onClick={() => go('/account')}><Plus size={15}/>افزودن فرد یا نقش</button>
    <div className="flow-note subtle"><ShieldCheck size={17}/><span>تغییر مالکیت، اختیار عرضه و دسترسی‌های حساس در تاریخچه ثبت می‌شوند.</span></div>
  </Phone>
}

export function PropertyFinance() {
  const rows = [
    ['اجاره شهریور','۸۵,۰۰۰,۰۰۰','وصول‌شده','verified'],
    ['شارژ ساختمان','۳,۴۰۰,۰۰۰','پرداخت‌شده','verified'],
    ['تعمیر پکیج','۲,۸۵۰,۰۰۰','هزینه','neutral'],
    ['اجاره مهر','۸۵,۰۰۰,۰۰۰','در انتظار','warning']
  ] as const
  return <Phone title="مالی ملک">
    <div className="finance-hero">
      <span>درآمد خالص این ماه</span><strong>۷۸.۷ میلیون</strong><small>تومان</small>
      <div><b>+۱۲٪</b><span>نسبت به ماه قبل</span></div>
    </div>
    <div className="finance-kpis"><div><span>درآمد</span><strong>۸۵ م</strong></div><div><span>هزینه</span><strong>۶.۳ م</strong></div><div><span>مطالبات</span><strong>۸۵ م</strong></div></div>
    <div className="flow-section-title"><h3>آخرین تراکنش‌ها</h3><button onClick={() => go('/transaction')}>همه</button></div>
    <div className="finance-list">{rows.map(r=><div className="finance-row" key={r[0]}>
      <div><strong>{r[0]}</strong><span>{r[1]} تومان</span></div><Status tone={r[3]}>{r[2]}</Status>
    </div>)}</div>
  </Phone>
}

export function PropertyLease() {
  return <Phone title="قرارداد اجاره">
    <div className="lease-hero">
      <div><KeyRound size={23}/><span>قرارداد فعال</span><strong>آپارتمان نیاوران</strong></div>
      <Status tone="verified">فعال</Status>
    </div>
    <div className="lease-metrics">
      <div><span>شروع</span><strong>۱۴۰۵/۰۳/۲۱</strong></div>
      <div><span>پایان</span><strong>۱۴۰۶/۰۳/۲۱</strong></div>
      <div><span>مانده</span><strong>۲۷ روز</strong></div>
    </div>
    <div className="lease-party">
      <div><UserRound size={18}/><span><small>مستأجر</small><strong>علی محمدی</strong></span></div>
      <Status tone="verified">احراز‌شده</Status>
    </div>
    <div className="lease-values">
      <div><span>ودیعه</span><strong>۱.۲ میلیارد تومان</strong></div>
      <div><span>اجاره ماهانه</span><strong>۸۵ میلیون تومان</strong></div>
    </div>
    <div className="renew-card"><CalendarDays size={18}/><div><strong>زمان تمدید نزدیک است</strong><span>برای مذاکره و تمدید قرارداد اقدام کنید.</span></div></div>
    <div className="detail-actions"><button className="btn secondary" onClick={() => go('/property-documents')}>مشاهده فایل</button><button className="btn primary" onClick={() => go('/negotiation')}>مدیریت تمدید</button></div>
  </Phone>
}

export function SpaceLease() {
  return <Phone title="اجاره فضای مستقل">
    <div className="space-lease-hero">
      <div className="parking-symbol">P21</div>
      <div><span>موضوع قرارداد</span><strong>پارکینگ P-21</strong><small>ساختمان نیاوران · طبقه -۱</small></div>
      <Status tone="neutral">خالی</Status>
    </div>
    <div className="scope-banner"><ShieldCheck size={18}/><div><strong>LeaseScope: Space</strong><span>این قرارداد فقط همین پارکینگ را پوشش می‌دهد و مستقل از واحد مسکونی است.</span></div></div>
    <div className="form-card compact-form">
      <label>مستأجر</label><div className="field-like">انتخاب فرد <ChevronLeft size={15}/></div>
      <label>ودیعه</label><div className="field-like"><span>۵۰,۰۰۰,۰۰۰</span><small>تومان</small></div>
      <label>اجاره ماهانه</label><div className="field-like"><span>۴,۵۰۰,۰۰۰</span><small>تومان</small></div>
      <label>مدت</label><div className="field-like">۱۲ ماه <ChevronLeft size={15}/></div>
    </div>
    <button className="btn primary flow-bottom-cta" onClick={() => go('/contract-review')}>ادامه و ساخت پیش‌نویس</button>
  </Phone>
}
