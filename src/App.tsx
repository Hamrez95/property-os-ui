import {
  Bell, Building2, CalendarDays, CheckCircle2, ChevronLeft, CircleDollarSign,
  FileCheck2, Home, KeyRound, Map, MessageSquare, Plus, Search, ShieldCheck,
  UserRound, Users, WalletCards, Wrench, XCircle, AlertTriangle, MoreVertical,
  ArrowLeft, House, Menu, Settings, Landmark, ClipboardCheck
} from 'lucide-react'

type Tone = 'verified' | 'warning' | 'danger' | 'neutral' | 'info'

const properties = [
  { title: 'آپارتمان نیاوران', meta: '۱۴۰ متر · طبقه ۴', tone: 'verified' as Tone, status: 'اجاره‌شده' },
  { title: 'پارکینگ ونک', meta: 'طبقه -۱ · مستقل', tone: 'neutral' as Tone, status: 'خالی' }
]

function Brand({ compact=false }: { compact?: boolean }) {
  return <div className="brand">
    <div className="brand-mark"><House size={compact ? 17 : 23} strokeWidth={2.4}/></div>
    <div>
      <div className={compact ? 'brand-name compact' : 'brand-name'}>Property OS</div>
      {!compact && <div className="brand-tagline">Your Property. In a Smarter World.</div>}
    </div>
  </div>
}

function Status({ tone='neutral', children }: { tone?: Tone, children: React.ReactNode }) {
  const Icon = tone === 'verified' ? CheckCircle2 : tone === 'warning' ? AlertTriangle : tone === 'danger' ? XCircle : ShieldCheck
  return <span className={'status ' + tone}><Icon size={12}/>{children}</span>
}

function Phone({ title, children, active='home' }: { title?: string, children: React.ReactNode, active?: string }) {
  return <div className="phone">
    <div className="phone-status"><span>9:41</span><span>▮▮◒</span></div>
    {title && <div className="mobile-header"><ChevronLeft size={20}/><strong>{title}</strong><span className="header-spacer"/></div>}
    <div className="phone-body">{children}</div>
    <BottomNav active={active}/>
  </div>
}

function BottomNav({ active='home' }: { active?: string }) {
  const items = [
    ['home', Home, 'خانه'], ['search', Search, 'جستجو'], ['add', Plus, 'افزودن'],
    ['messages', MessageSquare, 'پیام‌ها'], ['account', UserRound, 'حساب']
  ] as const
  return <div className="bottom-nav">
    {items.map(([key, Icon, label]) => <div key={key} className={'nav-item ' + (active===key ? 'active' : '') + (key==='add' ? ' add' : '')}>
      <span className="nav-icon"><Icon size={17}/></span><span>{label}</span>
    </div>)}
  </div>
}

function PropertyCard({title,meta,status,tone='verified'}:{title:string,meta:string,status:string,tone?:Tone}) {
  return <div className="property-card">
    <div className="property-thumb"><div className="mini-building"><i/><i/><i/></div></div>
    <div className="property-card-copy">
      <strong>{title}</strong><span>{meta}</span><Status tone={tone}>{status}</Status>
    </div>
    <ChevronLeft size={18} className="muted-icon"/>
  </div>
}

function Stat({icon:Icon,label,value,delta}:{icon:any,label:string,value:string,delta:string}) {
  return <div className="stat"><div className="stat-icon"><Icon size={18}/></div><div><span>{label}</span><strong>{value}</strong><small>{delta}</small></div></div>
}

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

function AdminShell({section,children}:{section:string,children:React.ReactNode}) {
  const nav = [
    [Home,'داشبورد'],[Users,'کاربران'],[Building2,'املاک'],[Landmark,'ساختمان‌ها'],
    [FileCheck2,'قراردادها'],[ShieldCheck,'بازرسی‌ها'],[WalletCards,'پرداخت‌ها'],
    [MessageSquare,'پیام‌ها'],[Settings,'تنظیمات']
  ] as const
  return <div className="admin-shell" dir="rtl">
    <aside className="sidebar">
      <Brand compact/>
      <nav>{nav.map(([Icon,label])=><div key={label} className={section===label?'active':''}><Icon size={17}/><span>{label}</span></div>)}</nav>
    </aside>
    <main className="admin-main">
      <div className="admin-topbar"><div className="global-search"><Search size={15}/><span>جستجو ...</span></div><div className="admin-profile"><Bell size={17}/><div className="avatar small">ح</div><span>مدیر سیستم</span></div></div>
      {children}
    </main>
  </div>
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
  return <ReviewBoard/>
}

export default App
