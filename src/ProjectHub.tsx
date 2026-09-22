import { useState, type ReactNode } from 'react'
import {
  Activity, ArrowUpLeft, Blocks, BookOpen, Boxes, CalendarDays, CheckCircle2, ChevronLeft,
  CircleDot, Cloud, Code2, Database, FileCode2, FileText, Flag, GitBranch,
  Globe2, HardDrive, KeyRound, Landmark, LayoutDashboard, LockKeyhole, Menu, Search,
  MessageSquareText, Network, PackageCheck, PanelTop, Rocket, ServerCog,
  ShieldCheck, Smartphone, Sparkles, Users, WalletCards, X, Zap
} from 'lucide-react'
import { Brand } from './ui'

type DecisionState = 'locked' | 'working' | 'open'

const nav = [
  { path: '/guide', label: 'راهنمای توسعه', icon: BookOpen },
  { path: '/roadmap', label: 'نقشه راه', icon: Flag },
  { path: '/benchmark', label: 'Benchmark بازار', icon: Search },
  { path: '/operations', label: 'آمادگی لانچ', icon: Rocket },
  { path: '/design', label: 'Design Board', icon: LayoutDashboard },
]

function siteGo(path:string) {
  window.location.hash = path
}

function StatusPill({state}:{state:DecisionState}) {
  const map = {
    locked: ['LOCKED', 'قفل‌شده'],
    working: ['WORKING', 'تصمیم کاری'],
    open: ['OPEN', 'نیاز به تصمیم'],
  } as const
  return <span className={'hub-status '+state}><b>{map[state][0]}</b><small>{map[state][1]}</small></span>
}

export function ProjectSiteHeader({active}:{active:'guide'|'roadmap'|'benchmark'|'operations'|'design'}) {
  const [open,setOpen]=useState(false)
  return <header className="project-site-header" dir="rtl">
    <div className="project-site-header-inner">
      <button className="hub-brand-button" onClick={() => siteGo('/guide')} aria-label="Property OS Project Hub">
        <Brand compact/>
        <span className="hub-brand-copy"><strong>Project Operating Hub</strong><small>Shared guide for Hamidreza + Masoud</small></span>
      </button>
      <nav className="hub-nav desktop" aria-label="بخش‌های سایت">
        {nav.map(item => <button key={item.path} className={active===item.path.slice(1)?'active':''} onClick={() => siteGo(item.path)}>
          <item.icon size={15}/><span>{item.label}</span>
        </button>)}
        <button className="hub-prototype-link" onClick={() => window.location.hash='/app/splash'}><Sparkles size={15}/>Prototype</button>
      </nav>
      <button className="hub-menu-button" onClick={() => setOpen(v=>!v)} aria-expanded={open} aria-label="منوی سایت">
        {open?<X size={20}/>:<Menu size={20}/>}
      </button>
    </div>
    {open && <nav className="hub-nav mobile" aria-label="منوی موبایل">
      {nav.map(item => <button key={item.path} className={active===item.path.slice(1)?'active':''} onClick={() => {siteGo(item.path);setOpen(false)}}>
        <item.icon size={16}/><span>{item.label}</span><ChevronLeft size={15}/>
      </button>)}
      <button onClick={() => {window.location.hash='/app/splash';setOpen(false)}}><Sparkles size={16}/><span>Prototype تعاملی</span><ChevronLeft size={15}/></button>
    </nav>}
  </header>
}

function HubPage({active,children}:{active:'guide'|'roadmap'|'benchmark'|'operations'|'design',children:ReactNode}) {
  return <div className="hub-page" dir="rtl"><ProjectSiteHeader active={active}/><main className="hub-main">{children}</main></div>
}

function SectionHead({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}) {
  return <div className="hub-section-head"><span>{eyebrow}</span><h2>{title}</h2><p>{desc}</p></div>
}

const sourceCards = [
  {title:'Notion',role:'Why / What / Decisions / Specs',icon:FileText,state:'locked' as DecisionState},
  {title:'GitHub',role:'Code / Issues / PR / CI',icon:GitBranch,state:'locked' as DecisionState},
  {title:'Design Hub',role:'UX / UI / Prototype / Review',icon:PanelTop,state:'locked' as DecisionState},
  {title:'AI',role:'Challenge / Review / Acceleration',icon:Sparkles,state:'locked' as DecisionState},
]

const stack = [
  {name:'Main App',value:'Flutter',detail:'Android + iOS native later + Web/PWA beta',icon:Smartphone,state:'working' as DecisionState},
  {name:'Inspector App',value:'Flutter',detail:'field-first, evidence capture, shared mobile patterns',icon:ShieldCheck,state:'working' as DecisionState},
  {name:'Admin Web',value:'React + TypeScript',detail:'tables, audit, filters, desktop-first operations',icon:LayoutDashboard,state:'working' as DecisionState},
  {name:'Backend',value:'ASP.NET Core',detail:'authoritative business logic + REST API',icon:ServerCog,state:'working' as DecisionState},
  {name:'Database',value:'PostgreSQL + EF Core',detail:'migrations, relational integrity, audit-friendly model',icon:Database,state:'working' as DecisionState},
  {name:'API Contract',value:'OpenAPI',detail:'contract-first parallel frontend/backend work',icon:Network,state:'working' as DecisionState},
  {name:'Iran Infra',value:'Liara',detail:'initial API + PostgreSQL + object storage candidate',icon:Cloud,state:'working' as DecisionState},
  {name:'Design Hub',value:'Vercel',detail:'main → production, PR → preview after Git integration',icon:Globe2,state:'locked' as DecisionState},
]

const phaseSummary = [
  {range:'01–20',release:'R1',title:'Private Beta',desc:'مدیریت واقعی املاک و ساختمان؛ بدون وابستگی به marketplace یا transaction rail.',tone:'blue'},
  {range:'21–30',release:'R2',title:'Trust Layer',desc:'Claim، Evidence، Inspection و Verified Passport.',tone:'green'},
  {range:'31–40',release:'R3',title:'Marketplace',desc:'Listing، Search، Visit، Offer و Negotiation.',tone:'purple'},
  {range:'41–50',release:'R4',title:'Transaction Rail',desc:'Contract، Payment Intent، handover و قابلیت‌های regulated پشت gate.',tone:'amber'},
  {range:'51+',release:'R5',title:'Growth & Experience',desc:'My City، analytics پیشرفته، automation و service network.',tone:'navy'},
]

export function ProjectGuidePage() {
  return <HubPage active="guide">
    <section className="hub-hero">
      <div>
        <span className="hub-kicker">PROPERTY OS · DEVELOPMENT PLAYBOOK</span>
        <h1>یک مرجع مشترک برای تصمیم‌ها، معماری و روش کار تیم</h1>
        <p>قبل از شروع هر feature، من و مسعود باید بتوانیم در کمتر از دو دقیقه بفهمیم چه چیزی ثابت است، چه چیزی هنوز تصمیم کاری است و چه چیزی نیاز به تصمیم مشترک دارد.</p>
        <div className="hub-hero-actions">
          <button className="hub-primary" onClick={() => siteGo('/roadmap')}>مشاهده اولویت توسعه <ArrowUpLeft size={16}/></button>
          <button className="hub-secondary" onClick={() => window.location.hash='/app/splash'}>باز کردن Prototype</button>
        </div>
      </div>
      <div className="hub-command-card">
        <div className="command-head"><span>Project state</span><StatusPill state="working"/></div>
        <strong>Foundation → Real Development</strong>
        <div className="command-flow"><span>Scenario</span><i/> <span>Spec</span><i/> <span>Contract</span><i/> <span>Build</span><i/> <span>Test</span><i/> <span>PR</span></div>
        <div className="command-note"><Zap size={17}/><span>هیچ تصمیم مهمی فقط در Chat باقی نمی‌ماند؛ تصمیم نهایی باید در Notion ثبت و اجرای آن در GitHub قابل ردیابی باشد.</span></div>
      </div>
    </section>

    <SectionHead eyebrow="01 · SOURCE OF TRUTH" title="هر ابزار دقیقاً برای چه چیزی است؟" desc="این تقسیم مسئولیت ثابت می‌ماند تا اطلاعات پروژه در چند ابزار با هم رقابت نکنند."/>
    <section className="source-grid">
      {sourceCards.map(card => <article className="source-card" key={card.title}><div className="source-icon"><card.icon size={20}/></div><div><strong>{card.title}</strong><span>{card.role}</span></div><StatusPill state={card.state}/></article>)}
    </section>

    <SectionHead eyebrow="02 · TEAM OPERATING MODEL" title="تقسیم مالکیت بین حمیدرضا و مسعود" desc="مالک هر حوزه می‌تواند تصمیم‌های reversible را جلو ببرد؛ تصمیم‌های سخت‌برگشت در Shared Zone دو امضا می‌خواهند."/>
    <section className="team-layout">
      <article className="founder-card product"><div className="founder-tag">HAMIDREZA</div><h3>Product / UX / Client</h3><p>مسئول اینکه چه چیزی و با چه تجربه‌ای ساخته شود.</p><div className="responsibility-chips"><span>Product Scope</span><span>Research</span><span>UX/UI</span><span>Flutter Client</span><span>AI Review</span><span>Acceptance</span></div></article>
      <article className="founder-card backend"><div className="founder-tag">MASOUD</div><h3>Backend / Data / Reliability</h3><p>مسئول اینکه سیستم چطور درست، امن و قابل‌اتکا اجرا شود.</p><div className="responsibility-chips"><span>ASP.NET Core</span><span>PostgreSQL</span><span>Data Model</span><span>Reliability</span><span>CI/CD</span><span>Observability</span></div></article>
      <article className="shared-zone"><div><Users size={19}/><strong>Shared / Two-signature</strong></div><p>Security & Auth · Permissions · Core Data Model · Ownership History · Financial Ledger · Official Integrations · Transaction Rail · Major Architecture</p></article>
    </section>

    <SectionHead eyebrow="03 · COLLABORATION LOOP" title="یک Feature چطور بین دو نفر حرکت می‌کند؟" desc="Contract-first باعث می‌شود فرانت و بک‌اند موازی جلو بروند و هیچ‌کس منتظر دیگری نماند."/>
    <section className="collab-flow">
      {[
        ['01','Scenario','حمیدرضا','سناریو + Acceptance Criteria'],
        ['02','Contract','Shared','OpenAPI + payload + permission'],
        ['03','Frontend','حمیدرضا','Flutter states + mock'],
        ['04','Backend','مسعود','API + DB + policy'],
        ['05','Integration','Shared','real API + integration test'],
        ['06','PR / Learn','Owner','review → merge → feedback'],
      ].map(([n,t,o,d])=><article key={n}><b>{n}</b><strong>{t}</strong><span>{o}</span><small>{d}</small></article>)}
    </section>

    <SectionHead eyebrow="04 · STACK" title="پشته فنی پیشنهادی و وضعیت تصمیم" desc="LOCKED یعنی ثابت؛ WORKING یعنی مسیر فعلی برای توسعه است ولی قبل از هزینه سنگین قابل بازنگری است."/>
    <section className="stack-grid">
      {stack.map(item => <article key={item.name}><div className="stack-top"><div className="stack-icon"><item.icon size={19}/></div><StatusPill state={item.state}/></div><span>{item.name}</span><h3>{item.value}</h3><p>{item.detail}</p></article>)}
    </section>

    <SectionHead eyebrow="05 · REPOSITORY MODEL" title="کد واقعی از Design Prototype جدا می‌ماند" desc="Design Hub مرجع بصری است؛ repo محصول باید برای production architecture ساخته شود."/>
    <section className="repo-map">
      <article className="repo-current"><div><PanelTop size={21}/><span>Design / Prototype</span></div><strong>property-os-ui</strong><p>Design system · coded screens · clickable prototype · project operating hub</p><span className="repo-state">KEEP</span></article>
      <div className="repo-arrow">→</div>
      <article className="repo-future"><div><Boxes size={21}/><span>Production code</span></div><strong>property-os</strong><p>apps/property_app · apps/inspector_app · apps/admin_web · services/property_api · contracts/openapi · infra</p><StatusPill state="working"/></article>
    </section>

    <SectionHead eyebrow="06 · DOMAIN GUARDRAILS" title="قواعدی که implementation نباید بشکند" desc="این‌ها تصمیم UI نیستند؛ بخشی از هویت domain محصول‌اند."/>
    <section className="guardrail-grid">
      <article><Blocks/><strong>Property Record ≠ Listing</strong><p>Listing فقط projection موقت و قابل‌اشتراک از Property Record است.</p></article>
      <article><Boxes/><strong>Parking / Storage = Space</strong><p>فضاهای مستقل با lifecycle اجاره، تاریخچه و scope مستقل؛ نه checkbox.</p></article>
      <article><ShieldCheck/><strong>Progressive Trust</strong><p>Capture freely → Verify selectively → Label clearly → Escalate with risk.</p></article>
      <article><LockKeyhole/><strong>Capability Gates</strong><p>قابلیت regulated می‌تواند ساخته و تست شود اما تا تأیید قانونی/تجاری disabled بماند.</p></article>
    </section>

    <SectionHead eyebrow="07 · RELEASE MODEL" title="اولویت عددی برای توسعه" desc="شماره توسعه روی Design Board و Issue استفاده می‌شود تا ترتیب واقعی کار همیشه روشن باشد."/>
    <section className="phase-strip">
      {phaseSummary.map(p => <button key={p.release} className={'phase-card '+p.tone} onClick={() => siteGo('/roadmap')}><span>{p.release}</span><b>{p.range}</b><strong>{p.title}</strong><small>{p.desc}</small></button>)}
    </section>

    <section className="hub-bottom-cta"><div><Rocket size={22}/><div><strong>قدم بعدی بعد از این Hub</strong><span>Freeze R1 → ساخت repo production → اولین vertical slice: Login → Home → Portfolio → Add Property → Property Detail</span></div></div><button onClick={() => siteGo('/operations')}>Launch readiness</button></section>
  </HubPage>
}

const r1 = [
  'Auth / Phone / OTP','Home Dashboard','Portfolio','Add Property','Property Detail',
  'Property Documents','People & Roles','Spaces Overview','Space Detail','Property Lease',
  'Property Finance','Building Dashboard','Units & Residents','Charges / Debt','Notifications',
  'Account / Roles','Security & Devices','Admin Dashboard','Admin Users','Admin Properties / Buildings'
]
const r2 = ['Property Passport','Trust Center','Claim Evidence','Inspection Request','Inspection Status','Verified Passport','Inspector Login','Assignments','Checklist','Evidence / Report']
const r3 = ['Publish Listing','Marketplace Search','Listing Detail','Visit Booking','Offer','Negotiation','Deal Summary','Marketplace moderation','Admin Listings','Admin Deals']
const r4 = ['Contract Review','Payment Intent','Secure Payment UI','Transaction Tracker','Party verification','Official registration gate','Handover','Audit / dispute','Admin Payments','Admin Compliance']
const r5 = ['My City','Advanced Analytics','Service Network','Automation','Recommendations','Owner Intelligence']

function RoadmapList({start,items,release}:{start:number,items:string[],release:string}) {
  return <div className="roadmap-list">{items.map((item,i)=><div key={item}><span className="priority-no">{String(start+i).padStart(2,'0')}</span><span className="release-code">{release}</span><strong>{item}</strong><small>{start+i<=20?'Beta critical':release==='R2'?'Trust milestone':release==='R3'?'Marketplace milestone':release==='R4'?'Regulated / gated':'Growth'}</small></div>)}</div>
}

const benchmarkSources = [
  {name:'Divar',group:'Marketplace',signal:'پوشش آگهی‌های عمومی ایران',learn:'متراژ، سن بنا، اتاق، طبقه، پارکینگ/انباری/آسانسور، قیمت/رهن/اجاره و توضیحات آزاد؛ باید از Listing جدا بماند.'},
  {name:'Sheypoor',group:'Marketplace',signal:'آگهی ملک و زمین',learn:'ابعاد زمین، عرض بر/گذر، سند، امکانات مسکونی و وضعیت سکونت در داده‌های آگهی مهم‌اند.'},
  {name:'Kilid',group:'Property Search',signal:'جست‌وجوی تخصصی ملک',learn:'فیلتر منطقه/محله/متراژ/سن بنا، نقشه، تخمین قیمت، روند قیمت و draw-on-map ایده‌های مناسب لایه Marketplace/Analytics هستند.'},
  {name:'Otaghak',group:'Short Stay',signal:'مهمان + میزبان',learn:'نوع اقامتگاه، قیمت/امکانات/موقعیت/نظر، رزرو آنی، تقویم قیمت، تراکنش، کیف پول و مدیریت درخواست برای Host profile.'},
  {name:'Shab',group:'Short Stay',signal:'رزرو روزانه',learn:'ساحلی/استخردار/جنگلی/دربست/مناسب مراسم، متراژ، اتاق، دسترسی محلی، مدارک لازم، چت قبل پرداخت و تقویم پر/خالی.'},
  {name:'Jabama',group:'Short Stay',signal:'رزرو + امکانات',learn:'استخر/جکوزی/سرگرمی، آشپزخانه، اینترنت، پارکینگ، گرمایش/سرمایش، دسترس‌پذیری، حیوان خانگی، دورهمی، امتیاز و قیمت پویا.'},
  {name:'Jajiga',group:'Short Stay',signal:'نقشه + فیلتر اقامتگاه',learn:'جست‌وجو روی نقشه/اطراف من و فیلتر ظرفیت، نوع اقامتگاه، اجاره‌بها و اقلیم؛ کیف پول و تراکنش هم در لایه Hosting مفید است.'},
]

const fieldMatrix = [
  {type:'آپارتمان',core:'متراژ، اتاق، طبقه/کل طبقات، سال ساخت، جهت/نور، واحد در طبقه، آسانسور، بالکن، گرمایش/سرمایش',special:'پارکینگ و انباری به‌صورت Space، تعداد واحد، لابی/نگهبانی، بازسازی، پنجره/کف/کابینت',market:'فروش/رهن/اجاره، قیمت کل/متری، ودیعه/اجاره، تخلیه، زمان بازدید'},
  {type:'ویلا / خانه',core:'زمین، زیربنا، طبقات، خواب/مستر، سرویس، حیاط/باغ، پارکینگ، انشعابات، سازه',special:'استخر، جکوزی، تراس/روف، آلاچیق، BBQ، حریم خصوصی، مسیر دسترسی، پایان‌کار',market:'فروش/اجاره بلندمدت؛ Short‑Stay به‌صورت Offering جدا: ظرفیت، تخت، ورود/خروج، تقویم، قوانین، رزرو آنی'},
  {type:'تجاری',core:'متراژ، کاربری، طبقه، عرض بر/ویترین، دهنه، ارتفاع سقف، انبار، سرویس، برق',special:'مالکیت/سرقفلی/حق کسب، امکان تابلو، بارگیری، پارکینگ، دسترسی خیابانی',market:'فروش/اجاره/حق؛ ودیعه و اجاره، قیمت مالکیت، کاربری پیشنهادی به‌عنوان Claim'},
  {type:'اداری',core:'متراژ، اتاق، طبقه، کاربری، آسانسور، پارکینگ، انباری، آبدارخانه، HVAC',special:'اتاق جلسه، لابی/پذیرش، شبکه/فیبر، امنیت، ساعات دسترسی، پارکینگ مراجع',market:'فروش/اجاره، موقعیت اداری، قیمت/اجاره، suitability به‌عنوان Claim'},
  {type:'زمین',core:'مساحت، ابعاد، بر، جهت، تعداد بر، عرض گذر، شکل/شیب، کاربری ثبت‌شده، دسترسی',special:'آب/برق/گاز، دیوارکشی، مختصات، داخل/خارج محدوده، سند و سهم دانگ',market:'قیمت کل/متری؛ تراکم، سطح اشغال، عقب‌نشینی و ساخت‌پذیری فقط با Evidence/استعلام'},
  {type:'کلنگی',core:'مساحت زمین، بنای فعلی، سن/وضعیت سازه، طبقات/واحد، بر، گذر، تعداد بر، سکونت',special:'انشعابات، پایان‌کار قدیم، دسترسی تخریب، سند/سهم، وضعیت تخلیه',market:'فروش کلنگی، قیمت زمین/متر، مشارکت در ساخت = Offering؛ پتانسیل ساخت = Claim'},
]

const layerModel = [
  ['Property Record','واقعیت نسبتاً پایدار','ابعاد، سازه، فضاها، انشعابات، موقعیت، مدارک'],
  ['Relationship','چه کسی چه نقشی دارد؟','Owner / Tenant / Manager + Scope + Time + Share'],
  ['Listing Projection','چطور عرضه شده؟','فروش/اجاره، قیمت، عنوان، عکس منتخب، شرایط بازدید'],
  ['Short‑Stay Offering','چطور میزبانی می‌شود؟','تقویم، قیمت شب، ظرفیت، قوانین، رزرو آنی، امتیاز'],
  ['Claim + Evidence','چه چیزی هنوز نیاز به اثبات دارد؟','تراکم، عقب‌نشینی، ساخت‌پذیری، مجوز، verification'],
]

export function ProjectBenchmarkPage() {
  return <HubPage active="benchmark">
    <section className="hub-subhero">
      <span>IRAN MARKET BENCHMARK · 2026-09-22</span>
      <h1>از بازار ایده می‌گیریم، ولی Property OS را Listing-first نمی‌کنیم</h1>
      <p>این صفحه پوشش فیلد و الگوهای محصول را از بازارهای عمومی ملک و سرویس‌های اقامت کوتاه‌مدت جمع می‌کند. هدف کپی UI نیست؛ هدف این است که قبل از مدل دیتابیس، چیزی مهم از قلم نیفتد.</p>
    </section>

    <section className="benchmark-principle">
      <ShieldCheck size={20}/><div><strong>اصل طراحی Domain</strong><span>Property Record هسته است. Listing، Short‑Stay و Marketplace فقط projection / operation روی همان دارایی‌اند.</span></div>
    </section>

    <SectionHead eyebrow="01 · SOURCES" title="چه چیزهایی از هر سرویس ارزش یادگیری دارد؟" desc="مشاهده‌ها به عنوان research signal ثبت می‌شوند؛ نه الزام محصول و نه کپی مستقیم."/>
    <section className="benchmark-source-grid">
      {benchmarkSources.map(source=><article key={source.name}><header><strong>{source.name}</strong><span>{source.group}</span></header><b>{source.signal}</b><p>{source.learn}</p></article>)}
    </section>

    <SectionHead eyebrow="02 · DATA LAYERS" title="فیلدها را در یک جدول غول‌پیکر نریزیم" desc="بزرگ‌ترین نتیجه benchmark همین separation است؛ داده فیزیکی ملک با داده آگهی و رزرو یک چیز نیست."/>
    <section className="layer-model">
      {layerModel.map(([name,why,examples],i)=><article key={name}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{name}</strong><b>{why}</b><p>{examples}</p></div></article>)}
    </section>

    <SectionHead eyebrow="03 · PROPERTY FIELD MATRIX" title="پوشش پیشنهادی برای انواع ملک و اراضی" desc="این ماتریس ورودی مستقیم طراحی فرم، OpenAPI و مدل دیتابیس production خواهد بود."/>
    <section className="field-matrix">
      <div className="field-matrix-row header"><span>نوع</span><span>Core Property</span><span>ویژگی تخصصی</span><span>Projection / Offering</span></div>
      {fieldMatrix.map(row=><div className="field-matrix-row" key={row.type}><strong>{row.type}</strong><p>{row.core}</p><p>{row.special}</p><p>{row.market}</p></div>)}
    </section>

    <SectionHead eyebrow="04 · VILLA / SHORT-STAY" title="ویلا دو شخصیت دارد: Property و Hospitality" desc="اتاقک، شب، جاباما و جاجیگا نشان می‌دهند ظرفیت و قوانین رزرو مهم‌اند؛ اما نباید Property Record را آلوده کنند."/>
    <section className="hospitality-model">
      <article><Landmark size={20}/><strong>Villa Property</strong><p>زمین، زیربنا، طبقات، اتاق، حیاط، استخر، انشعابات، پارکینگ، سند، پایان‌کار و مالکیت.</p></article>
      <article><CalendarDays size={20}/><strong>Short‑Stay Offering</strong><p>ظرفیت استاندارد/حداکثر، تخت و تشک، ورود/خروج، حداقل اقامت، قیمت روزانه، تقویم، رزرو آنی و قوانین.</p></article>
      <article><Sparkles size={20}/><strong>Experience & Amenities</strong><p>استخر آبگرم/روباز، جکوزی، BBQ، آلاچیق، سرگرمی، اینترنت، نزدیکی به ساحل/جنگل و دسترس‌پذیری.</p></article>
      <article><ShieldCheck size={20}/><strong>Trust</strong><p>تصاویر واقعی، نظافت، هویت میزبان، مدارک، امتیاز مهمان، claims و evidence تاریخ‌دار.</p></article>
    </section>

    <SectionHead eyebrow="05 · IDEAS BACKLOG" title="ایده‌هایی که ارزش نگه‌داشتن دارند" desc="این‌ها به ترتیب فاز وارد scope می‌شوند؛ قرار نیست R1 را سنگین کنند."/>
    <section className="benchmark-ideas">
      <article><span>R3/R5</span><strong>Map draw + heatmap</strong><p>الهام از Kilid برای جست‌وجوی محدوده و درک بازار؛ مناسب Marketplace/Analytics.</p></article>
      <article><span>R3</span><strong>Comparable listings</strong><p>مقایسه Property با Listingهای مشابه بدون تبدیل estimate به fact رسمی.</p></article>
      <article><span>R5</span><strong>Owner intelligence</strong><p>روند ارزش، occupancy، درآمد و هزینه در سطح Portfolio.</p></article>
      <article><span>R5</span><strong>Host calendar</strong><p>قیمت روزانه، پر/خالی، رزرو آنی و تراکنش برای ویلا/اقامت کوتاه‌مدت.</p></article>
      <article><span>R2/R3</span><strong>Evidence-first badges</strong><p>«سندی»، «بازرسی‌شده»، «Host claim» و «Official» به‌جای یک تیک سبز مبهم.</p></article>
      <article><span>R1</span><strong>Context-aware forms</strong><p>نوع ملک و Role کاربر تعیین کند کدام فیلدها و عملیات واقعاً لازم‌اند.</p></article>
    </section>
  </HubPage>
}

export function ProjectRoadmapPage() {
  return <HubPage active="roadmap">
    <section className="hub-subhero"><span>RELEASE ROADMAP</span><h1>از Prototype تا Launch، با ترتیب قابل‌اجرا</h1><p>شماره‌ها Build Priority هستند؛ اگر screen جدیدی اضافه شود شماره‌های قبلی تغییر نمی‌کنند و آیتم جدید در release مناسب slot می‌گیرد.</p></section>
    <section className="roadmap-overview">
      {phaseSummary.map(p => <article key={p.release} className={p.tone}><span>{p.release}</span><strong>{p.title}</strong><b>{p.range}</b><p>{p.desc}</p></article>)}
    </section>

    <SectionHead eyebrow="R1 · PRIORITY 01–20" title="Private Beta — چیزی که باید واقعاً قابل استفاده باشد" desc="هدف: یک مالک بتواند ملک، فضا، اجاره و عملیات پایه را مدیریت کند و Admin حداقل کنترل لازم را داشته باشد."/>
    <RoadmapList start={1} items={r1} release="R1"/>

    <SectionHead eyebrow="R2 · PRIORITY 21–30" title="Trust Layer" desc="هدف: داده فقط ثبت‌شده نباشد؛ منشأ، evidence و verification قابل توضیح باشد."/>
    <RoadmapList start={21} items={r2} release="R2"/>

    <SectionHead eyebrow="R3 · PRIORITY 31–40" title="Marketplace" desc="Property Record به Listing قابل معامله تبدیل می‌شود؛ بدون اینکه مدل core قربانی marketplace شود."/>
    <RoadmapList start={31} items={r3} release="R3"/>

    <SectionHead eyebrow="R4 · PRIORITY 41–50" title="Transaction Rail" desc="UX و backend قابل توسعه‌اند، اما integrationهای regulated تا زمان approval پشت Capability Gate می‌مانند."/>
    <RoadmapList start={41} items={r4} release="R4"/>

    <SectionHead eyebrow="R5 · PRIORITY 51+" title="Growth & Experience" desc="پس از اثبات core loop؛ نه قبل از آن."/>
    <RoadmapList start={51} items={r5} release="R5"/>

    <section className="roadmap-rule"><CircleDot size={18}/><div><strong>Definition of Done برای هر شماره</strong><span>Scenario + approved UI + API contract + frontend states + backend + DB migration + focused tests + integration + CI + PR + evidence.</span></div></section>
  </HubPage>
}

const operations = [
  {group:'Infrastructure',icon:Cloud,items:[
    ['Vercel Project + Git integration','main → production / PR → preview','now'],
    ['Liara account / environment','API + PostgreSQL + object storage candidate','next'],
    ['Domain + project email','ownership under project identity, not a founder account','next'],
    ['Production secrets','Dev / Staging / Prod separation','before-beta'],
  ]},
  {group:'Messaging & Support',icon:MessageSquareText,items:[
    ['SMS provider panel','provider selection + OTP/service templates + delivery logs','next'],
    ['Support channel','ticket ownership, response SLA, escalation','before-beta'],
    ['Transactional email','domain verification + system templates','before-beta'],
    ['Notification policy','critical vs marketing consent and channel rules','before-beta'],
  ]},
  {group:'Payment / Finance',icon:WalletCards,items:[
    ['Payment provider discovery','compare PSP / gateway requirements and API capability','discovery'],
    ['Tax / accounting readiness','validate current requirements with accountant / provider before activation','discovery'],
    ['Reconciliation design','payment intent ↔ provider event ↔ ledger','before-r4'],
    ['Refund / dispute playbook','ownership + audit trail + support path','before-r4'],
  ]},
  {group:'Legal / Regulatory',icon:Landmark,items:[
    ['Company / IP / founder agreement','equity, vesting, IP, exit, expense authority','discovery'],
    ['Notary / official-document workflow','map where a notary or official process is actually required','discovery'],
    ['Privacy + Terms','draft before real user data is collected at scale','before-beta'],
    ['Official integrations','regulatory discovery before enabling transaction capabilities','before-r4'],
  ]},
  {group:'Reliability & Security',icon:ShieldCheck,items:[
    ['2FA + org access','both founders have appropriate admin/recovery access','now'],
    ['Backups + restore drill','database + object storage recovery path','before-beta'],
    ['Observability','Sentry/error tracking + logs + uptime + alert ownership','before-beta'],
    ['Security review','auth, permission, PII, audit and abuse cases','before-beta'],
  ]},
  {group:'Go-to-Market',icon:Rocket,items:[
    ['Customer discovery','owners / managers / renters / inspectors','now'],
    ['Brand / landing content','value proposition + waitlist + launch narrative','parallel'],
    ['Demo dataset','credible properties/buildings without exposing real PII','before-demo'],
    ['Launch feedback loop','interview → evidence → backlog → release decision','before-beta'],
  ]},
]

function OpsState({state}:{state:string}) {
  const map:Record<string,[string,string]> = {
    now:['NOW','now'], next:['NEXT','next'], 'before-beta':['BEFORE BETA','beta'],
    discovery:['DISCOVERY','discovery'], 'before-r4':['BEFORE R4','r4'], parallel:['PARALLEL','parallel'], 'before-demo':['BEFORE DEMO','demo']
  }
  const [label,cls]=map[state]??[state,state]
  return <span className={'ops-state '+cls}>{label}</span>
}

export function ProjectOperationsPage() {
  return <HubPage active="operations">
    <section className="hub-subhero"><span>EXTERNAL READINESS</span><h1>کدنویسی تنها مسیر لانچ نیست</h1><p>فعالیت‌های زیر کنار development حرکت می‌کنند. موارد حقوقی، مالیاتی، درگاه و فرایندهای رسمی «چک‌لیست discovery» هستند و قبل از activation باید با مرجع حرفه‌ای یا provider همان زمان تأیید شوند.</p></section>
    <div className="ops-alert"><ShieldCheck size={18}/><div><strong>قاعده مهم</strong><span>هیچ Requirement قانونی یا مالیاتی را از روی حدس وارد Production نمی‌کنیم. این Hub مالک کار و زمان بررسی را مشخص می‌کند، نه مشاوره حقوقی/مالی.</span></div></div>
    <section className="ops-grid">
      {operations.map(group => <article className="ops-group" key={group.group}><header><div className="ops-icon"><group.icon size={19}/></div><strong>{group.group}</strong></header><div>{group.items.map(([title,desc,state])=><div className="ops-item" key={title}><div><strong>{title}</strong><span>{desc}</span></div><OpsState state={state}/></div>)}</div></article>)}
    </section>

    <SectionHead eyebrow="DEPLOYMENT MODEL" title="این Hub چطور همیشه به‌روز می‌ماند؟" desc="هدف این است که هر چیزی که روی main مرج شد، همان نسخه مرجع تیم باشد."/>
    <section className="deploy-diagram">
      <article><GitBranch size={20}/><span>feature branch</span><strong>PR</strong><small>preview deployment</small></article>
      <i>→</i><article><PackageCheck size={20}/><span>CI + Review</span><strong>Green</strong><small>tested artifact</small></article>
      <i>→</i><article><Code2 size={20}/><span>GitHub</span><strong>main</strong><small>source of production</small></article>
      <i>→</i><article><Globe2 size={20}/><span>Vercel</span><strong>Production</strong><small>auto deploy</small></article>
    </section>

    <section className="ops-bottom">
      <div><Activity size={20}/><div><strong>Release gate کوتاه</strong><span>CI green · security-sensitive reviewed · migrations verified · observability · rollback/recovery · feature gates for risky capabilities.</span></div></div>
      <button onClick={() => siteGo('/roadmap')}>برگشت به Roadmap</button>
    </section>
  </HubPage>
}
