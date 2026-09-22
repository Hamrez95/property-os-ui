import { useState } from 'react'
import {
  Building2, CalendarDays, CheckCircle2, ChevronLeft, FileCheck2, FileText,
  Home, KeyRound, MoreVertical, Plus, ShieldCheck, Upload, UserRound, Users,
  WalletCards, Wrench
} from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

function SectionTitle({title, action}:{title:string,action?:string}) {
  return <div className="flow-section-title"><h3>{title}</h3>{action && <button>{action}</button>}</div>
}

export function AddProperty() {
  type Kind='apartment'|'villa'|'commercial'|'office'|'land'|'agricultural'|'industrial'|'teardown'
  const [kind,setKind]=useState<Kind>('apartment')
  const kinds:{key:Kind,label:string,icon:any}[]=[
    {key:'apartment',label:'آپارتمان',icon:Home},
    {key:'villa',label:'ویلا / خانه',icon:Building2},
    {key:'commercial',label:'تجاری',icon:Building2},
    {key:'office',label:'اداری',icon:Building2},
    {key:'land',label:'زمین',icon:FileText},
    {key:'agricultural',label:'کشاورزی / باغ',icon:FileText},
    {key:'industrial',label:'صنعتی / سوله',icon:Building2},
    {key:'teardown',label:'کلنگی',icon:Wrench},
  ]
  const fields:Record<Kind,[string,string,string?][]> = {
    apartment:[['مساحت واحد','۱۴۰','متر'],['تعداد خواب','۳'],['طبقه','۴ از ۶'],['سال ساخت','۱۴۰۰'],['آسانسور','دارد'],['پارکینگ','P-21 · سندی'],['انباری','A4 · ۶ متر'],['بالکن','دارد']],
    villa:[['مساحت زمین','۴۲۰','متر'],['زیربنا','۲۳۰','متر'],['تعداد خواب','۴'],['طبقات','۲ · دوبلکس'],['حیاط','۱۹۰ متر'],['استخر','چهارفصل'],['پارکینگ','۳ خودرو'],['پایان‌کار','موجود']],
    commercial:[['متراژ','۸۵','متر'],['عرض بر','۶.۲','متر'],['ارتفاع سقف','۴.۸','متر'],['کاربری','تجاری'],['دهنه','۲'],['نوع حق','ملکیت + سرقفلی'],['برق','سه‌فاز'],['انباری','۱۲ متر']],
    office:[['متراژ','۱۱۰','متر'],['اتاق','۳'],['طبقه','۵ از ۸'],['کاربری','اداری'],['پارکینگ','۱ سندی'],['آسانسور','۲'],['آبدارخانه','دارد'],['دسترسی','۲۴ ساعته']],
    land:[['مساحت زمین','۶۳۴','متر'],['عرض بر','۱۲','متر'],['عرض گذر','۱۰','متر'],['ابعاد','۲۱ × ۳۰'],['کاربری','مسکونی'],['موقعیت','دو نبش'],['آب/برق/گاز','لب مرز'],['پروانه','ثبت نشده']],
    agricultural:[['مساحت زمین','۳۲۰۰','متر'],['سطح زیر کشت','۲۴۰۰','متر'],['نوع بهره‌برداری','باغ'],['منبع آب','چاه + سهم آب'],['آبیاری','قطره‌ای'],['برق','سه‌فاز'],['راه دسترسی','آسفالت'],['کاربری','کشاورزی']],
    industrial:[['مساحت زمین','۱۰۰۰','متر'],['متراژ سالن','۴۷۰','متر'],['ارتفاع','۷','متر'],['اداری','۱۰۰ متر'],['برق','سه‌فاز ۱۲۵A'],['گاز','صنعتی'],['دسترسی','تریلی‌رو'],['کف','بتن صنعتی']],
    teardown:[['مساحت زمین','۲۸۰','متر'],['بنای فعلی','۱۶۰','متر'],['عرض بر','۱۲','متر'],['سال بنا','۱۳۵۸'],['تعداد بر','۲'],['عرض گذر','۱۲ / ۸ متر'],['سکونت','خالی'],['وضعیت بنا','فرسوده']],
  }
  const target:Record<Kind,string>={apartment:'/property/apartment',villa:'/property/villa',commercial:'/property/commercial',office:'/property/office',land:'/property/land',agricultural:'/property/agricultural',industrial:'/property/industrial',teardown:'/property/teardown'}
  return <Phone title="افزودن Property Record" active="properties">
    <div className="flow-progress"><i className="done"/><i className="active"/><i/><span>مرحله ۲ از ۳</span></div>
    <div className="form-card">
      <h3>نوع ملک را انتخاب کنید</h3>
      <div className="property-kind-grid">
        {kinds.map(item=>{const Icon=item.icon;return <button key={item.key} className={kind===item.key?'active':''} onClick={()=>setKind(item.key)}><Icon size={17}/>{item.label}</button>})}
      </div>
      <label>عنوان ملک</label>
      <div className="field-like">{kind==='land'?'زمین دماوند':kind==='agricultural'?'باغ و زمین کشاورزی لواسانات':kind==='industrial'?'سوله صنعتی جاده مخصوص':kind==='teardown'?'خانه کلنگی یوسف‌آباد':kind==='villa'?'ویلای لواسان':kind==='commercial'?'تجاری جردن':kind==='office'?'دفتر سعادت‌آباد':'آپارتمان نیاوران'}</div>
      <label>موقعیت</label>
      <div className="field-like">تهران / نمونه داده <ChevronLeft size={15}/></div>
    </div>

    <div className="form-card specialist-form">
      <div className="specialist-form-head"><div><strong>مشخصات تخصصی</strong><span>فیلدها بر اساس نوع Property تغییر می‌کنند.</span></div><Status tone="info">{kinds.find(x=>x.key===kind)?.label}</Status></div>
      <div className="specialist-field-grid">{fields[kind].map(([label,value,unit])=><div key={label}><span>{label}</span><strong>{value}</strong>{unit&&<small>{unit}</small>}</div>)}</div>
    </div>

    <div className="form-card ownership-form">
      <div className="specialist-form-head"><div><strong>مالکیت و سند</strong><span>این مدل برای همه انواع ملک مشترک است.</span></div><KeyRound size={17}/></div>
      <label>نوع سند</label><div className="field-like">تک‌برگ / شش‌دانگ / مشاع <ChevronLeft size={15}/></div>
      <label>سهم شما از شش دانگ</label><div className="ownership-share-input"><strong>۶</strong><span>از</span><b>۶ دانگ</b></div>
      <label>نوع رابطه</label><div className="field-like">مالک <ChevronLeft size={15}/></div>
    </div>
    <div className="flow-note"><ShieldCheck size={17}/><span>اطلاعات بازار، سند و برنامه ساخت یک چیز نیستند. مواردی مثل تراکم یا امکان ساخت فقط با منبع/استعلام به‌عنوان Claim نمایش داده می‌شوند.</span></div>
    <button className="btn primary flow-bottom-cta" onClick={() => go(target[kind])}>ذخیره نمونه و مشاهده جزئیات</button>
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
  const relations = [
    {name:'حمیدرضا پاکپور',avatar:'ح',role:'مالک',scope:'کل Property Record',time:'بدون تاریخ پایان',share:'۶ از ۶ دانگ',access:'سند · مالی · واگذاری',tone:'verified' as const},
    {name:'علی محمدی',avatar:'ع',role:'مستأجر',scope:'واحد ۴ + پارکینگ P-21',time:'تا ۱۴۰۶/۰۳/۲۱',share:'مالکیت ندارد',access:'قرارداد · ساختمان · خدمات',tone:'info' as const},
    {name:'نرگس اکبری',avatar:'ن',role:'مدیر ساختمان',scope:'ساختمان نیاوران',time:'تا مجمع بعدی',share:'—',access:'شارژ · اعلان · تعمیرات',tone:'warning' as const},
    {name:'مریم پاکپور',avatar:'م',role:'نماینده',scope:'فقط Listing / مذاکره',time:'تا ۱۴۰۵/۰۸/۳۰',share:'—',access:'عرضه · بازدید · پیشنهاد',tone:'neutral' as const},
  ]
  return <Phone title="افراد و نقش‌ها" active="properties">
    <div className="people-summary"><Users size={23}/><div><strong>۴ رابطه فعال</strong><span>Role همیشه همراه Scope و بازه زمانی معنا دارد؛ حساب کاربر یک نقش جهانی ندارد.</span></div></div>
    <div className="relationship-legend"><span><i className="person-dot owner"/>مالکیت</span><span><i className="person-dot tenant"/>سکونت</span><span><i className="person-dot manager"/>مدیریت</span></div>
    <div className="relationship-people-list">{relations.map((r,i)=><article className="relationship-person-card" key={r.name}>
      <div className="relationship-person-head"><div className="avatar person-avatar">{r.avatar}</div><div><strong>{r.name}</strong><span>{r.scope}</span></div><Status tone={r.tone}>{r.role}</Status></div>
      <div className="relationship-meta-grid">
        <div><span>Role</span><strong>{r.role}</strong></div>
        <div><span>Scope</span><strong>{r.scope}</strong></div>
        <div><span>زمان</span><strong>{r.time}</strong></div>
        <div><span>سهم مالکیت</span><strong>{r.share}</strong></div>
      </div>
      <div className="relationship-access"><KeyRound size={13}/><span>دسترسی‌ها: {r.access}</span></div>
    </article>)}</div>
    <button className="btn secondary flow-wide-button" onClick={() => go('/account')}><Plus size={15}/>افزودن رابطه جدید</button>
    <div className="flow-note subtle"><ShieldCheck size={17}/><span>یک فرد می‌تواند همزمان مثلاً مالک یک ملک، مستأجر ملک دیگر و مدیر یک ساختمان باشد.</span></div>
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
