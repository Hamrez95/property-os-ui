import {
  AlertTriangle, Camera, CheckCircle2, ChevronLeft, ClipboardCheck, FileCheck2,
  Home, MapPin, MoreVertical, Search, ShieldCheck, Upload, UserRound, WalletCards, FileText, KeyRound
} from 'lucide-react'
import { Status } from './ui'
import { go, goBack } from './navigation'

export function InspectorPhone({title,children,active='tasks'}:{title?:string,children:React.ReactNode,active?:string}) {
  const nav=[['tasks',ClipboardCheck,'ماموریت‌ها','/inspector'],['capture',Camera,'ثبت','/inspector-media'],['profile',UserRound,'حساب','/inspector-earnings']] as const
  return <div className="phone inspector-phone">
    <div className="phone-status"><span>9:41</span><span>▮▮◒</span></div>
    {title && <div className="mobile-header inspector-header"><button className="header-back" onClick={() => goBack('/inspector')} aria-label="بازگشت"><ChevronLeft size={20}/></button><strong>{title}</strong><span className="header-spacer"/></div>}
    <div className="phone-body">{children}</div>
    <div className="inspector-nav">{nav.map(([key,Icon,label,path])=><button type="button" onClick={() => go(path)} key={key} className={active===key?'active':''}><Icon size={17}/><span>{label}</span></button>)}</div>
  </div>
}

export function InspectorLogin() {
  return <div className="phone inspector-phone login">
    <div className="phone-status"><span>9:41</span><span>▮▮◒</span></div>
    <div className="inspector-login-body">
      <div className="inspector-badge"><ShieldCheck size={24}/></div>
      <h2>ورود بازرس</h2>
      <p>ماموریت‌ها، چک‌لیست و رسانه‌های تأییدشده را از اینجا مدیریت کنید.</p>
      <label>شماره موبایل</label>
      <div className="phone-input"><span>🇮🇷 +98</span><input defaultValue="912 345 6789"/></div>
      <button className="btn primary" onClick={() => go('/inspector')}>دریافت کد ورود</button>
      <small>دسترسی فقط برای بازرسان تأییدشده فعال است.</small>
    </div>
  </div>
}

export function InspectorAssignments() {
  const items=[
    ['آپارتمان فرمانیه','امروز · ۱۶:۳۰','Verified Listing','verified'],
    ['ویلای لواسان','فردا · ۱۰:۰۰','Inspection','info'],
    ['آپارتمان نیاوران','پنجشنبه · ۱۴:۰۰','Handover','warning']
  ] as const
  return <InspectorPhone title="ماموریت‌ها">
    <div className="inspector-summary"><div><span>امروز</span><strong>۳ ماموریت</strong></div><Status tone="verified">آنلاین</Status></div>
    <div className="messages-search"><Search size={15}/><span>جستجو در ماموریت‌ها...</span></div>
    <div className="assignment-list">{items.map((x,i)=><button className="assignment-card interactive-card" onClick={() => go('/inspector-assignment')} key={i}>
      <div className="assignment-index">{i+1}</div>
      <div><strong>{x[0]}</strong><span><MapPin size={11}/>{x[1]}</span><small>{x[2]}</small></div>
      <Status tone={x[3] as any}>{i===0?'آماده':'برنامه‌ریزی‌شده'}</Status>
    </button>)}</div>
  </InspectorPhone>
}

export function InspectorAssignmentDetail() {
  return <InspectorPhone title="جزئیات ماموریت">
    <div className="assignment-hero">
      <span>INS-1405-3281</span><h3>آپارتمان فرمانیه</h3><p>تهران، فرمانیه · ۱۶۰ متر</p>
      <div><Status tone="verified">Verified Listing</Status><Status tone="info">امروز ۱۶:۳۰</Status></div>
    </div>
    <div className="assignment-block"><h3>دامنه بررسی</h3><div>✓ واحد مسکونی ۴</div><div>✓ پارکینگ P-21</div><div>✓ انباری A4</div></div>
    <div className="assignment-block"><h3>هدف</h3><p>بررسی وضعیت قابل مشاهده، ثبت رسانه معتبر، تطبیق امکانات و capture کردن مدارک ارائه‌شده.</p></div>
    <div className="route-card"><MapPin size={18}/><div><strong>۱۲ دقیقه تا مقصد</strong><span>مسیر پیشنهادی از موقعیت فعلی</span></div><button>مسیریابی</button></div>
    <button className="btn primary inspector-cta" onClick={() => go('/inspector-checklist')}>شروع بازرسی</button>
  </InspectorPhone>
}

export function InspectorChecklist() {
  const rows=[
    ['تطابق آدرس و پلاک','done'],['نمای بیرونی ساختمان','done'],['فضاهای اصلی واحد','active'],
    ['پارکینگ و انباری',''],['تجهیزات قابل مشاهده',''],['اسناد ارائه‌شده','']
  ] as const
  return <InspectorPhone title="چک‌لیست بازرسی">
    <div className="check-progress"><div><span>پیشرفت</span><strong>۲ از ۶</strong></div><i><em/></i></div>
    <div className="check-list">{rows.map((r,i)=><button className={'check-row '+r[1]} key={i} onClick={() => go(i===3?'/inspector-spaces':i===5?'/inspector-evidence':'/inspector-media')}>
      <div className="check-state">{r[1]==='done'?'✓':i+1}</div><span>{r[0]}</span><ChevronLeft size={16}/>
    </button>)}</div>
    <div className="inspector-note"><AlertTriangle size={15}/><span>موارد تخصصی سازه، برق و تأسیسات پنهان نیازمند کارشناس تخصصی هستند.</span></div>
  </InspectorPhone>
}

export function InspectorSpaceVerification() {
  const rows=[
    ['واحد مسکونی ۴','تطابق آدرس و دسترسی','verified'],
    ['پارکینگ P-21','شماره و موقعیت فیزیکی','info'],
    ['انباری A4','ابعاد و دسترسی','warning']
  ] as const
  return <InspectorPhone title="تأیید فضاها">
    <div className="inspector-space-hero"><KeyRound size={24}/><div><span>دامنه ماموریت</span><strong>۳ Space مستقل</strong><small>هر فضا جداگانه نتیجه و evidence دارد.</small></div></div>
    <div className="inspector-space-list">{rows.map((r,i)=><div key={r[0]} className="inspector-space-row">
      <div className="space-number">{i+1}</div><div><strong>{r[0]}</strong><span>{r[1]}</span></div><Status tone={r[2]}>{r[2]==='verified'?'تأیید شد':r[2]==='info'?'در حال بررسی':'نیاز به مدرک'}</Status>
    </div>)}</div>
    <div className="inspector-note"><ShieldCheck size={15}/><span>پارکینگ و انباری به‌عنوان Space مستقل بررسی می‌شوند؛ نتیجه با واحد مسکونی ادغام نمی‌شود.</span></div>
    <button className="btn primary inspector-cta" onClick={() => go('/inspector-evidence')}>ثبت نتیجه فضاها</button>
  </InspectorPhone>
}

export function InspectorDocumentEvidence() {
  const docs=[
    ['سند ارائه‌شده','مالکیت / حق استفاده','verified'],
    ['پایان‌کار','مشخصات ساختمان','info'],
    ['مدرک پارکینگ','Space P-21','warning']
  ] as const
  return <InspectorPhone title="مدارک و شواهد">
    <div className="evidence-hero"><FileText size={24}/><div><span>Evidence Pack</span><strong>۳ مدرک دریافت‌شده</strong><small>اصل فایل + metadata نگهداری می‌شود.</small></div></div>
    <div className="evidence-doc-list">{docs.map((d,i)=><div className="evidence-doc-row" key={d[0]}>
      <div className="doc-index">{i+1}</div><div><strong>{d[0]}</strong><span>{d[1]}</span></div><Status tone={d[2]}>{d[2]==='verified'?'خوانا':d[2]==='info'?'ثبت شد':'تکمیل شود'}</Status>
    </div>)}</div>
    <button className="evidence-capture-card interactive-card" onClick={() => go('/inspector-media')}><Upload size={20}/><div><strong>ثبت مدرک جدید</strong><span>تصویر کامل، بدون crop و با نور کافی</span></div></button>
    <div className="capture-meta"><div><span>زمان</span><strong>16:52:08</strong></div><div><span>ماموریت</span><strong>INS-3281</strong></div><div><span>Audit</span><strong>فعال</strong></div></div>
  </InspectorPhone>
}

export function InspectorMediaCapture() {
  return <InspectorPhone title="ثبت رسانه" active="capture">
    <div className="capture-frame">
      <div className="capture-grid"/>
      <div className="capture-target">اتاق نشیمن</div>
      <div className="capture-button"><Camera size={24}/></div>
    </div>
    <div className="capture-meta"><div><span>موقعیت</span><strong>تأیید شد</strong></div><div><span>زمان</span><strong>16:42:18</strong></div><div><span>اصل فایل</span><strong>حفظ می‌شود</strong></div></div>
    <div className="capture-tips"><h3>راهنمای ثبت</h3><span>• نور کافی و کادر کامل</span><span>• بدون فیلتر یا ویرایش</span><span>• فضای خواسته‌شده را کامل پوشش دهید</span></div>
    <button className="btn primary inspector-cta" onClick={() => go('/inspector-discrepancy')}>ادامه و بررسی مغایرت</button>
  </InspectorPhone>
}

export function InspectorDiscrepancy() {
  return <InspectorPhone title="ثبت مغایرت">
    <div className="discrepancy-alert"><AlertTriangle size={24}/><div><h3>مغایرت مشاهده شد</h3><p>اطلاعات ثبت‌شده با وضعیت قابل مشاهده یکسان نیست.</p></div></div>
    <div className="discrepancy-field"><label>Claim موردنظر</label><div>پارکینگ اختصاصی P-21</div></div>
    <div className="discrepancy-field"><label>نوع مغایرت</label><div>شماره / موقعیت متفاوت</div></div>
    <div className="discrepancy-field"><label>توضیح بازرس</label><textarea defaultValue="شماره درج‌شده روی محل پارک با اطلاعات Listing مطابقت ندارد."/></div>
    <div className="evidence-upload"><Upload size={18}/><span>افزودن عکس یا مدرک</span></div>
    <button className="btn primary inspector-cta" onClick={() => go('/inspector-submit')}>ثبت مغایرت</button>
  </InspectorPhone>
}

export function InspectorSubmitReport() {
  return <InspectorPhone title="ارسال گزارش">
    <div className="report-ready"><CheckCircle2 size={28}/><div><h3>گزارش آماده ارسال است</h3><p>تمام موارد اجباری چک‌لیست تکمیل شده‌اند.</p></div></div>
    <div className="report-stats"><div><strong>۲۴</strong><span>رسانه</span></div><div><strong>۳</strong><span>مدرک</span></div><div><strong>۱</strong><span>مغایرت</span></div></div>
    <div className="report-items"><div><FileCheck2/><span>چک‌لیست کامل</span><Status tone="verified">کامل</Status></div><div><Camera/><span>رسانه‌های لازم</span><Status tone="verified">کامل</Status></div><div><AlertTriangle/><span>مغایرت‌ها</span><Status tone="warning">۱ مورد</Status></div></div>
    <div className="submit-warning">بعد از ارسال، تغییرات اصلی فقط با Audit Trail ثبت می‌شوند.</div>
    <button className="btn primary inspector-cta" onClick={() => go('/inspector-earnings')}>ارسال نهایی گزارش</button>
  </InspectorPhone>
}

export function InspectorEarnings() {
  return <InspectorPhone title="کیفیت و درآمد" active="profile">
    <div className="earnings-hero"><span>درآمد این ماه</span><strong>۱۸,۴۵۰,۰۰۰ تومان</strong><small>۱۲ ماموریت تکمیل‌شده</small></div>
    <div className="quality-grid"><div><span>امتیاز کیفیت</span><strong>4.92</strong></div><div><span>مغایرت تأییدشده</span><strong>۸٪</strong></div><div><span>On-time</span><strong>۹۶٪</strong></div></div>
    <div className="assignment-block"><h3>آخرین پرداخت‌ها</h3><div>INS-3278 <b>۱,۶۰۰,۰۰۰</b></div><div>INS-3261 <b>۱,۴۵۰,۰۰۰</b></div><div>INS-3252 <b>۱,۷۰۰,۰۰۰</b></div></div>
  </InspectorPhone>
}
