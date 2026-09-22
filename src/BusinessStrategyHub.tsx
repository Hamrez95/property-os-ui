import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  AlertTriangle, ArrowUpLeft, BarChart3, Building2, CalendarRange, CheckCircle2,
  CircleDollarSign, FileText, Gauge, Globe2, HeartHandshake, KeyRound, Landmark,
  Lightbulb, Megaphone, Network, Rocket, ShieldCheck, Target, TrendingUp, Users,
  WalletCards, Wrench, Zap
} from 'lucide-react'
import { ProjectSiteHeader } from './ProjectHub'

type StrategyState='evidence'|'hypothesis'|'decision'
function State({kind,children}:{kind:StrategyState,children:ReactNode}){
  return <span className={'biz-state '+kind}>{children}</span>
}
function jump(id:string){ document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}) }

const segments=[
  {name:'مستأجر / ساکن',job:'قرارداد، شارژ، تعمیرات و پیام ساختمان را گم نکنم.',pay:'کم–متوسط',retention:'زیاد',wedge:'collaboration'},
  {name:'مالک ۱–۳ ملک',job:'ملک، مستأجر، مدارک و سررسیدها را یکجا کنترل کنم.',pay:'متوسط',retention:'متوسط–زیاد',wedge:'اولین پلن پولی'},
  {name:'مالک چندملکی',job:'اشغال، قرارداد، مالی و ریسک کل سبد را ببینم.',pay:'متوسط–زیاد',retention:'زیاد',wedge:'LTV بالا'},
  {name:'مدیر ساختمان',job:'شارژ، هزینه، اعلان، مجمع و تعمیرات شفاف باشد.',pay:'متوسط',retention:'زیاد',wedge:'توزیع چندکاربره'},
  {name:'بازرس / سرویس‌دهنده',job:'کار scoped، evidence و تحویل قابل پیگیری داشته باشم.',pay:'B2B supply',retention:'وابسته به تقاضا',wedge:'Trust layer'},
  {name:'مشاور / حرفه‌ای',job:'داده آماده و معتبر را به Listing/Deal تبدیل کنم.',pay:'متوسط–زیاد',retention:'زیاد',wedge:'فاز بعد'},
]

const canvas=[
  {key:'partners',title:'Key Partners',items:['SMS / OTP','PSP / Payment','Cloud / Storage','Legal / Notary advisors','Tax / Accounting','Inspectors & Services','Official/regulated partners']},
  {key:'activities',title:'Key Activities',items:['Property lifecycle','Building operations','Trust & Evidence','Security / Privacy','Support','Growth experiments','Regulatory tracking']},
  {key:'value',title:'Value Proposition',items:['Persistent Property Record','Role-aware workflows','Lease / Docs / Maintenance','Building transparency','Progressive Trust','Reusable verified history']},
  {key:'relationships',title:'Customer Relationships',items:['Self-service','Guided onboarding','Invitations','Lifecycle reminders','Support','Assisted building setup']},
  {key:'segments',title:'Customer Segments',items:['Tenants','Owners','Multi-owners','Building managers','Inspectors','Professionals later','Short-stay hosts later']},
  {key:'resources',title:'Key Resources',items:['Domain model','Property history graph','Relationship graph','Trust graph','Brand','Engineering','Partner network']},
  {key:'channels',title:'Channels',items:['App / PWA / Web','Referral loops','Building managers','SEO / Content','Social education','Partnerships','Lifecycle SMS']},
  {key:'cost',title:'Cost Structure',items:['Engineering','Cloud / SMS','Support','Marketing','Field ops','Legal / Compliance','Quality / insurance reserve']},
  {key:'revenue',title:'Revenue Streams',items:['Owner subscription','Building subscription','Inspection fee','Professional plans','Premium listing later','Integration fees where allowed','Analytics later']},
]

const forces=[
  ['رقابت موجود','زیاد','Classifieds، portals، building apps و آفلاین قوی‌اند.'],
  ['قدرت جایگزین','خیلی زیاد','تلگرام/واتساپ، اکسل، کاغذ، انتقال بانکی و دفتر مدیر تقریباً رایگان‌اند.'],
  ['Switching cost کاربر','کم در شروع','باید با history، collaboration و evidence ساخته شود؛ نه lock-in مصنوعی.'],
  ['ورود رقیب جدید','متوسط','UI قابل کپی است؛ تاریخچه و trust graph سخت‌تر.'],
  ['قدرت شریک/تأمین‌کننده','متوسط','SMS، payment، inspector و official integration می‌توانند bottleneck شوند.'],
]

const risks=[
  {risk:'Core retention جواب ندهد',l:'متوسط',i:'بحرانی',signal:'Property ساخته می‌شود ولی برگشت وجود ندارد',mitigation:'تمرکز JTBD + حذف featureهای کم‌ارزش'},
  {risk:'Scope بیش از حد باز',l:'زیاد',i:'زیاد',signal:'ماژول‌های زیاد نیمه‌کاره',mitigation:'R1 gate؛ R3/R4 قبل از evidence ممنوع'},
  {risk:'تورم و نوسان قیمت',l:'زیاد',i:'زیاد',signal:'هزینه‌ها سریع‌تر از ARPA بالا می‌روند',mitigation:'بازنگری قیمت + burn پایین'},
  {risk:'Incident امنیت/حریم خصوصی',l:'متوسط',i:'بحرانی',signal:'access anomaly / data leak',mitigation:'least privilege + audit + incident plan'},
  {risk:'Official integration دیر شود',l:'زیاد',i:'زیاد',signal:'API/partner delay',mitigation:'R1/R2 مستقل از transaction rail'},
  {risk:'CAC بالا',l:'متوسط',i:'زیاد',signal:'paid user بدون retention',mitigation:'referral/building/content first'},
  {risk:'Founder bandwidth',l:'زیاد',i:'زیاد',signal:'context switching دائمی',mitigation:'WIP limit + hire trigger'},
  {risk:'Inspection economics ضعیف',l:'متوسط',i:'زیاد',signal:'rework / travel / complaint',mitigation:'pilot + contribution margin gate'},
]

const gates=[
  {n:'A',title:'Core Retention',before:'قبل از Marketplace',need:'کاربر بدون معامله برگردد؛ مالک/مدیر usage واقعی و collaboration داشته باشند.'},
  {n:'B',title:'Monetization',before:'قبل از Growth hiring',need:'paid conversion، gross margin و support cost واقعی مشخص باشد.'},
  {n:'C',title:'Trust Economics',before:'قبل از Scale inspection',need:'تقاضا + turnaround + quality + contribution margin مثبت.'},
  {n:'D',title:'Marketplace',before:'قبل از Paid marketplace',need:'Property supply retained + quality data + seller intent + trust differentiation.'},
  {n:'E',title:'Transaction',before:'قبل از regulated activation',need:'legal path + partner/access + security + money/liability + reconciliation.'},
]

const milestones=[
  {time:'۰–۳ ماه',title:'Evidence',items:['R1 Private Beta','۳۰–۵۰ کاربر عمیقاً مشاهده‌شده','۵–۱۰ ساختمان','Retention baseline','Pricing interviews']},
  {time:'۳–۶ ماه',title:'Repeatability',items:['Owner/Building paid tests','Collaboration loops','Support playbook','R2 Trust pilot','Partner experiments']},
  {time:'۶–۱۲ ماه',title:'Distribution',items:['Building-led acquisition','SEO/content engine','Verification economics','Professional pilot','R3 فقط بعد از Gate A/B']},
  {time:'۱۲–۱۸ ماه',title:'Expansion',items:['Marketplace liquidity','Official integration readiness','Service network','Transaction rail if gated','Fundraise or profitable-growth path']},
]

export function BusinessStrategyHub(){
  const [focus,setFocus]=useState<'all'|'core'|'growth'|'risk'>('all')
  return <div className="hub-page biz-page" dir="rtl">
    <ProjectSiteHeader active="business"/>
    <main className="hub-main">
      <section className="biz-hero">
        <div className="biz-hero-copy">
          <span className="hub-kicker">PROPERTY OS · BUSINESS & STRATEGY</span>
          <h1>استراتژی ما: قبل از معامله، <em>سیستم‌عامل ملک</em> باشیم.</h1>
          <p>این صفحه مرجع مشترک Product، Business، Marketing، Economics، HR و Strategy است؛ تا تصمیم‌های بیزینسی مثل featureها در چت گم نشوند.</p>
          <div className="biz-hero-actions">
            <button onClick={()=>jump('canvas')} className="hub-primary">Business Model Canvas <ArrowUpLeft size={16}/></button>
            <button onClick={()=>jump('gates')} className="hub-secondary">Strategic Gates</button>
          </div>
        </div>
        <aside className="strategy-thesis">
          <div className="strategy-thesis-head"><Target size={20}/><div><span>STRATEGIC THESIS</span><strong>Record → Operate → Trust → Market → Transact</strong></div></div>
          <p>Property می‌تواند سال‌ها بدون Listing در محصول زنده بماند. مزیت اصلی باید از تاریخچه و عملیات روزمره ساخته شود، نه فقط liquidity آگهی.</p>
          <div className="thesis-flow"><b>Property</b><i/> <b>Operations</b><i/> <b>Trust</b><i/> <b>Listing</b><i/> <b>Transaction</b></div>
        </aside>
      </section>

      <nav className="biz-local-nav" aria-label="ناوبری بیزینس">
        {[['north','ویژن'],['market','بازار'],['segments','مشتری'],['canvas','Canvas'],['gtm','GTM'],['economics','اقتصاد'],['org','تیم'],['risk','ریسک'],['gates','Roadmap']].map(([id,label])=><button key={id} onClick={()=>jump(id)}>{label}</button>)}
      </nav>

      <section className="biz-evidence-strip">
        <article><Globe2/><div><strong>92.4M</strong><span>جمعیت ایران · 2025</span></div><State kind="evidence">EVIDENCE</State></article>
        <article><Network/><div><strong>73.8M</strong><span>کاربر اینترنت · late 2025</span></div><State kind="evidence">EVIDENCE</State></article>
        <article><Gauge/><div><strong>79.6%</strong><span>Internet penetration</span></div><State kind="evidence">EVIDENCE</State></article>
        <article><Landmark/><div><strong>Private Platform</strong><span>مسیر regulated در قوانین جدید دیده شده</span></div><State kind="evidence">EVIDENCE</State></article>
      </section>

      <section id="north" className="biz-section">
        <div className="hub-section-head"><span>01 · NORTH STAR</span><h2>Vision، Mission و چیزی که باید ثابت بماند</h2><p>هر feature و revenue stream باید بتواند نشان دهد چطور به این thesis کمک می‌کند.</p></div>
        <div className="north-grid">
          <article><span>VISION · 7–10Y</span><h3>هر ملک مهم، یک رکورد دیجیتال قابل مدیریت و قابل اعتماد داشته باشد.</h3><p>Property در طول مالکیت، سکونت، تعمیر، اجاره، عرضه و انتقال یک identity پایدار داشته باشد.</p><State kind="hypothesis">DIRECTION</State></article>
          <article><span>MISSION · 3Y</span><h3>مالک، مستأجر و مدیر ساختمان را از پراکندگی عملیات روزمره بیرون بیاوریم.</h3><p>Document + Relationship + Lease + Building + Maintenance + Trust در یک جریان.</p><State kind="decision">WORKING DECISION</State></article>
          <article><span>18M INTENT</span><h3>ثابت کنیم کاربر قبل از خرید/فروش هم مرتب برمی‌گردد.</h3><p>اگر core operations retention نسازد، Marketplace بزرگ فقط سطح دیگری از classifieds می‌شود.</p><State kind="decision">STRATEGIC GATE</State></article>
        </div>
        <div className="north-metric">
          <div><TrendingUp size={20}/><span>NORTH STAR METRIC</span></div>
          <strong>Monthly Active Managed Properties — MAMP</strong>
          <p>فقط Propertyهایی شمرده شوند که در ماه یک رویداد مدیریتی واقعی مثل Lease، Role، Document، Charge، Maintenance، Verification یا Listing داشته‌اند.</p>
          <div className="metric-support"><span>Quality companion</span><b>Collaborative Property Rate</b><small>% املاک فعال با ۲+ Party فعال</small></div>
        </div>
      </section>

      <section id="market" className="biz-section">
        <div className="hub-section-head"><span>02 · MARKET & ECONOMY</span><h2>بازار بزرگ است؛ اما مزیت ما از GMV ملک نمی‌آید</h2><p>اندازه بازار را با تعداد کاربران/ساختمان‌های قابل پرداخت × ARPA بسنجیم، نه با ضرب قیمت کل معاملات در یک درصد خیالی.</p></div>
        <div className="macro-grid">
          <article className="macro-card"><Globe2/><strong>Digital Reach</strong><p>رفتار آنلاین ملک از قبل شکل گرفته؛ چالش اصلی adoption اینترنت نیست، بلکه تبدیل workflow پراکنده به record دائمی است.</p><State kind="evidence">EVIDENCE</State></article>
          <article className="macro-card"><CircleDollarSign/><strong>High Inflation</strong><p>قیمت‌گذاری اسمی باید مرتب review شود. پیام ارزش بهتر: جلوگیری از ضرر، فراموشی و دوباره‌کاری؛ نه فقط productivity.</p><State kind="evidence">MACRO RISK</State></article>
          <article className="macro-card"><Landmark/><strong>Regulatory Digitization</strong><p>حرکت به ثبت الکترونیکی و مسیر سکوهای خصوصی فرصت R4 است؛ اما R1/R2 نباید به دسترسی رسمی وابسته باشند.</p><State kind="evidence">EVIDENCE</State></article>
          <article className="macro-card"><ShieldCheck/><strong>Trust Gap</strong><p>مزیت برند باید توضیح‌پذیری باشد: self-reported، evidence-backed، provider/platform/official verification.</p><State kind="hypothesis">MARKET THESIS</State></article>
        </div>
        <div className="market-position">
          <div className="position-axis"><span>Discovery / Listing</span><i/><span>Daily Operations</span></div>
          <div className="position-card incumbent"><b>Classifieds</b><small>Audience + liquidity</small></div>
          <div className="position-card building"><b>Building apps</b><small>Recurring but narrow</small></div>
          <div className="position-card official"><b>Official systems</b><small>Authority, not daily UX</small></div>
          <div className="position-card propertyos"><Zap/><b>Property OS</b><small>Persistent record + operations + trust</small></div>
        </div>
      </section>

      <section id="segments" className="biz-section">
        <div className="hub-section-head"><span>03 · CUSTOMER / JTBD</span><h2>از «همه کسانی که ملک دارند» شروع نمی‌کنیم</h2><p>Beachhead پیشنهادی: مالک/ساکن شهری + مدیر ساختمان کوچک و متوسط؛ چون pain تکرارشونده و invite loop واقعی دارند.</p></div>
        <div className="segment-grid">
          {segments.map(x=><article key={x.name}><header><Users size={17}/><strong>{x.name}</strong></header><p>«{x.job}»</p><div><span>WTP <b>{x.pay}</b></span><span>Retention <b>{x.retention}</b></span></div><small>{x.wedge}</small></article>)}
        </div>
        <div className="beachhead-card"><Target size={24}/><div><span>BEACHHEAD</span><strong>Urban Owner / Resident + Small Building Manager</strong><p>اول recurring pain و multi-user collaboration را ثابت می‌کنیم؛ buyer-search و mass marketplace بعد از retention.</p></div><State kind="hypothesis">VALIDATE</State></div>
      </section>

      <section id="canvas" className="biz-section">
        <div className="hub-section-head"><span>04 · BUSINESS MODEL CANVAS</span><h2>Canvas کامل، ولی زنده و قابل بازبینی</h2><p>این Canvas تا PMF هر فصل بازبینی می‌شود؛ Revenueهای R4/R5 به معنی مجوز یا تصمیم نهایی نیستند.</p></div>
        <div className="bmc-grid">
          {canvas.map(x=><article key={x.key} className={'bmc '+x.key}><header><span>{x.title}</span></header><ul>{x.items.map(i=><li key={i}>{i}</li>)}</ul></article>)}
        </div>
      </section>

      <section id="gtm" className="biz-section">
        <div className="hub-section-head"><span>05 · GO-TO-MARKET & MARKETING</span><h2>اول founder-led، بعد building-led، بعد trust-led</h2><p>Paid acquisition قبل از Activation و Retention فقط پول بیشتری برای یادگیری بد مصرف می‌کند.</p></div>
        <div className="gtm-sequence">
          {[['01','Founder Discovery','۱۵ Tenant · ۱۵ Owner · ۱۰ Manager · ۵ Agent · ۵ Provider'],['02','Private Beta','شبکه شخصی + onboarding مستقیم + مشاهده واقعی'],['03','Building Loop','Manager → Units → Residents → recurring charge/announcement'],['04','Trust Loop','Evidence → Inspection → Verified Passport'],['05','Marketplace','فقط بعد از supply retained + Gate A/B']].map(([n,t,d])=><article key={n}><b>{n}</b><strong>{t}</strong><span>{d}</span></article>)}
        </div>
        <div className="marketing-grid">
          <article><Megaphone/><strong>Content Engine</strong><p>اجاره، مدارک، شارژ، وظایف مدیر، تعمیرات، سند و دانگ، trust. هر محتوا باید CTA محصولی داشته باشد.</p></article>
          <article><HeartHandshake/><strong>Referral Engine</strong><p>Owner → Tenant، Manager → Building، Tenant → Manager. پاداش اول product value باشد، نه cashback.</p></article>
          <article><Network/><strong>Partnerships</strong><p>مدیران ساختمان، سرویس‌دهنده، بازرس، مشاور حقوقی/دفترخانه؛ agents بعد از شکل‌گیری owner records.</p></article>
          <article><Zap/><strong>Lifecycle</strong><p>Lease expiry، Charge due، Maintenance due و Verification expiry با Push/SMS عملیاتی؛ marketing consent جدا.</p></article>
        </div>
        <div className="brand-line"><Lightbulb/><div><span>BRAND PROMISE</span><strong>«ملکت را فقط آگهی نکن؛ بشناس، مدیریت کن، مستند کن.»</strong></div></div>
      </section>

      <section id="economics" className="biz-section">
        <div className="hub-section-head"><span>06 · ECONOMICS & MONETIZATION</span><h2>Revenue از ارزش تکرارشونده و trust action می‌آید</h2><p>ذخیره یک Property نباید از روز اول paywall باشد؛ collaboration و record accumulation باید آسان شروع شود.</p></div>
        <div className="pricing-ladder">
          <article><span>FREE</span><strong>Activation & Network</strong><p>۱ relationship فعال · Property core · basic docs/reminders · resident participation</p></article>
          <article><span>OWNER PLUS</span><strong>Control & History</strong><p>چند ملک · lease/finance history · advanced reminders · export · representatives</p></article>
          <article><span>BUILDING</span><strong>Shared Operations</strong><p>Units · charges · debt · expense · announcements · maintenance · governance</p></article>
          <article><span>TRUST</span><strong>Pay-per-action</strong><p>Inspection · evidence package · verified passport refresh</p></article>
          <article><span>LATER</span><strong>Professional / Market</strong><p>Team tools · premium listing · analytics · regulated integration where allowed</p></article>
        </div>
        <div className="economics-grid">
          <article><BarChart3/><strong>TAM — bottom-up</strong><code>eligible accounts × paid conversion × ARPA</code><p>جدا برای Owner، Building، Trust و Professional حساب شود.</p></article>
          <article><Target/><strong>SAM</strong><p>Tehran + چند بازار شهری قابل پوشش، userهای دیجیتال، owner/resident/manager و property types فعلی.</p></article>
          <article><Gauge/><strong>SOM</strong><p>از ظرفیت واقعی acquisition/onboarding/support در ۲۴ ماه ساخته شود؛ نه درصد دلخواه از TAM.</p></article>
          <article><WalletCards/><strong>Unit Economics</strong><code>Contribution = Revenue − variable ops</code><p>Inspection یا Building تا هزینه support/travel/rework محاسبه نشود «scalable» نیست.</p></article>
        </div>
      </section>

      <section id="org" className="biz-section">
        <div className="hub-section-head"><span>07 · PEOPLE & MANAGEMENT</span><h2>تیم کوچک، ownership روشن، hiring بر اساس trigger</h2><p>زود استخدام کردن به اندازه دیر استخدام کردن خطرناک است؛ هر hire باید bottleneck واقعی را باز کند.</p></div>
        <div className="org-board">
          <article className="founder hamid"><span>HAMIDREZA</span><strong>Product / UX / Research / Client / GTM</strong><p>What & Experience · acceptance · growth experiments</p></article>
          <article className="founder masoud"><span>MASOUD</span><strong>Backend / Data / Reliability / Infra</strong><p>How · persistence · reliability · CI/CD</p></article>
          <article className="shared"><ShieldCheck/><strong>Two-signature</strong><p>Security · Core Data · Money · Official integrations · Hiring · Equity · Major spend</p></article>
        </div>
        <div className="hire-grid">
          {[['1','Engineer','validated backlog > 6–8 weeks'],['2','Customer Ops','support/building onboarding interrupts engineering'],['3','Growth / Content','retention + paid conversion proven; acquisition bottleneck'],['4','Trust Ops','inspection demand + positive contribution margin']].map(([n,t,trigger])=><article key={n}><span>{n}</span><strong>{t}</strong><small>TRIGGER</small><p>{trigger}</p></article>)}
        </div>
      </section>

      <section className="biz-section">
        <div className="hub-section-head"><span>08 · COMPETITIVE STRATEGY</span><h2>Moat در روز اول نداریم؛ باید آن را بسازیم</h2><p>AI، UI یا تعداد feature به تنهایی moat نیستند.</p></div>
        <div className="moat-wheel">
          {['Property History','Relationship Graph','Trust Graph','Workflow Habit','Collaboration','Integration Depth','Brand Trust'].map((x,i)=><div key={x} style={{'--i':i} as CSSProperties}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>)}
        </div>
        <div className="forces-grid">
          {forces.map(([name,level,desc])=><article key={name}><div><strong>{name}</strong><span>{level}</span></div><p>{desc}</p></article>)}
        </div>
      </section>

      <section id="risk" className="biz-section">
        <div className="hub-section-head"><span>09 · BUSINESS RISK REGISTER</span><h2>ریسک باید صاحب، signal و mitigation داشته باشد</h2><p>تمرکز این نسخه روی ریسک‌هایی است که می‌توانند thesis یا runway را بشکنند.</p></div>
        <div className="risk-toolbar">{(['all','core','growth','risk'] as const).map(x=><button key={x} onClick={()=>setFocus(x)} className={focus===x?'active':''}>{x==='all'?'همه':x}</button>)}</div>
        <div className="risk-table">
          <div className="risk-row head"><span>Risk</span><span>Likelihood</span><span>Impact</span><span>Early signal</span><span>Mitigation</span></div>
          {risks.filter((_,i)=>focus==='all'||focus==='core'&&i<2||focus==='growth'&&(i===5||i===6)||focus==='risk'&&i>=2).map(r=><div className="risk-row" key={r.risk}><strong>{r.risk}</strong><span>{r.l}</span><b>{r.i}</b><p>{r.signal}</p><p>{r.mitigation}</p></div>)}
        </div>
      </section>

      <section id="gates" className="biz-section">
        <div className="hub-section-head"><span>10 · STRATEGIC GATES & 18M PLAN</span><h2>Release جلو می‌رود؛ ولی Strategy باید اجازه عبور بدهد</h2><p>R3 و R4 صرفاً چون طراحی شده‌اند وارد بازار نمی‌شوند.</p></div>
        <div className="strategy-gates">
          {gates.map(g=><article key={g.n}><span>{g.n}</span><div><strong>{g.title}</strong><small>{g.before}</small><p>{g.need}</p></div></article>)}
        </div>
        <div className="milestone-grid">
          {milestones.map(m=><article key={m.time}><span>{m.time}</span><h3>{m.title}</h3>{m.items.map(x=><div key={x}><CheckCircle2 size={13}/>{x}</div>)}</article>)}
        </div>
      </section>

      <section className="biz-section readiness-section">
        <div className="hub-section-head"><span>11 · BUSINESS READINESS</span><h2>کارهای جانبی که اگر دیر شروع شوند لانچ را قفل می‌کنند</h2><p>جزئیات مقررات متغیرند؛ قبل از activation باید با منبع رسمی/متخصص دوباره verify شوند.</p></div>
        <div className="readiness-grid">
          {[
            ['Company / Founders','ثبت/ساختار حقوقی · Founder agreement · Equity/Vesting · IP'],
            ['Tax / Accounting','پرونده مالیاتی · حسابداری · حساب تجاری · صدور رسید/صورتحساب'],
            ['Payment','e-commerce identity prerequisites · PSP/payment partner · refund/reconciliation'],
            ['SMS','OTP/service line · delivery metrics · consent separation'],
            ['Legal','Terms · Privacy · data retention · notary/real-estate advisor'],
            ['Brand','domain ownership · naming/trademark check · support identity'],
            ['Security','2FA · least privilege · incident response · backup/restore'],
            ['Regulated Rail','licensed/approved path · identity/signature · official adapter · human fallback'],
          ].map(([t,d])=><article key={t}><CheckCircle2 size={17}/><div><strong>{t}</strong><p>{d}</p></div></article>)}
        </div>
      </section>

      <section className="biz-docs">
        <div><FileText size={22}/><div><strong>Canonical strategy pack</strong><span>نسخه تفصیلی برای review و تصمیم‌گیری در GitHub نگهداری می‌شود.</span></div></div>
        <div className="biz-doc-links">
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/BUSINESS_STRATEGY_V1.md" target="_blank" rel="noreferrer">Strategy Blueprint</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/BUSINESS_MODEL_CANVAS_V1.md" target="_blank" rel="noreferrer">BMC</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/GTM_STRATEGY_V1.md" target="_blank" rel="noreferrer">GTM</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/BUSINESS_METRICS_V1.md" target="_blank" rel="noreferrer">Metrics</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/BUSINESS_RISK_REGISTER_V1.md" target="_blank" rel="noreferrer">Risks</a>
        </div>
      </section>
    </main>
  </div>
}
