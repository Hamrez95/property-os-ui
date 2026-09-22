import { useMemo, useState } from 'react'
import {
  AlertTriangle, CheckCircle2, ChevronLeft, Database, FileCheck2, Filter,
  GitBranch, KeyRound, Search, ShieldCheck, SlidersHorizontal, Users
} from 'lucide-react'
import { ProjectSiteHeader } from './ProjectHub'
import { DICTIONARY_DOMAINS, DICTIONARY_RESOURCES, MODELING_DICTIONARY } from './modelingDictionary'

function go(path:string){ window.location.hash=path }

const decisions = [
  {id:'D01',title:'Production repository topology',status:'working',owner:'Shared',when:'قبل از ساخت repo',risk:'Medium',recommendation:'Monorepo: apps / services / contracts / infra',why:'همگام‌سازی Contract، CI و migration ساده‌تر می‌شود.'},
  {id:'D02',title:'ID strategy',status:'open',owner:'Shared',when:'قبل از migration #1',risk:'Medium',recommendation:'Server-generated UUID؛ UUIDv7 اگر toolchain تمیز پشتیبانی کند',why:'شناسه داخلی sequential را public نکنیم.'},
  {id:'D03',title:'Scoped resource FK strategy',status:'open',owner:'Shared',when:'قبل از migration #1',risk:'High',recommendation:'حقوق/Roleها با relationهای typed و FK قوی؛ generic refs فقط جایی که ریسک پایین است',why:'Role، Claim و Document به چند نوع resource وصل می‌شوند و integrity مهم است.'},
  {id:'D04',title:'PostgreSQL schemas',status:'working',owner:'Masoud + Shared',when:'قبل از migration #1',risk:'Low',recommendation:'core / trust / ops / market / hospitality / platform',why:'مرز ماژول‌ها در DB هم قابل مشاهده می‌ماند.'},
  {id:'D05',title:'PostGIS',status:'open',owner:'Masoud + Shared',when:'قبل از Geo schema',risk:'Medium',recommendation:'اگر polygon/spatial search در R1/R2 وارد می‌شود از اول فعال شود',why:'Parcel geometry و جست‌وجوی مکانی بعداً migration پرهزینه ایجاد نکند.'},
  {id:'D06',title:'Money canonical unit',status:'open',owner:'Shared',when:'قبل از Finance/Payment',risk:'High',recommendation:'integer amount + currency؛ adapterهای ایران واحد provider را normalize کنند؛ UI می‌تواند تومان نشان دهد',why:'ریال/تومان و provider contract نباید در یک عدد مبهم مخلوط شوند.'},
  {id:'D07',title:'PII boundary',status:'open',owner:'Shared / Security',when:'قبل از Auth production',risk:'High',recommendation:'ADR امنیتی برای phone/national id/encryption و جداسازی identity data',why:'Party domain با اطلاعات حساس هویتی یکی نیست.'},
  {id:'D08',title:'Deletion & retention',status:'open',owner:'Shared / Security',when:'قبل از Beta data',risk:'High',recommendation:'resource-specific retention؛ business/audit/legal rows hard-delete معمولی نداشته باشند',why:'Account deletion با حذف تاریخچه قرارداد/مالکیت یکسان نیست.'},
  {id:'D09',title:'Ownership overlap rules',status:'open',owner:'Shared',when:'قبل از Ownership migration',risk:'High',recommendation:'shareهای ناقص/اختلافی قابل نمایش باشند؛ validation تاریخ‌دار و evidence-aware',why:'داده واردشده ممکن است کامل یا بدون اختلاف نباشد.'},
  {id:'D10',title:'Official integration boundary',status:'open',owner:'Shared',when:'قبل از R4 adapter',risk:'High',recommendation:'Adapter contract: auth + idempotency + status + reconciliation + evidence + human fallback',why:'Internal state نباید به اشتباه Official نامیده شود.'},
  {id:'D11',title:'Claim payload schemas',status:'later',owner:'Masoud + Product',when:'قبل از R2 Trust',risk:'Medium',recommendation:'Versioned schema registry per claim type',why:'JSONB فقط وقتی کنترل‌شده و versioned باشد.'},
  {id:'D12',title:'Financial ledger',status:'later',owner:'Shared',when:'قبل از Finance hardening',risk:'High',recommendation:'Append-oriented ledger برای payment/adjustment/waiver/reconciliation',why:'balance mutable منبع حقیقت خوبی نیست.'},
  {id:'D13',title:'Listing search model',status:'later',owner:'Masoud + Product',when:'قبل از R3 scale',risk:'Medium',recommendation:'Canonical PostgreSQL + read/search model در صورت نیاز',why:'Search index نباید canonical source شود.'},
  {id:'D14',title:'Notification consent model',status:'later',owner:'Product + Shared',when:'قبل از real messaging',risk:'Medium',recommendation:'Operational mandatory vs marketing consent جدا',why:'پیام عملیاتی ساختمان با تبلیغات یک permission نیست.'},
  {id:'D15',title:'Short-stay settlement',status:'later',owner:'Shared',when:'قبل از Hospitality payments',risk:'High',recommendation:'Payout/refund/dispute model فقط وقتی hospitality وارد scope شد',why:'نباید R1 را با settlement بلااستفاده سنگین کنیم.'},
] as const

const checklist = [
  {group:'Domain',items:[
    ['Property / Parcel / Structure / Space boundaries','ready'],
    ['Parking / Storage as Space','ready'],
    ['Property subtype profiles','ready'],
    ['Agricultural / Industrial coverage','ready'],
    ['Role = Party + Scope + Time','ready'],
    ['Ownership exact share representation','review'],
  ]},
  {group:'Data & Security',items:[
    ['Visibility classes','review'],
    ['PII boundary','review'],
    ['Money canonical unit','review'],
    ['ID strategy','review'],
    ['Deletion / retention rules','review'],
    ['Audit event contract','ready'],
  ]},
  {group:'Operations',items:[
    ['Lease + Bundle scope','ready'],
    ['Building Governance / ChargeScheme','ready'],
    ['Claim / Evidence / Verification','ready'],
    ['Listing projection boundary','ready'],
    ['Short-Stay overlay boundary','ready'],
    ['Official integration adapter','review'],
  ]},
  {group:'Later phase',items:[
    ['Claim payload registry','later'],
    ['Ledger details','later'],
    ['Search index strategy','later'],
    ['Short-stay settlement','later'],
  ]},
] as const

export function ModelingDictionaryPage() {
  const [query,setQuery]=useState('')
  const [domain,setDomain]=useState('all')
  const [resource,setResource]=useState('all')
  const [visibility,setVisibility]=useState('all')

  const visible = useMemo(()=>MODELING_DICTIONARY.filter(row=>{
    const q=query.trim().toLowerCase()
    const matchesQuery=!q || [row.domain,row.resource,row.field,row.type,row.visibility,row.provenance,row.verification,row.notes].join(' ').toLowerCase().includes(q)
    return matchesQuery && (domain==='all'||row.domain===domain) && (resource==='all'||row.resource===resource) && (visibility==='all'||row.visibility===visibility)
  }),[query,domain,resource,visibility])

  const visibilities=useMemo(()=>Array.from(new Set(MODELING_DICTIONARY.map(r=>r.visibility))).sort(),[])
  return <div className="hub-page review-center" dir="rtl">
    <ProjectSiteHeader active="modeling"/>
    <main className="hub-main">
      <section className="hub-subhero">
        <span>LIVE DATA DICTIONARY · {MODELING_DICTIONARY.length} FIELDS</span>
        <h1>فیلدها را قبل از ERD مثل API Contract مرور کنید</h1>
        <p>این صفحه مستقیم از snapshot مدلینگ ساخته شده و برای review مشترک Product / Backend طراحی شده است: نوع، requiredness، visibility، provenance، verification و mutability کنار هم دیده می‌شوند.</p>
      </section>

      <div className="review-jumpbar">
        <button onClick={()=>go('/modeling')}><ChevronLeft size={15}/>Blueprint</button>
        <button onClick={()=>go('/modeling/decisions')}><AlertTriangle size={15}/>Open Decisions</button>
        <span>{visible.length} / {MODELING_DICTIONARY.length} field</span>
      </div>

      <section className="dictionary-controls">
        <label className="dictionary-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Resource، field، type، provenance..."/></label>
        <label><span>Domain</span><select value={domain} onChange={e=>setDomain(e.target.value)}><option value="all">همه</option>{DICTIONARY_DOMAINS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
        <label><span>Resource</span><select value={resource} onChange={e=>setResource(e.target.value)}><option value="all">همه</option>{DICTIONARY_RESOURCES.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
        <label><span>Visibility</span><select value={visibility} onChange={e=>setVisibility(e.target.value)}><option value="all">همه</option>{visibilities.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
        <button className="filter-reset" onClick={()=>{setQuery('');setDomain('all');setResource('all');setVisibility('all')}}><Filter size={15}/>پاک کردن فیلتر</button>
      </section>

      <section className="dictionary-summary">
        <article><Database/><div><strong>{MODELING_DICTIONARY.length}</strong><span>Field registry</span></div></article>
        <article><SlidersHorizontal/><div><strong>{DICTIONARY_RESOURCES.length}</strong><span>Resources</span></div></article>
        <article><GitBranch/><div><strong>{DICTIONARY_DOMAINS.length}</strong><span>Domains</span></div></article>
        <article><ShieldCheck/><div><strong>{MODELING_DICTIONARY.filter(x=>x.visibility.includes('sensitive')).length}</strong><span>Sensitive-scoped</span></div></article>
      </section>

      <div className="live-dictionary">
        <div className="live-dictionary-row head"><span>Domain / Resource</span><span>Field</span><span>Type</span><span>Req</span><span>Visibility</span><span>Provenance</span><span>Verification</span><span>Mutability</span><span>Notes</span></div>
        {visible.map((row,i)=><div className="live-dictionary-row" key={row.domain+row.resource+row.field+i}>
          <div><small>{row.domain}</small><strong>{row.resource}</strong></div>
          <code>{row.field}</code>
          <span>{row.type}</span>
          <b className={'req '+row.required.toLowerCase()}>{row.required}</b>
          <span>{row.visibility}</span>
          <span>{row.provenance}</span>
          <span>{row.verification}</span>
          <span>{row.mutability}</span>
          <p>{row.notes||'—'}</p>
        </div>)}
        {visible.length===0&&<div className="dictionary-empty">هیچ فیلدی با این فیلتر پیدا نشد.</div>}
      </div>
    </main>
  </div>
}

export function ModelingDecisionsPage() {
  const [filter,setFilter]=useState<'all'|'open'|'working'|'later'>('all')
  const shown=decisions.filter(x=>filter==='all'||x.status===filter)
  const open=decisions.filter(x=>x.status==='open').length
  return <div className="hub-page review-center" dir="rtl">
    <ProjectSiteHeader active="modeling"/>
    <main className="hub-main">
      <section className="hub-subhero decision-hero">
        <span>FOUNDER REVIEW · MODEL FREEZE</span>
        <h1>چیزهایی که هنوز نباید بی‌صدا تبدیل به Migration شوند</h1>
        <p>این‌ها bug یا نقص تحقیق نیستند؛ تصمیم‌های معماری واقعی‌اند. پیشنهاد فعلی ثبت شده، اما موارد OPEN باید قبل از نقطه‌ی مشخص‌شده توسط تو و مسعود review شوند.</p>
      </section>

      <section className="decision-status-strip">
        <article><strong>{decisions.length}</strong><span>کل تصمیم‌ها</span></article>
        <article className="danger"><strong>{open}</strong><span>نیازمند review</span></article>
        <article className="working"><strong>{decisions.filter(x=>x.status==='working').length}</strong><span>Working direction</span></article>
        <article className="later"><strong>{decisions.filter(x=>x.status==='later').length}</strong><span>Later phase</span></article>
      </section>

      <div className="decision-toolbar">
        <div className="decision-filters">{(['all','open','working','later'] as const).map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x==='all'?'همه':x.toUpperCase()}</button>)}</div>
        <button onClick={()=>go('/modeling/dictionary')}><Database size={15}/>Data Dictionary</button>
      </div>

      <section className="decision-grid">
        {shown.map(item=><article className={'decision-card '+item.status} key={item.id}>
          <header><span>{item.id}</span><div className={'decision-state '+item.status}>{item.status.toUpperCase()}</div></header>
          <h3>{item.title}</h3>
          <div className="decision-meta"><span><Users size={13}/>{item.owner}</span><span><FileCheck2 size={13}/>{item.when}</span><span><ShieldCheck size={13}/>{item.risk} risk</span></div>
          <div className="decision-copy"><span>پیشنهاد فعلی</span><strong>{item.recommendation}</strong></div>
          <p>{item.why}</p>
        </article>)}
      </section>

      <div className="hub-section-head"><span>FREEZE CHECKLIST</span><h2>برای شروع Production Schema چه چیزهایی واقعاً آماده‌اند؟</h2><p>READY یعنی research/model shape آماده review است؛ REVIEW یعنی دو امضای founder لازم دارد؛ LATER عمداً به فاز بعد موکول شده.</p></div>
      <section className="freeze-checklist">
        {checklist.map(group=><article key={group.group}><header><strong>{group.group}</strong></header>{group.items.map(([name,state])=><div key={name}><span className={'check-state '+state}>{state==='ready'?<CheckCircle2/>:state==='review'?<AlertTriangle/>:<KeyRound/>}</span><b>{name}</b><small>{state.toUpperCase()}</small></div>)}</article>)}
      </section>

      <section className="founder-review-callout">
        <ShieldCheck size={21}/><div><strong>بعد از review تو و مسعود</strong><span>هر P0 پذیرفته‌شده → ADR در Notion → Issue در GitHub → schema/OpenAPI → migration + test evidence.</span></div>
      </section>
    </main>
  </div>
}
