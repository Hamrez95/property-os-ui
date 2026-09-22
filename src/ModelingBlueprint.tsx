import type { CSSProperties } from 'react'
import {
  BadgeCheck, Blocks, Building2, CalendarRange, CircleDollarSign, Database, FileCheck2,
  FileText, Fingerprint, GitBranch, Home, KeyRound, Landmark, Layers3, Link2, MapPinned,
  Network, Package, ShieldCheck, Store, Users, WalletCards, Wrench
} from 'lucide-react'
import { ProjectSiteHeader } from './ProjectHub'

const clusters = [
  {
    title:'Core Property',
    icon:Home,
    tone:'blue',
    entities:['PropertyRecord','Parcel','Structure','Space','Asset','Address','Geo','RegistryIdentity']
  },
  {
    title:'People & Rights',
    icon:Users,
    tone:'green',
    entities:['Party','RoleAssignment','PropertyRight','OwnershipInterest','Bundle']
  },
  {
    title:'Trust',
    icon:ShieldCheck,
    tone:'purple',
    entities:['Claim','Evidence','Verification','Document','Media','Inspection']
  },
  {
    title:'Operations',
    icon:Wrench,
    tone:'amber',
    entities:['Lease','BuildingManagement','Charge','Expense','Maintenance','Announcement']
  },
  {
    title:'Market',
    icon:Store,
    tone:'navy',
    entities:['Listing','Visit','Offer','Negotiation','Deal']
  },
  {
    title:'Hospitality',
    icon:CalendarRange,
    tone:'teal',
    entities:['StayOffering','AvailabilityDay','RateRule','Reservation','HouseRule']
  },
]

const invariants = [
  ['Property Record ≠ Listing','ملک منبع حقیقت است؛ آگهی فقط projection زمان‌دار است.'],
  ['Account ≠ One Role','نقش از Relationship روی Scope مشخص و بازه زمانی می‌آید.'],
  ['Parking / Storage = Space','فضای مستقل با وضعیت حقوقی و lifecycle خودش؛ نه checkbox.'],
  ['Claim ≠ Fact','تراکم، عقب‌نشینی، ساخت‌پذیری و ادعاهای مشابه بدون evidence واقعیت قطعی نیستند.'],
  ['Official ≠ Internal','فقط پاسخ/مدرک مرجع معتبر می‌تواند وضعیت Official بدهد.'],
  ['Money ≠ Float','مبالغ بدون واحد و float در schema ممنوع.'],
]

const dictionary = [
  {resource:'PropertyRecord',field:'property_subtype',type:'enum',req:'R',visibility:'Auth',source:'User / Official',note:'apartment · villa · shop · office · land · teardown'},
  {resource:'Parcel',field:'area_m2',type:'numeric(12,2)',req:'C',visibility:'Scoped',source:'Official / Evidence',note:'منبع اندازه‌گیری نگهداری شود'},
  {resource:'Space',field:'legal_relation',type:'enum',req:'O',visibility:'Owner',source:'Document / Official',note:'deeded · dependent · usage_right · common'},
  {resource:'OwnershipInterest',field:'share_numerator / denominator',type:'bigint',req:'R',visibility:'Owner',source:'Document / Official',note:'۲.۵/۶ را به float تبدیل نکن'},
  {resource:'RoleAssignment',field:'scope_type / scope_id',type:'ref',req:'R',visibility:'Scoped',source:'Platform',note:'Property / Space / Building / Bundle'},
  {resource:'RegistryIdentity',field:'main/sub parcel no.',type:'text',req:'O',visibility:'Sensitive',source:'Official',note:'شناسه‌های ثبتی از UI عمومی جدا'},
  {resource:'Claim',field:'value_json_typed',type:'jsonb',req:'R',visibility:'Scoped',source:'Any',note:'فقط schema-versioned claim payload'},
  {resource:'Lease',field:'deposit / recurring rent',type:'Money',req:'C',visibility:'Parties',source:'Contract',note:'amount + currency؛ نه price number'},
  {resource:'Listing',field:'public_location_precision',type:'enum',req:'R',visibility:'Public',source:'Platform',note:'exact / approximate / neighborhood'},
  {resource:'StayOffering',field:'standard/max capacity',type:'smallint',req:'C',visibility:'Public',source:'Host',note:'روی Villa core ذخیره نشود'},
  {resource:'AvailabilityDay',field:'local_date / state',type:'date+enum',req:'R',visibility:'Host',source:'Platform',note:'تقویم با تاریخ محلی'},
  {resource:'AuditEvent',field:'actor/action/resource',type:'refs+enum',req:'R',visibility:'Admin',source:'Platform',note:'append-oriented history'},
]

const propertyTypes = [
  {title:'Apartment',icon:Building2,fields:'unit/floor · rooms · baths · year · balcony · heating/cooling · daylight',separate:'Parking / Storage → Space'},
  {title:'Villa / House',icon:Home,fields:'land + built area · yard · pool · jacuzzi · access · permits',separate:'Nightly hosting → StayOffering'},
  {title:'Commercial',icon:Store,fields:'frontage · doors · ceiling · warehouse · 3-phase · business right',separate:'Sarqofli/right modeled explicitly'},
  {title:'Office',icon:Landmark,fields:'rooms · meeting · reception · HVAC · network · access hours',separate:'Business suitability → Claim'},
  {title:'Land',icon:MapPinned,fields:'dimensions · frontage · road width · corners · slope · land use · utilities',separate:'Density/buildability → Claim'},
  {title:'Agricultural / Garden',icon:Home,fields:'cultivated area · water rights · irrigation · greenhouse · access · utilities',separate:'Well permit / water right → Claim + Evidence'},
  {title:'Industrial / Warehouse',icon:Building2,fields:'hall · office · clear height · 3-phase power · truck access · loading',separate:'Activity permit / safety → Claim + Evidence'},
  {title:'Teardown',icon:Wrench,fields:'land · current build · age/condition · roads · utilities · old docs',separate:'Participation offer ≠ Property fact'},
]

const officialFlow = [
  ['Internal draft','Property OS stores intent + evidence','working'],
  ['External submission','Integration adapter / approved platform','gated'],
  ['Authority response','external id + status + timestamp','external'],
  ['Official verification','only after authoritative evidence','verified'],
]

const privacy = [
  ['Public','selected physical data · approximate location · listing terms'],
  ['Tenant / Occupant','physical specs · own lease · relevant building ops'],
  ['Manager','building/charge/maintenance scope only'],
  ['Owner','ownership · documents · valuation · financial details'],
  ['Sensitive Admin','registry ids · PII · verification/audit data'],
]

export function ProjectModelingPage() {
  return <div className="hub-page modeling-page" dir="rtl">
    <ProjectSiteHeader active="modeling"/>
    <main className="hub-main">
      <section className="hub-subhero modeling-hero">
        <span>DOMAIN MODELING BLUEPRINT · V1</span>
        <h1>از طراحی قابل‌کلیک تا Schema قابل‌اعتماد</h1>
        <p>این صفحه مرجع سریع تو و مسعود قبل از ERD، migration و OpenAPI است. جزئیات کامل در docs قرار دارد؛ اینجا مرز منابع، invariants، نوع داده و visibility را یک‌جا می‌بینید.</p>
        <div className="modeling-doc-links">
          <button onClick={()=>window.location.hash='/modeling/dictionary'}><Database size={15}/>Live Data Dictionary</button>
          <button onClick={()=>window.location.hash='/modeling/decisions'}><ShieldCheck size={15}/>Founder Review</button>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/DOMAIN_MODEL_V1.md" target="_blank" rel="noreferrer"><FileText size={15}/>Domain Model</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/DATA_DICTIONARY_V1.md" target="_blank" rel="noreferrer"><Database size={15}/>Data Dictionary</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/IR_OFFICIAL_MODELING_NOTES.md" target="_blank" rel="noreferrer"><BadgeCheck size={15}/>Iran Official Notes</a>
          <a href="https://github.com/Hamrez95/property-os-ui/blob/main/docs/SHORT_STAY_DOMAIN_V1.md" target="_blank" rel="noreferrer"><CalendarRange size={15}/>Short-Stay</a>
        </div>
      </section>

      <section className="modeling-lockbar">
        <div><ShieldCheck size={19}/><span><strong>قبل از production schema</strong> مرز Property / Parcel / Structure / Space، Ownership Share، Role Scope، Money و Visibility باید دو امضا شوند.</span></div>
        <span className="hub-status working"><b>WORKING</b><small>review founders</small></span>
      </section>

      <div className="hub-section-head"><span>01 · RESOURCE MAP</span><h2>مدل را بر اساس منابع واقعی بشکنیم، نه صفحات اپ</h2><p>صفحه UI ممکن است چند aggregate را کنار هم نشان دهد؛ database نباید همان layout را تقلید کند.</p></div>
      <section className="entity-cluster-grid">
        {clusters.map(group=><article className={'entity-cluster '+group.tone} key={group.title}>
          <header><div><group.icon size={18}/></div><strong>{group.title}</strong></header>
          <div className="entity-chip-list">{group.entities.map(entity=><span key={entity}>{entity}</span>)}</div>
        </article>)}
      </section>

      <div className="hub-section-head"><span>02 · AGGREGATE FLOW</span><h2>چطور به هم متصل می‌شوند؟</h2><p>این نمودار مسیر اصلی اطلاعات را نشان می‌دهد؛ relationship و trust روی همه جریان‌ها سوار می‌شوند.</p></div>
      <section className="aggregate-flow">
        <article><Package size={19}/><small>Identity</small><strong>PropertyRecord</strong><span>canonical root</span></article>
        <i>→</i>
        <article><Layers3 size={19}/><small>Physical</small><strong>Parcel · Structure · Space</strong><span>real-world hierarchy</span></article>
        <i>→</i>
        <article><Link2 size={19}/><small>People</small><strong>Relationship · Rights</strong><span>role + scope + time</span></article>
        <i>→</i>
        <article><Network size={19}/><small>Operations</small><strong>Lease / Listing / Stay</strong><span>separate overlays</span></article>
      </section>

      <div className="hub-section-head"><span>03 · INVARIANTS</span><h2>قوانینی که هیچ migration نباید بشکند</h2><p>این‌ها shortcutهای معماری را محدود می‌کنند تا بعداً با marketplace، trust یا transaction به بن‌بست نخوریم.</p></div>
      <section className="invariant-grid">
        {invariants.map(([title,desc],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{title}</strong><p>{desc}</p></div></article>)}
      </section>

      <div className="hub-section-head"><span>04 · PROPERTY SUBTYPES</span><h2>فیلد تخصصی دارد، ولی جدول غول‌پیکر نه</h2><p>Base Property مشترک است و هر subtype profile یک 1:1 تخصصی می‌گیرد. داده‌های Listing یا Hosting داخل subtype core ریخته نمی‌شوند.</p></div>
      <section className="model-property-grid">
        {propertyTypes.map(item=><article key={item.title}><item.icon size={19}/><strong>{item.title}</strong><p>{item.fields}</p><span>{item.separate}</span></article>)}
      </section>

      <div className="hub-section-head"><span>05 · DATA DICTIONARY EXCERPT</span><h2>هر فیلد باید Type، Visibility و Provenance داشته باشد</h2><p>نسخه کامل در DATA_DICTIONARY_V1 است. این excerpt قواعد مدلینگ را جلوی چشم نگه می‌دارد.</p></div>
      <section className="dictionary-table">
        <div className="dictionary-row header"><span>Resource</span><span>Field</span><span>Type</span><span>Req</span><span>Visibility</span><span>Source</span><span>Modeling note</span></div>
        {dictionary.map(row=><div className="dictionary-row" key={row.resource+row.field}><strong>{row.resource}</strong><code>{row.field}</code><span>{row.type}</span><b>{row.req}</b><span>{row.visibility}</span><span>{row.source}</span><p>{row.note}</p></div>)}
      </section>

      <div className="hub-section-head"><span>06 · OWNERSHIP & RELATIONSHIP</span><h2>مالکیت را از نقش کاربر جدا نگه داریم</h2><p>یک نفر می‌تواند مالک یک Property، مستأجر Space دیگر و مدیر یک Building باشد.</p></div>
      <section className="relationship-model">
        <article className="relation-node party"><Users/><strong>Party</strong><span>Person / Organization</span></article>
        <i>→</i>
        <article className="relation-node role"><KeyRound/><strong>RoleAssignment</strong><span>Role + Scope + Time</span></article>
        <i>→</i>
        <article className="relation-node scope"><Blocks/><strong>Scope</strong><span>Property / Space / Bundle / Building</span></article>
        <div className="ownership-branch"><GitBranch size={18}/><div><strong>OwnershipInterest</strong><span>exact numerator / denominator + source notation + evidence</span><code>5 / 12 → display 2.5 / 6 dang</code></div></div>
      </section>

      <div className="hub-section-head"><span>07 · IRAN OFFICIAL BOUNDARY</span><h2>مرجع رسمی را مدل می‌کنیم، جای آن نمی‌نشینیم</h2><p>شناسه‌های ثبتی، حقوق ارتفاق/انتفاع، وضعیت طلق/وقف، هندسه و ثبت قرارداد می‌توانند external reference داشته باشند.</p></div>
      <section className="official-flow">
        {officialFlow.map(([title,desc,state],i)=><article key={title} className={state}><span>{i+1}</span><div><strong>{title}</strong><p>{desc}</p></div></article>)}
      </section>

      <div className="hub-section-head"><span>08 · BUILDING OPERATIONS</span><h2>شارژ و تعمیرات هم داده مالی/عملیاتی واقعی‌اند</h2><p>فرمول شارژ را hardcode نکن؛ scheme زمان‌دار و basis snapshot لازم است.</p></div>
      <section className="ops-model-grid">
        <article><Building2/><strong>ManagementMandate</strong><span>مدیر · شروع/پایان · منبع انتخاب</span></article>
        <article><CircleDollarSign/><strong>ChargeScheme</strong><span>by_area · equal · mixed · approved custom</span></article>
        <article><WalletCards/><strong>ChargeAllocation</strong><span>liable party/scope · amount · basis snapshot</span></article>
        <article><Wrench/><strong>Maintenance</strong><span>Ticket → WorkOrder → Evidence → Expense</span></article>
      </section>

      <div className="hub-section-head"><span>09 · PRIVACY</span><h2>Hide در UI کافی نیست؛ authorization باید از مدل بیاید</h2><p>Visibility class بخشی از قرارداد داده است.</p></div>
      <section className="privacy-stack">
        {privacy.map(([name,desc],i)=><div key={name} style={{'--level':String(i)} as CSSProperties}><strong>{name}</strong><span>{desc}</span></div>)}
      </section>

      <section className="modeling-done-card">
        <Fingerprint size={22}/><div><strong>Definition of modeling-ready</strong><span>Entity boundary + field dictionary + source/provenance + visibility + temporal rules + state machine + external integration reference + invariants.</span></div>
      </section>
    </main>
  </div>
}
