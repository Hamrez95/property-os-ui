import {
  Bell, Building2, CalendarDays, CheckCircle2, ChevronLeft, CircleDollarSign,
  FileCheck2, Home, KeyRound, Map, MessageSquare, Plus, Search, ShieldCheck,
  UserRound, Users, WalletCards, Wrench, XCircle, AlertTriangle, MoreVertical,
  ArrowLeft, House, Menu, Settings, Landmark, ClipboardCheck
} from 'lucide-react'
import { AdminShell, Brand, Phone, PropertyCard, Stat, Status, type Tone } from './ui'
import { InspectorAssignments, InspectorAssignmentDetail, InspectorChecklist, InspectorDiscrepancy, InspectorEarnings, InspectorLogin, InspectorMediaCapture, InspectorSubmitReport } from './InspectorScreens'\nimport { AddProperty, PropertyDocuments, PropertyPeople, PropertyFinance, PropertyLease, SpaceLease } from './PropertySpacesScreens'

const properties = [
  { title: 'آپارتمان نیاوران', meta: '۱۴۰ متر · طبقه ۴', tone: 'verified' as Tone, status: 'اجاره‌شده' },
  { title: 'پارکینگ ونک', meta: 'طبقه -۱ · مستقل', tone: 'neutral' as Tone, status: 'خالی' }
]

function Splash() {
  return <div className="phone splash-phone">
    <div className="phone-status"><span>9:41</span><span>▮▮◒</span></div>
    <div className="splash-content">
      <Brand/>
      <div className="hero-city"><div/><div/><div/></div>
      <div className="splash-copy"><h2>همه‌چیز درباره املاک<br/>در یک مکان</h2><p>مدیریت، خرید، فروش، اجاره<br/>با اعتماد و شفافیت</p></div>
      <button className="btn primary dark">شروع کنید</button>
      <button className="btn ghost">ورود به حساب</button>
    </div>
  </div>
}

function Login() {
  return <Phone active="">
    <div className="auth-layout">
      <ArrowLeft className="auth-back" size={20}/>
      <div className="auth-copy"><h2>ورود / ثبت‌نام</h2><p>لطفاً شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود.</p></div>
      <label className="field-label">شماره موبایل</label>
      <div className="phone-input"><span>🇮🇷 +98</span><input defaultValue="912 345 6789" aria-label="شماره موبایل"/></div>
      <button className="btn primary">ارسال کد تأیید</button>
      <p className="legal">با ورود، <b>قوانین و مقررات</b> و <b>حریم خصوصی</b> را می‌پذیرید.</p>
    </div>
  </Phone>
}

function Otp() {
  return <Phone active="">
    <div className="auth-layout">
      <ArrowLeft className="auth-back" size={20}/>
      <div className="auth-copy"><h2>کد تأیید</h2><p>کد ۶ رقمی ارسال‌شده به<br/><b>0912 345 6789</b> را وارد کنید.</p></div>
      <div className="otp">{[1,2,3,4,5,6].map(i=><span key={i}/>)}</div>
      <div className="otp-meta"><span>0:52</span><button>ارسال مجدد کد</button></div>
      <button className="btn primary">تأیید و ادامه</button>
      <div className="keypad">{[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((n,i)=><span key={i}>{n}</span>)}</div>
    </div>
  </Phone>
}

function HomeScreen() {
  return <Phone>
    <div className="home-top">
      <div className="hello"><div className="avatar">ح</div><div><strong>سلام حمیدرضا</strong><span>امروز چه کاری انجام می‌دهید؟</span></div></div>
      <div className="searchbox"><Search size={15}/><span>جستجو در املاک، محله‌ها ...</span></div>
      <div className="quick-grid">
        <div><Home/><span>افزودن ملک</span></div><div><FileCheck2/><span>ایجاد قرارداد</span></div>
        <div><ShieldCheck/><span>درخواست بررسی</span></div><div><Wrench/><span>درخواست خدمت</span></div>
      </div>
    </div>
    <section className="mobile-section">
      <div className="section-head"><h3>املاک من</h3><button>مشاهده همه</button></div>
      {properties.map((p,i)=><PropertyCard key={i} {...p}/>)}
      <div className="attention"><CalendarDays size={18}/><div><strong>یادآوری مهم</strong><span>قرارداد آپارتمان نیاوران ۲۷ روز دیگر پایان می‌یابد.</span></div></div>
    </section>
  </Phone>
}

function PropertyDetail() {
  return <Phone title="">
    <div className="property-hero">
      <div className="hero-building"><i/><i/><i/><i/></div>
      <div className="hero-actions"><button>↗</button><button>⌁</button></div>
      <span className="hero-count">2/12</span>
    </div>
    <div className="property-title-row"><div><h2>آپارتمان نیاوران ☆</h2><p>تهران، نیاوران · ساختمان کسری</p></div></div>
    <div className="property-facts"><div><strong>۱۴۰</strong><span>متر</span></div><div><strong>۳</strong><span>خواب</span></div><div><strong>طبقه ۴</strong><span>از ۶</span></div><div><strong>۱۴۰۰</strong><span>سال ساخت</span></div></div>
    <div className="tabs"><span>جزئیات</span><span>مالی</span><span>مستندات</span><span className="active">قرارداد</span></div>
    <div className="detail-panel">
      <div className="panel-head"><strong>وضعیت قرارداد</strong><Status tone="verified">اجاره‌شده</Status></div>
      <div className="kv"><span>مستأجر</span><b>علی محمدی</b></div>
      <div className="kv"><span>پایان قرارداد</span><b>۱۴۰۶/۰۳/۲۱</b></div>
      <div className="kv"><span>مبلغ اجاره</span><b>۸۵,۰۰۰,۰۰۰ تومان</b></div>
    </div>
    <div className="detail-actions"><button className="btn secondary">ویرایش</button><button className="btn primary">مدیریت قرارداد</button></div>
  </Phone>
}

function MyCity() {
  return <Phone title="شهر من" active="home">
    <div className="searchbox city-search"><Search size={15}/><span>جستجو در محله‌ها و ساختمان‌ها ...</span></div>
    <div className="chips"><span className="active">همه</span><span>تهران</span><span>ویلا</span><span>ساختمان اداری</span></div>
    <div className="city-map">
      <div className="roads one"/><div className="roads two"/><div className="roads three"/>
      {[...Array(17)].map((_,i)=><div key={i} className={'map-building b'+i}/>)}
      <div className="selected-building"/>
      <div className="map-pin red"/><div className="map-pin blue"/><div className="map-pin amber"/>
      <div className="map-card"><strong>ساختمان نیاوران</strong><span>۱۲ واحد · تهران</span><small>میانگین قیمت: ۲۶۰ میلیون / متر</small></div>
      <div className="map-switch"><span className="active"><Map size={14}/>نقشه</span><span><Menu size={14}/>لیست</span></div>
    </div>
  </Phone>
}

function AdminDashboard() {
  return <AdminShell section="داشبورد">
    <div className="admin-page-head"><div><h2>داشبورد</h2><p>نمای کلی عملیات Property OS</p></div></div>
    <div className="stats-grid">
      <Stat icon={Users} label="کل کاربران" value="12,480" delta="+12%"/>
      <Stat icon={Building2} label="املاک ثبت‌شده" value="8,320" delta="+8%"/>
      <Stat icon={FileCheck2} label="قراردادهای فعال" value="5,210" delta="+11%"/>
      <Stat icon={ClipboardCheck} label="بازرسی تأییدشده" value="1,240" delta="+4%"/>
    </div>
    <div className="dash-grid">
      <div className="chart-card"><div className="card-title">روند رشد ماهانه</div><div className="line-chart"><svg viewBox="0 0 500 160"><polyline points="10,130 90,112 170,110 250,72 330,82 410,48 490,26" fill="none" stroke="#315EFB" strokeWidth="4"/><polyline points="10,130 90,112 170,110 250,72 330,82 410,48 490,26 490,160 10,160" fill="rgba(49,94,251,.08)" stroke="none"/></svg></div></div>
      <div className="system-card"><div className="card-title">وضعیت سیستم</div>{['سرویس‌ها','درگاه پرداخت','ارسال پیامک','ذخیره‌سازی','API'].map(x=><div className="health" key={x}><span>{x}</span><Status tone="verified">فعال</Status></div>)}</div>
    </div>
  </AdminShell>
}

const users = [
  ['علی رضایی','0912 345 6789','مالک','فعال'],
  ['سارا محمدی','0913 234 5678','مستأجر','فعال'],
  ['مهدی کریمی','0919 876 5432','بازرس','فعال'],
  ['نرگس حسینی','0912 111 2222','مدیر ساختمان','مسدود'],
  ['رضا شریفی','0914 333 4444','مدیر ساختمان','فعال']
]

function UsersManagement() {
  return <AdminShell section="کاربران">
    <div className="admin-page-head"><div><h2>کاربران</h2><p>مدیریت Partyها، نقش‌ها و وضعیت حساب</p></div><button className="btn primary compact"><Plus size={15}/>کاربر جدید</button></div>
    <div className="table-toolbar"><div className="global-search"><Search size={15}/><span>جستجو در کاربران...</span></div></div>
    <div className="data-table">
      <div className="table-row header"><span>نام</span><span>موبایل</span><span>نقش</span><span>وضعیت</span><span/></div>
      {users.map((u,i)=><div className="table-row" key={u[0]}><span className="user-cell"><div className="avatar small">{u[0][0]}</div>{u[0]}</span><span>{u[1]}</span><span>{u[2]}</span><span><Status tone={u[3]==='فعال'?'verified':'danger'}>{u[3]}</Status></span><span><MoreVertical size={16}/></span></div>)}
    </div>
  </AdminShell>
}

const adminProperties = [
  ['آپارتمان نیاوران','آپارتمان','تهران','اجاره‌شده','verified'],
  ['ویلا لواسان','ویلا','لواسان','فروش','neutral'],
  ['پارکینگ ونک','پارکینگ','ونک','خالی','neutral'],
  ['تجاری جردن','تجاری','جردن','اجاره‌شده','verified'],
  ['ساختمان اداری','اداری','سعادت‌آباد','در حال ساخت','warning']
] as const

function PropertyManagement() {
  return <AdminShell section="املاک">
    <div className="admin-page-head"><div><h2>مدیریت املاک</h2><p>Property Recordها و وضعیت عملیاتی</p></div><button className="btn primary compact"><Plus size={15}/>افزودن ملک</button></div>
    <div className="table-toolbar"><div className="global-search"><Search size={15}/><span>جستجو در املاک...</span></div><div className="filter-pills"><span className="active">همه</span><span>فعال</span><span>خالی</span></div></div>
    <div className="data-table property-table">
      <div className="table-row header"><span>عنوان</span><span>نوع</span><span>موقعیت</span><span>وضعیت</span><span/></div>
      {adminProperties.map((p,i)=><div className="table-row" key={p[0]}><span className="user-cell"><div className="property-mini">{i+1}</div>{p[0]}</span><span>{p[1]}</span><span>{p[2]}</span><span><Status tone={p[4] as Tone}>{p[3]}</Status></span><span><MoreVertical size={16}/></span></div>)}
    </div>
  </AdminShell>
}


function PortfolioOverview() {
  return <Phone title="سبد املاک">
    <div className="portfolio-summary">
      <div><span>ارزش تقریبی سبد</span><strong>۴۲.۸ میلیارد</strong><small>تومان</small></div>
      <div className="portfolio-metrics"><span><b>۵</b> ملک</span><span><b>۳</b> اجاره‌شده</span><span><b>۱</b> خالی</span></div>
    </div>
    <div className="portfolio-toolbar"><div className="searchbox"><Search size={15}/><span>جستجو در سبد...</span></div><button className="icon-button"><Plus size={16}/></button></div>
    <div className="chips portfolio-chips"><span className="active">همه</span><span>مسکونی</span><span>تجاری</span><span>فضاها</span></div>
    <section className="mobile-section portfolio-list">
      <PropertyCard title="آپارتمان نیاوران" meta="۱۴۰ متر · طبقه ۴" status="اجاره‌شده" tone="verified"/>
      <PropertyCard title="ویلای لواسان" meta="۴۲۰ متر · ۳ خواب" status="در فروش" tone="info"/>
      <PropertyCard title="پارکینگ ونک" meta="P-21 · طبقه -۱" status="خالی" tone="neutral"/>
      <PropertyCard title="تجاری جردن" meta="۸۵ متر · همکف" status="اجاره‌شده" tone="verified"/>
    </section>
  </Phone>
}

function PropertyPassport() {
  return <Phone title="پاسپورت ملک">
    <div className="passport-score">
      <div className="score-ring"><strong>82</strong><span>/100</span></div>
      <div><h3>اعتماد بالا</h3><p>بخش زیادی از اطلاعات این ملک دارای مدرک یا تأیید معتبر است.</p></div>
    </div>
    <div className="verification-matrix">
      <div><span>هویت مالک</span><Status tone="verified">تأییدشده</Status></div>
      <div><span>اختیار عرضه</span><Status tone="verified">تأییدشده</Status></div>
      <div><span>متراژ</span><Status tone="info">سند پشتیبان</Status></div>
      <div><span>پارکینگ</span><Status tone="verified">بازرس مشاهده کرد</Status></div>
      <div><span>بازسازی</span><Status tone="warning">مدرک ناقص</Status></div>
      <div><span>رسانه</span><Status tone="verified">توسط بازرس</Status></div>
    </div>
    <div className="passport-actions">
      <button className="btn secondary"><FileCheck2 size={15}/>افزودن مدرک</button>
      <button className="btn primary"><ShieldCheck size={15}/>افزایش سطح اعتماد</button>
    </div>
  </Phone>
}

function PropertyTimeline() {
  const events = [
    ['امروز','سرویس موتورخانه ثبت شد','ارائه‌دهنده تأییدشده','verified'],
    ['۱۴۰۵/۰۵/۱۷','قرارداد اجاره تمدید شد','سند پشتیبان','info'],
    ['۱۴۰۵/۰۳/۰۴','بازرسی دوره‌ای انجام شد','بازرس Property OS','verified'],
    ['۱۴۰۴/۱۱/۲۳','تعویض پکیج ثبت شد','ثبت توسط مالک','neutral'],
    ['۱۴۰۴/۰۸/۱۲','ملک به سبد اضافه شد','ثبت توسط مالک','neutral']
  ] as const
  return <Phone title="تاریخچه ملک">
    <div className="timeline-filter"><span className="active">همه</span><span>قرارداد</span><span>تعمیرات</span><span>بازرسی</span></div>
    <div className="timeline-list">
      {events.map((e,i)=><div className="timeline-item" key={i}>
        <div className={'timeline-dot '+e[3]} />
        <div className="timeline-copy"><span>{e[0]}</span><strong>{e[1]}</strong><small>{e[2]}</small></div>
      </div>)}
    </div>
  </Phone>
}

function SpacesOverview() {
  return <Phone title="فضاها و متعلقات">
    <div className="spaces-hero"><div><strong>۳ فضای مستقل</strong><span>هر فضا می‌تواند lifecycle اجاره و تاریخچه مستقل داشته باشد.</span></div><button className="icon-button"><Plus size={16}/></button></div>
    <div className="space-card">
      <div className="space-icon"><Home size={18}/></div><div><strong>واحد مسکونی ۴</strong><span>۱۴۰ متر · طبقه ۴</span></div><Status tone="verified">اشغال</Status>
    </div>
    <div className="space-card">
      <div className="space-icon"><KeyRound size={18}/></div><div><strong>پارکینگ P-21</strong><span>طبقه -۱ · دسترسی مستقل</span></div><Status tone="neutral">خالی</Status>
    </div>
    <div className="space-card">
      <div className="space-icon"><Building2 size={18}/></div><div><strong>انباری A4</strong><span>۶ متر · زیرزمین</span></div><Status tone="warning">رزرو</Status>
    </div>
    <div className="space-rule"><ShieldCheck size={17}/><div><strong>Scope-aware</strong><span>اجاره یا آگهی می‌تواند کل ملک، یک فضا یا Bundle چند فضا را هدف بگیرد.</span></div></div>
  </Phone>
}

function SpaceDetail() {
  return <Phone title="پارکینگ P-21">
    <div className="space-detail-visual"><div className="parking-mark">P21</div></div>
    <div className="space-detail-title"><div><h2>پارکینگ P-21</h2><p>ساختمان نیاوران · طبقه -۱</p></div><Status tone="neutral">خالی</Status></div>
    <div className="space-facts"><div><span>نوع حق</span><strong>اختصاصی</strong></div><div><span>دسترسی</span><strong>ریموت</strong></div><div><span>آخرین بررسی</span><strong>۲۱ روز قبل</strong></div></div>
    <div className="detail-panel">
      <div className="panel-head"><strong>Trust</strong><Status tone="info">Document-backed</Status></div>
      <div className="kv"><span>وجود فیزیکی</span><b>تأیید بازرس</b></div>
      <div className="kv"><span>شماره / موقعیت</span><b>P-21 / B1</b></div>
      <div className="kv"><span>حق استفاده</span><b>سند پشتیبان</b></div>
    </div>
    <div className="detail-actions"><button className="btn secondary">ویرایش</button><button className="btn primary">اجاره این فضا</button></div>
  </Phone>
}

function BundleBuilder() {
  const rows = [
    ['واحد مسکونی ۴','۱۴۰ متر','selected'],
    ['پارکینگ P-21','طبقه -۱','selected'],
    ['انباری A4','۶ متر','']
  ]
  return <Phone title="ساخت Bundle">
    <div className="bundle-intro"><h3>موضوع قرارداد را انتخاب کنید</h3><p>یک یا چند Space را برای آگهی یا قرارداد مشترک انتخاب کنید.</p></div>
    <div className="bundle-list">{rows.map((r,i)=><div className={'bundle-row '+r[2]} key={i}>
      <div className="check-box">{r[2] ? '✓' : ''}</div><div><strong>{r[0]}</strong><span>{r[1]}</span></div>
    </div>)}</div>
    <div className="bundle-summary"><span>Bundle فعلی</span><strong>واحد ۴ + پارکینگ P-21</strong><small>۲ فضای انتخاب‌شده</small></div>
    <button className="btn primary bundle-cta">ادامه برای شرایط اجاره</button>
  </Phone>
}


function BuildingDashboard() {
  return <Phone title="ساختمان نیاوران">
    <div className="building-summary">
      <div className="building-visual"><Building2 size={32}/></div>
      <div><h3>ساختمان نیاوران</h3><p>۱۲ واحد · ۸ مالک · ۹ ساکن</p><Status tone="verified">فعال</Status></div>
    </div>
    <div className="building-kpis"><div><span>بدهی جاری</span><strong>۱۸.۴ م</strong></div><div><span>درخواست باز</span><strong>۳</strong></div><div><span>سرویس بعدی</span><strong>۶ روز</strong></div></div>
    <div className="building-actions">
      <div><CircleDollarSign/><span>شارژ و بدهی</span></div><div><Wrench/><span>تعمیرات</span></div>
      <div><Bell/><span>اعلان‌ها</span></div><div><Users/><span>ساکنین</span></div>
    </div>
    <section className="mobile-section">
      <div className="section-head"><h3>آخرین فعالیت‌ها</h3><button>همه</button></div>
      <div className="activity-row"><CheckCircle2 size={16}/><div><strong>شارژ شهریور ثبت شد</strong><span>۱۰ واحد پرداخت کرده‌اند</span></div><small>امروز</small></div>
      <div className="activity-row"><Wrench size={16}/><div><strong>تیکت آسانسور</strong><span>در انتظار تأیید مدیر</span></div><small>دیروز</small></div>
      <div className="activity-row"><FileCheck2 size={16}/><div><strong>فاکتور نظافت</strong><span>۲,۸۰۰,۰۰۰ تومان</span></div><small>۳ روز</small></div>
    </section>
  </Phone>
}

function BuildingUnits() {
  const units=[['واحد ۱','مالک: محمد رضایی','بدون بدهی','verified'],['واحد ۲','مستأجر: سارا محمدی','۱.۲ م بدهی','warning'],['واحد ۳','مالک: نرگس اکبری','بدون بدهی','verified'],['واحد ۴','مستأجر: علی محمدی','۸۵۰ ه بدهی','warning'],['واحد ۵','خالی','بدون بدهی','neutral']] as const
  return <Phone title="واحدها و ساکنین">
    <div className="units-top"><div className="searchbox"><Search size={15}/><span>جستجو در واحدها...</span></div><button className="icon-button"><Plus size={16}/></button></div>
    <div className="units-list">{units.map((u,i)=><div className="unit-row" key={i}>
      <div className="unit-no">{i+1}</div><div><strong>{u[0]}</strong><span>{u[1]}</span></div><Status tone={u[3] as Tone}>{u[2]}</Status>
    </div>)}</div>
  </Phone>
}

function ChargesLedger() {
  return <Phone title="شارژ و بدهی">
    <div className="ledger-hero"><div><span>دوره شهریور ۱۴۰۵</span><strong>۲۴,۶۰۰,۰۰۰</strong><small>تومان قابل وصول</small></div><Status tone="warning">۲ بدهکار</Status></div>
    <div className="ledger-progress"><div><span>وصول‌شده</span><b>۸۱٪</b></div><i><em/></i></div>
    <div className="ledger-list">
      {[['واحد ۱','۲,۰۰۰,۰۰۰','پرداخت‌شده','verified'],['واحد ۲','۲,۲۰۰,۰۰۰','بدهکار','warning'],['واحد ۳','۱,۹۵۰,۰۰۰','پرداخت‌شده','verified'],['واحد ۴','۲,۳۵۰,۰۰۰','بدهکار','warning']].map((r,i)=><div key={i}><div><strong>{r[0]}</strong><span>{r[1]} تومان</span></div><Status tone={r[3] as Tone}>{r[2]}</Status></div>)}
    </div>
    <button className="btn primary ledger-cta">ثبت پرداخت / یادآوری</button>
  </Phone>
}

function TrustCenter() {
  return <Phone title="مرکز اعتماد">
    <div className="trust-hero"><ShieldCheck size={30}/><div><h3>اعتماد، شفاف و قابل توضیح</h3><p>هر ادعا منبع و سطح اعتبار خودش را دارد.</p></div></div>
    <div className="trust-levels">
      <div><i className="dot neutral"/><span><strong>ثبت توسط مالک</strong><small>Self-reported</small></span></div>
      <div><i className="dot info"/><span><strong>دارای مدرک</strong><small>Document-backed</small></span></div>
      <div><i className="dot verified"/><span><strong>تأیید بازرس</strong><small>Inspector verified</small></span></div>
      <div><i className="dot official"/><span><strong>تأیید رسمی</strong><small>Officially verified</small></span></div>
    </div>
    <div className="trust-task"><div><strong>پروفایل اعتماد آپارتمان نیاوران</strong><span>۳ مورد برای تکمیل باقی مانده</span></div><button className="btn primary compact">ادامه</button></div>
  </Phone>
}

function ClaimEvidence() {
  return <Phone title="مدرک ادعا">
    <div className="claim-card">
      <span>ادعا</span><h3>«لوله‌کشی در سال ۱۴۰۳ تعویض شده»</h3><Status tone="neutral">ثبت توسط مالک</Status>
    </div>
    <div className="evidence-section"><h3>مدارک موجود</h3>
      <div className="evidence-file"><FileCheck2 size={20}/><div><strong>فاکتور-تأسیسات.pdf</strong><span>۲.۴ MB · ۱۴۰۳/۰۷/۱۲</span></div><Status tone="info">سند</Status></div>
      <div className="evidence-file"><Wrench size={20}/><div><strong>رکورد سرویس</strong><span>ثبت توسط شرکت سرویس</span></div><Status tone="verified">ارائه‌دهنده</Status></div>
    </div>
    <div className="claim-result"><span>سطح فعلی</span><strong>Evidence-backed</strong><p>این Claim مدرک دارد، اما هنوز توسط بازرس یا منبع رسمی تأیید نشده است.</p></div>
    <button className="btn primary claim-cta"><Plus size={15}/>افزودن مدرک</button>
  </Phone>
}

function InspectionRequest() {
  return <Phone title="درخواست بازرسی">
    <div className="inspection-intro"><ShieldCheck size={27}/><h3>Verified Inspection</h3><p>برای فروش، اجاره یا تحویل با اعتماد بالاتر، بازرس Property OS اطلاعات قابل مشاهده و مدارک ارائه‌شده را ثبت می‌کند.</p></div>
    <div className="inspection-scope"><h3>دامنه بازرسی</h3>
      <label><span className="check-box">✓</span><div><strong>واحد مسکونی ۴</strong><small>۱۴۰ متر</small></div></label>
      <label><span className="check-box">✓</span><div><strong>پارکینگ P-21</strong><small>طبقه -۱</small></div></label>
      <label><span className="check-box"></span><div><strong>انباری A4</strong><small>۶ متر</small></div></label>
    </div>
    <div className="inspection-note"><AlertTriangle size={16}/><span>بازرس وضعیت حقوقی مالکیت یا سلامت تخصصی سازه را تضمین نمی‌کند.</span></div>
    <button className="btn primary inspection-cta">انتخاب زمان و ادامه</button>
  </Phone>
}


function MarketplaceSearch() {
  const cards = [
    ['آپارتمان فرمانیه','۱۶۰ متر · ۳ خواب','فروش','۱۲.۸ میلیارد','verified'],
    ['ویلا لواسان','۴۲۰ متر · ۴ خواب','فروش','۲۹ میلیارد','info'],
    ['آپارتمان زعفرانیه','۱۳۵ متر · ۲ خواب','اجاره','۳۰۰ / ۴۵','neutral']
  ] as const
  return <Phone title="بازار ملک" active="search">
    <div className="market-search"><Search size={15}/><span>محله، خیابان یا نوع ملک...</span></div>
    <div className="market-filter-row"><span className="active">همه</span><span>فروش</span><span>اجاره</span><span>تأییدشده</span></div>
    <div className="market-map-strip"><Map size={17}/><span>مشاهده روی نقشه</span><b>۳۲ نتیجه</b></div>
    <div className="listing-stack">
      {cards.map((c,i)=><div className="listing-card" key={i}>
        <div className="listing-image"><div className={'listing-house h'+i}/><Status tone={c[4] as Tone}>{c[2]}</Status></div>
        <div className="listing-copy"><strong>{c[0]}</strong><span>{c[1]}</span><b>{c[3]} تومان</b></div>
        <ChevronLeft size={17}/>
      </div>)}
    </div>
  </Phone>
}

function ListingDetail() {
  return <Phone title="">
    <div className="listing-hero">
      <div className="hero-building premium"><i/><i/><i/><i/></div>
      <div className="hero-actions"><button>↗</button><button>☆</button></div>
      <span className="hero-count">5/18</span>
    </div>
    <div className="listing-detail-head"><div><h2>آپارتمان فرمانیه</h2><p>تهران، فرمانیه · ۱۶۰ متر · ۳ خواب</p></div><Status tone="verified">Verified</Status></div>
    <div className="price-row"><div><span>قیمت کل</span><strong>۱۲.۸ میلیارد</strong></div><div><span>هر متر</span><strong>۸۰ میلیون</strong></div></div>
    <div className="listing-trust"><ShieldCheck size={18}/><div><strong>Trust Passport</strong><span>هویت، موقعیت و ۶ Claim تأیید شده</span></div><ChevronLeft size={17}/></div>
    <div className="detail-actions sticky-actions"><button className="btn secondary">درخواست بازدید</button><button className="btn primary">ثبت پیشنهاد</button></div>
  </Phone>
}

function VisitBooking() {
  return <Phone title="رزرو بازدید">
    <div className="visit-property"><div className="property-thumb"><div className="mini-building"><i/><i/><i/></div></div><div><strong>آپارتمان فرمانیه</strong><span>تهران، فرمانیه</span></div></div>
    <div className="visit-section"><h3>روز مناسب</h3><div className="date-pills"><span>امروز<br/><b>۳۱</b></span><span className="active">فردا<br/><b>۱</b></span><span>پنجشنبه<br/><b>۲</b></span><span>جمعه<br/><b>۳</b></span></div></div>
    <div className="visit-section"><h3>ساعت</h3><div className="time-grid"><span>۱۰:۳۰</span><span className="active">۱۲:۰۰</span><span>۱۴:۳۰</span><span>۱۶:۰۰</span><span>۱۷:۳۰</span><span>۱۹:۰۰</span></div></div>
    <div className="visit-note"><CalendarDays size={18}/><div><strong>هماهنگی بازدید</strong><span>بعد از تأیید مالک، جزئیات ورود برای شما ارسال می‌شود.</span></div></div>
    <button className="btn primary visit-cta">ارسال درخواست بازدید</button>
  </Phone>
}

function OfferBuilder() {
  return <Phone title="ثبت پیشنهاد">
    <div className="offer-summary"><span>قیمت پیشنهادی فروشنده</span><strong>۱۲.۸ میلیارد تومان</strong><small>قیمت هر متر ۸۰ میلیون</small></div>
    <div className="offer-field"><label>مبلغ پیشنهادی شما</label><div><input defaultValue="12,300,000,000"/><span>تومان</span></div></div>
    <div className="offer-field"><label>شرایط پرداخت</label><div className="select-like">۳۰٪ هنگام قرارداد · الباقی در انتقال <ChevronLeft size={15}/></div></div>
    <div className="offer-field"><label>اعتبار پیشنهاد</label><div className="select-like">۴۸ ساعت <ChevronLeft size={15}/></div></div>
    <div className="offer-note"><ShieldCheck size={17}/><span>پیشنهاد شما برای طرف مقابل ثبت و در timeline معامله نگهداری می‌شود.</span></div>
    <button className="btn primary offer-cta">ارسال پیشنهاد</button>
  </Phone>
}

function DealSummary() {
  return <Phone title="خلاصه معامله">
    <div className="deal-status"><CheckCircle2 size={27}/><div><h3>پیشنهاد پذیرفته شد</h3><p>فرایند معامله آماده ورود به مرحله قرارداد است.</p></div></div>
    <div className="deal-property"><strong>آپارتمان فرمانیه</strong><span>فروش · ۱۲.۳ میلیارد تومان</span></div>
    <div className="deal-steps">
      <div className="done"><i>✓</i><span><strong>پیشنهاد</strong><small>توافق روی مبلغ و شرایط</small></span></div>
      <div className="active"><i>2</i><span><strong>قرارداد</strong><small>در حال آماده‌سازی</small></span></div>
      <div><i>3</i><span><strong>پرداخت</strong><small>پس از قرارداد</small></span></div>
      <div><i>4</i><span><strong>تحویل و ثبت</strong><small>مرحله نهایی</small></span></div>
    </div>
    <button className="btn primary deal-cta">ادامه به قرارداد</button>
  </Phone>
}

function TransactionTracker() {
  return <Phone title="پیگیری معامله">
    <div className="transaction-hero"><FileCheck2 size={24}/><div><span>شناسه معامله</span><strong>TX-1405-0921-1842</strong></div></div>
    <div className="transaction-list">
      <div className="done"><CheckCircle2/><div><strong>توافق اولیه</strong><span>تکمیل‌شده · ۱۴۰۵/۰۶/۳۰</span></div></div>
      <div className="done"><CheckCircle2/><div><strong>احراز طرفین</strong><span>تکمیل‌شده · ۱۴۰۵/۰۶/۳۱</span></div></div>
      <div className="current"><FileCheck2/><div><strong>قرارداد</strong><span>در انتظار تأیید طرفین</span></div></div>
      <div><WalletCards/><div><strong>پرداخت امن</strong><span>بعد از قرارداد فعال می‌شود</span></div></div>
      <div><KeyRound/><div><strong>تحویل و ثبت نهایی</strong><span>در انتظار مراحل قبل</span></div></div>
    </div>
    <div className="transaction-note"><AlertTriangle size={16}/><span>قابلیت‌های رسمی/مجوزمحور تا زمان فعال‌شدن Capability Gate ممکن است در حالت آزمایشی باقی بمانند.</span></div>
  </Phone>
}


function NotificationsScreen() {
  const items = [
    ['قرارداد شما ۲۷ روز دیگر پایان می‌یابد','آپارتمان نیاوران','warning'],
    ['پرداخت شارژ شهریور ثبت شد','ساختمان نیاوران','verified'],
    ['درخواست بازدید جدید دارید','آپارتمان فرمانیه','info'],
    ['مدرک جدید به Property Passport اضافه شد','پارکینگ P-21','neutral']
  ] as const
  return <Phone title="اعلان‌ها" active="messages">
    <div className="notification-tabs"><span className="active">همه</span><span>املاک</span><span>قرارداد</span><span>مالی</span></div>
    <div className="notification-list">{items.map((n,i)=><div className="notification-row" key={i}>
      <div className={'notice-dot '+n[2]}/><div><strong>{n[0]}</strong><span>{n[1]}</span><small>{i===0?'امروز، ۱۰:۳۲':'دیروز'}</small></div><ChevronLeft size={16}/>
    </div>)}</div>
  </Phone>
}

function MessagesScreen() {
  const chats=[['علی محمدی','درباره تمدید قرارداد صحبت کنیم؟','۱۰:۴۲','2'],['پشتیبانی Property OS','درخواست شما بررسی شد','دیروز',''],['بازرس نیاوران','گزارش بازرسی آماده است','شنبه','1']] as const
  return <Phone title="پیام‌ها" active="messages">
    <div className="messages-search"><Search size={15}/><span>جستجو در گفتگوها...</span></div>
    <div className="chat-list">{chats.map((c,i)=><div className="chat-row" key={i}>
      <div className="avatar">{c[0][0]}</div><div><strong>{c[0]}</strong><span>{c[1]}</span></div><div className="chat-meta"><small>{c[2]}</small>{c[3]&&<b>{c[3]}</b>}</div>
    </div>)}</div>
  </Phone>
}

function ProfileRoles() {
  return <Phone title="حساب من" active="account">
    <div className="profile-hero"><div className="avatar profile-avatar">ح</div><div><h3>حمیدرضا پاکپور</h3><span>0912 345 6789</span></div><button className="btn secondary compact">ویرایش</button></div>
    <div className="role-section"><h3>نقش‌های من</h3>
      <div className="role-card"><div><Home size={18}/><span><strong>مالک</strong><small>۵ ملک</small></span></div><Status tone="verified">فعال</Status></div>
      <div className="role-card"><div><Building2 size={18}/><span><strong>مدیر ساختمان</strong><small>ساختمان نیاوران</small></span></div><Status tone="verified">فعال</Status></div>
    </div>
    <div className="account-menu"><div><ShieldCheck/><span>امنیت و دستگاه‌ها</span><ChevronLeft/></div><div><WalletCards/><span>اشتراک و پرداخت</span><ChevronLeft/></div><div><Bell/><span>تنظیمات اعلان</span><ChevronLeft/></div><div><MessageSquare/><span>پشتیبانی</span><ChevronLeft/></div></div>
  </Phone>
}

function SubscriptionScreen() {
  return <Phone title="اشتراک">
    <div className="plan-hero"><span>پلن فعلی</span><h2>Owner Pro</h2><p>برای مدیریت حرفه‌ای سبد املاک</p><Status tone="verified">فعال</Status></div>
    <div className="plan-usage">
      <div><span>املاک فعال</span><strong>5 / 10</strong></div><i><em style={{width:'50%'}}/></i>
      <div><span>فضای اسناد</span><strong>1.8 / 5 GB</strong></div><i><em style={{width:'36%'}}/></i>
    </div>
    <div className="plan-features"><h3>امکانات فعال</h3><div>✓ مدیریت Portfolio</div><div>✓ Property Passport</div><div>✓ یادآوری قراردادها</div><div>✓ گزارش مالی پایه</div></div>
    <div className="renewal-card"><div><span>تمدید بعدی</span><strong>۱۴۰۵/۰۷/۲۲</strong></div><button className="btn secondary compact">مدیریت پلن</button></div>
  </Phone>
}

function SecurityDevices() {
  return <Phone title="امنیت و دستگاه‌ها">
    <div className="security-score"><ShieldCheck size={28}/><div><h3>امنیت حساب خوب است</h3><p>ورود دومرحله‌ای و دستگاه‌های مورد اعتماد فعال‌اند.</p></div></div>
    <div className="security-section"><h3>دستگاه‌های فعال</h3>
      <div className="device-row"><div className="device-icon">A55</div><div><strong>Galaxy A55</strong><span>تهران · همین دستگاه</span></div><Status tone="verified">فعال</Status></div>
      <div className="device-row"><div className="device-icon">PC</div><div><strong>Windows Desktop</strong><span>آخرین فعالیت: ۲ ساعت قبل</span></div><Status tone="neutral">معتبر</Status></div>
    </div>
    <div className="security-options"><div><span>ورود دومرحله‌ای</span><Status tone="verified">روشن</Status></div><div><span>هشدار ورود جدید</span><Status tone="verified">روشن</Status></div><div><span>خروج از همه دستگاه‌ها</span><button>اجرا</button></div></div>
  </Phone>
}

function SupportCenter() {
  return <Phone title="پشتیبانی">
    <div className="support-hero"><MessageSquare size={27}/><div><h3>چطور می‌تونیم کمک کنیم؟</h3><p>موضوع را انتخاب کنید یا درخواست جدید بسازید.</p></div></div>
    <div className="support-actions"><div><FileCheck2/><span>قرارداد و معامله</span></div><div><CircleDollarSign/><span>پرداخت و صورتحساب</span></div><div><ShieldCheck/><span>اعتماد و بازرسی</span></div><div><Settings/><span>حساب و تنظیمات</span></div></div>
    <div className="support-ticket"><div><strong>#2481 — اصلاح اطلاعات Property Passport</strong><span>آخرین پاسخ: ۲ ساعت قبل</span></div><Status tone="info">در حال بررسی</Status></div>
    <button className="btn primary support-cta"><Plus size={15}/>درخواست جدید</button>
    <p className="privacy-note">حریم خصوصی و داده‌های حساس فقط در محدوده لازم برای رسیدگی به درخواست نمایش داده می‌شوند.</p>
  </Phone>
}

function DesignSystem() {
  const colors = [
    ['Primary','#13233F'],['Action','#315EFB'],['Success','#12A47A'],['Warning','#F59E0B'],['Error','#E5484D'],
    ['BG','#F6F8FC'],['Surface','#FFFFFF'],['Text','#101828'],['Muted','#667085'],['Border','#E4E7EC']
  ]
  return <section className="design-system">
    <div className="ds-column"><h3>Design System</h3><div className="swatches">{colors.map(([n,c])=><div key={n}><i style={{background:c}}/><b>{n}</b><span>{c}</span></div>)}</div></div>
    <div className="ds-column type-column"><h3>Typography</h3><div className="type-preview"><div>Aa</div><p><b>Display</b><span>32 / Bold</span><b>Page Title</b><span>22 / Bold</span><b>Body</b><span>14 / Regular</span><b>Label</b><span>13 / Medium</span></p></div></div>
    <div className="ds-column"><h3>Components</h3><div className="component-row"><button className="btn primary compact">ادامه</button><button className="btn secondary compact">ذخیره</button><div className="input-demo">متن خود را وارد کنید ...</div><Status tone="verified">تأیید شده</Status><Status tone="warning">در انتظار</Status></div></div>
  </section>
}

function ReviewBoard() {
  return <div className="review-page">
    <header className="review-header"><div><h1>مدیریت هوشمند املاک و ساختمان‌ها</h1><p>ساختاری · امن‌تر · ارزشمندتر</p></div><Brand/></header>
    <DesignSystem/>
    <div className="review-section-head"><div><span>Reference screens</span><h2>Mobile — Calm Premium</h2></div><small>RTL first · LTR ready</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><Splash/><label>1. Splash</label></div>
      <div className="screen-wrap"><Login/><label>2. Login</label></div>
      <div className="screen-wrap"><Otp/><label>3. OTP</label></div>
      <div className="screen-wrap"><HomeScreen/><label>4. Home</label></div>
      <div className="screen-wrap"><PropertyDetail/><label>5. Property Detail</label></div>
      <div className="screen-wrap"><MyCity/><label>6. My City</label></div>
    </div>
    <div className="review-section-head flow-heading"><div><span>Domain-driven mobile</span><h2>Portfolio / Property / Spaces</h2></div><small>Property → Structure → Space → History</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><PortfolioOverview/><label>10. Portfolio</label></div>
      <div className="screen-wrap"><PropertyPassport/><label>11. Property Passport</label></div>
      <div className="screen-wrap"><PropertyTimeline/><label>12. Property Timeline</label></div>
      <div className="screen-wrap"><SpacesOverview/><label>13. Spaces</label></div>
      <div className="screen-wrap"><SpaceDetail/><label>14. Space Detail</label></div>
      <div className="screen-wrap"><BundleBuilder/><label>15. Bundle Builder</label></div>
      <div className="screen-wrap"><AddProperty/><label>15A. Add Property</label></div>
      <div className="screen-wrap"><PropertyDocuments/><label>15B. Property Documents</label></div>
      <div className="screen-wrap"><PropertyPeople/><label>15C. People & Roles</label></div>
      <div className="screen-wrap"><PropertyFinance/><label>15D. Property Finance</label></div>
      <div className="screen-wrap"><PropertyLease/><label>15E. Property Lease</label></div>
      <div className="screen-wrap"><SpaceLease/><label>15F. Space Lease</label></div>
    </div>
    <div className="review-section-head flow-heading"><div><span>Operations + Trust</span><h2>Building / Trust / Verification</h2></div><small>Capture freely → Verify selectively → Label clearly</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><BuildingDashboard/><label>16. Building Dashboard</label></div>
      <div className="screen-wrap"><BuildingUnits/><label>17. Units & Residents</label></div>
      <div className="screen-wrap"><ChargesLedger/><label>18. Charges Ledger</label></div>
      <div className="screen-wrap"><TrustCenter/><label>19. Trust Center</label></div>
      <div className="screen-wrap"><ClaimEvidence/><label>20. Claim Evidence</label></div>
      <div className="screen-wrap"><InspectionRequest/><label>21. Inspection Request</label></div>
    </div>
    <div className="review-section-head flow-heading"><div><span>Marketplace + Transaction</span><h2>Search / Offer / Deal</h2></div><small>Property → Listing → Visit → Offer → Transaction</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><MarketplaceSearch/><label>22. Marketplace Search</label></div>
      <div className="screen-wrap"><ListingDetail/><label>23. Listing Detail</label></div>
      <div className="screen-wrap"><VisitBooking/><label>24. Visit Booking</label></div>
      <div className="screen-wrap"><OfferBuilder/><label>25. Offer</label></div>
      <div className="screen-wrap"><DealSummary/><label>26. Deal Summary</label></div>
      <div className="screen-wrap"><TransactionTracker/><label>27. Transaction Tracker</label></div>
    </div>
    <div className="review-section-head flow-heading"><div><span>Communication + Account</span><h2>Messages / Profile / Security</h2></div><small>Personal · Clear · Controlled</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><NotificationsScreen/><label>28. Notifications</label></div>
      <div className="screen-wrap"><MessagesScreen/><label>29. Messages</label></div>
      <div className="screen-wrap"><ProfileRoles/><label>30. Profile & Roles</label></div>
      <div className="screen-wrap"><SubscriptionScreen/><label>31. Subscription</label></div>
      <div className="screen-wrap"><SecurityDevices/><label>32. Security & Devices</label></div>
      <div className="screen-wrap"><SupportCenter/><label>33. Support</label></div>
    </div>
    <div className="review-section-head flow-heading"><div><span>Field operations</span><h2>Inspector App</h2></div><small>Fast · Auditable · Evidence-first</small></div>
    <div className="mobile-grid">
      <div className="screen-wrap"><InspectorLogin/><label>34. Inspector Login</label></div>
      <div className="screen-wrap"><InspectorAssignments/><label>35. Assignments</label></div>
      <div className="screen-wrap"><InspectorAssignmentDetail/><label>36. Assignment Detail</label></div>
      <div className="screen-wrap"><InspectorChecklist/><label>37. Checklist</label></div>
      <div className="screen-wrap"><InspectorMediaCapture/><label>38. Media Capture</label></div>
      <div className="screen-wrap"><InspectorDiscrepancy/><label>39. Discrepancy</label></div>
      <div className="screen-wrap"><InspectorSubmitReport/><label>40. Submit Report</label></div>
      <div className="screen-wrap"><InspectorEarnings/><label>41. Quality & Earnings</label></div>
    </div>
    <div className="review-section-head admin-heading"><div><span>Operations</span><h2>Admin — Calm Premium</h2></div><small>Dense · Clear · Trustworthy</small></div>
    <div className="admin-grid">
      <div className="screen-wrap admin-wrap"><AdminDashboard/><label>7. Admin Dashboard</label></div>
      <div className="screen-wrap admin-wrap"><UsersManagement/><label>8. Users Management</label></div>
      <div className="screen-wrap admin-wrap"><PropertyManagement/><label>9. Property Management</label></div>
    </div>
  </div>
}

function App() {
  const route = window.location.hash.replace('#','')
  if (route === '/splash') return <div className="single-screen"><Splash/></div>
  if (route === '/login') return <div className="single-screen"><Login/></div>
  if (route === '/home') return <div className="single-screen"><HomeScreen/></div>
  if (route === '/portfolio') return <div className="single-screen"><PortfolioOverview/></div>
  if (route === '/passport') return <div className="single-screen"><PropertyPassport/></div>
  if (route === '/spaces') return <div className="single-screen"><SpacesOverview/></div>
  if (route === '/property-add') return <div className="single-screen"><AddProperty/></div>
  if (route === '/property-documents') return <div className="single-screen"><PropertyDocuments/></div>
  if (route === '/property-people') return <div className="single-screen"><PropertyPeople/></div>
  if (route === '/property-finance') return <div className="single-screen"><PropertyFinance/></div>
  if (route === '/property-lease') return <div className="single-screen"><PropertyLease/></div>
  if (route === '/space-lease') return <div className="single-screen"><SpaceLease/></div>
  if (route === '/building') return <div className="single-screen"><BuildingDashboard/></div>
  if (route === '/trust') return <div className="single-screen"><TrustCenter/></div>
  if (route === '/inspection') return <div className="single-screen"><InspectionRequest/></div>
  if (route === '/marketplace') return <div className="single-screen"><MarketplaceSearch/></div>
  if (route === '/listing') return <div className="single-screen"><ListingDetail/></div>
  if (route === '/deal') return <div className="single-screen"><DealSummary/></div>
  if (route === '/notifications') return <div className="single-screen"><NotificationsScreen/></div>
  if (route === '/account') return <div className="single-screen"><ProfileRoles/></div>
  if (route === '/security') return <div className="single-screen"><SecurityDevices/></div>
  if (route === '/inspector') return <div className="single-screen"><InspectorAssignments/></div>
  return <ReviewBoard/>
}

export default App
