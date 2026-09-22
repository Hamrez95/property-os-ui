import {
  AlertTriangle, BarChart3, Bell, Building2, CircleDollarSign,
  ClipboardCheck, FileCheck2, Headphones, Megaphone, MessageSquare,
  Search, ShieldCheck, UserCheck, WalletCards, Wrench
} from 'lucide-react'
import type { JSX } from 'react'
import { AdminShell, Status } from './ui'

function AdminHeader({title,subtitle,action}:{title:string,subtitle:string,action?:string}) {
  return <div className="admin-page-head"><div><h2>{title}</h2><p>{subtitle}</p></div>{action&&<button className="btn primary compact">{action}</button>}</div>
}

function Toolbar({placeholder='جستجو...',chips=[]}:{placeholder?:string,chips?:string[]}) {
  return <div className="table-toolbar"><div className="global-search"><Search size={15}/><span>{placeholder}</span></div>{chips.length>0&&<div className="filter-pills">{chips.map((c,i)=><span className={i===0?'active':''} key={c}>{c}</span>)}</div>}</div>
}

function DataTable({headers,rows}:{headers:string[],rows:(string|JSX.Element)[][]}) {
  const cols='repeat('+headers.length+',1fr)'
  return <div className="data-table generic-table">
    <div className="table-row header dynamic" style={{gridTemplateColumns:cols}}>{headers.map(h=><span key={h}>{h}</span>)}</div>
    {rows.map((r,i)=><div className="table-row dynamic" style={{gridTemplateColumns:cols}} key={i}>{r.map((c,j)=><span key={j}>{c}</span>)}</div>)}
  </div>
}

export function BuildingsAdmin() {
  const rows=[
    ['ساختمان نیاوران','۱۲ واحد','تهران','فعال'],
    ['برج آفتاب','۳۶ واحد','سعادت‌آباد','فعال'],
    ['ساختمان مهر','۸ واحد','پاسداران','نیازمند بررسی'],
    ['مجتمع سپید','۵۴ واحد','شهرک غرب','فعال']
  ]
  return <AdminShell section="ساختمان‌ها"><AdminHeader title="ساختمان‌ها" subtitle="ساختار، واحدها و وضعیت عملیاتی" action="افزودن ساختمان"/><Toolbar placeholder="جستجو در ساختمان‌ها..." chips={['همه','فعال','نیازمند بررسی']}/><DataTable headers={['نام','واحدها','موقعیت','وضعیت']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone={r[3]==='فعال'?'verified':'warning'}>{r[3]}</Status>])}/></AdminShell>
}

export function ListingsAdmin() {
  const rows=[
    ['آپارتمان فرمانیه','فروش','Verified','منتشرشده'],
    ['ویلای لواسان','فروش','Evidence','در انتظار'],
    ['پارکینگ ونک','اجاره','Self-reported','منتشرشده'],
    ['تجاری جردن','اجاره','Verified','متوقف']
  ]
  return <AdminShell section="املاک"><AdminHeader title="آگهی‌ها" subtitle="Listingها، Trust level و وضعیت انتشار" action="آگهی جدید"/><Toolbar placeholder="جستجو در آگهی‌ها..." chips={['همه','منتشرشده','در انتظار']}/><DataTable headers={['ملک','نوع','Trust','وضعیت']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone={r[3]==='منتشرشده'?'verified':r[3]==='در انتظار'?'warning':'neutral'}>{r[3]}</Status>])}/></AdminShell>
}

export function DealsAdmin() {
  const rows=[
    ['TX-1842','آپارتمان فرمانیه','فروش','قرارداد'],
    ['TX-1829','ویلای لواسان','فروش','پیشنهاد'],
    ['TX-1814','پارکینگ ونک','اجاره','پرداخت'],
    ['TX-1798','تجاری جردن','اجاره','تحویل']
  ]
  return <AdminShell section="قراردادها"><AdminHeader title="معاملات" subtitle="Offer تا Contract و Handover"/><Toolbar placeholder="شناسه معامله یا ملک..." chips={['همه','پیشنهاد','قرارداد','پرداخت']}/><DataTable headers={['شناسه','ملک','نوع','مرحله']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone="info">{r[3]}</Status>])}/></AdminShell>
}

export function TrustQueueAdmin() {
  const rows=[
    ['CLM-4821','متراژ رسمی','آپارتمان فرمانیه','مدرک جدید'],
    ['CLM-4817','پارکینگ P-21','آپارتمان نیاوران','مغایرت بازرس'],
    ['CLM-4792','بازسازی ۱۴۰۳','ویلای لواسان','نیازمند بررسی'],
    ['CLM-4788','هویت عرضه‌کننده','تجاری جردن','تکمیل']
  ]
  return <AdminShell section="بازرسی‌ها"><AdminHeader title="صف بررسی اعتماد" subtitle="Claim / Evidence / Verification review"/><Toolbar placeholder="شناسه Claim یا ملک..." chips={['همه','مدرک جدید','مغایرت','تکمیل']}/><DataTable headers={['شناسه','Claim','ملک','وضعیت']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone={r[3]==='تکمیل'?'verified':r[3].includes('مغایرت')?'danger':'warning'}>{r[3]}</Status>])}/></AdminShell>
}

export function InspectorsAdmin() {
  const rows=[
    ['مهدی کریمی','تهران شمال','4.92','فعال'],
    ['سعید نوری','تهران غرب','4.81','فعال'],
    ['نیلوفر احمدی','لواسان','4.76','بازبینی'],
    ['محمد فلاح','تهران مرکز','4.88','فعال']
  ]
  return <AdminShell section="بازرسی‌ها"><AdminHeader title="بازرسان" subtitle="کیفیت، منطقه کاری و وضعیت دسترسی" action="دعوت بازرس"/><Toolbar placeholder="جستجو در بازرسان..." chips={['همه','فعال','بازبینی']}/><DataTable headers={['نام','منطقه','امتیاز','وضعیت']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone={r[3]==='فعال'?'verified':'warning'}>{r[3]}</Status>])}/></AdminShell>
}

export function PaymentsAdmin() {
  return <AdminShell section="پرداخت‌ها"><AdminHeader title="پرداخت‌ها" subtitle="گردش مالی و وضعیت تسویه"/><div className="admin-kpi-row"><div><CircleDollarSign/><span>پرداخت امروز</span><strong>۲۸۴ م</strong></div><div><WalletCards/><span>در انتظار تسویه</span><strong>۶۸ م</strong></div><div><AlertTriangle/><span>ناموفق</span><strong>۱۲</strong></div></div><Toolbar placeholder="شناسه پرداخت..." chips={['همه','موفق','در انتظار','ناموفق']}/><DataTable headers={['شناسه','کاربر','مبلغ','وضعیت']} rows={[[ 'PAY-9241','علی رضایی','۱۲.۳ م',<Status tone="verified">موفق</Status>],[ 'PAY-9238','سارا محمدی','۲.۲ م',<Status tone="warning">در انتظار</Status>],[ 'PAY-9221','رضا شریفی','۸۵۰ ه',<Status tone="danger">ناموفق</Status>]]}/></AdminShell>
}

export function MessagingAdmin() {
  return <AdminShell section="پیام‌ها"><AdminHeader title="ارتباطات" subtitle="SMS، Push و پیام‌های سیستمی" action="پیام جدید"/><div className="admin-kpi-row"><div><MessageSquare/><span>Push امروز</span><strong>8,420</strong></div><div><Megaphone/><span>SMS امروز</span><strong>2,180</strong></div><div><Bell/><span>Delivery</span><strong>98.7%</strong></div></div><Toolbar placeholder="جستجو در کمپین‌ها..."/><DataTable headers={['عنوان','کانال','مخاطب','وضعیت']} rows={[[ 'یادآوری قرارداد','Push + SMS','۱,۲۴۰',<Status tone="verified">ارسال شد</Status>],[ 'شارژ شهریور','Push','۸۳۲',<Status tone="verified">ارسال شد</Status>],[ 'اطلاعیه امنیتی','SMS','۱۲,۴۸۰',<Status tone="warning">زمان‌بندی</Status>]]}/></AdminShell>
}

export function SupportAdmin() {
  return <AdminShell section="پیام‌ها"><AdminHeader title="پشتیبانی" subtitle="تیکت‌ها و SLA تیم عملیات"/><Toolbar placeholder="شماره تیکت یا کاربر..." chips={['همه','باز','در حال بررسی','بسته']}/><DataTable headers={['تیکت','موضوع','کاربر','SLA']} rows={[[ '#2481','Property Passport','حمیدرضا پاکپور',<Status tone="warning">۱س ۲۰د</Status>],[ '#2479','پرداخت ناموفق','سارا محمدی',<Status tone="danger">۲۵د</Status>],[ '#2468','قرارداد','علی رضایی',<Status tone="verified">بسته</Status>]]}/></AdminShell>
}

export function ComplianceAdmin() {
  return <AdminShell section="تنظیمات"><AdminHeader title="Compliance" subtitle="Capability Gates و وضعیت الزامات"/><div className="compliance-grid">
    <div><ShieldCheck/><h3>Official Registration</h3><Status tone="warning">غیرفعال</Status><p>منتظر تأیید مسیر رسمی / Partner integration.</p></div>
    <div><WalletCards/><h3>Escrow Rail</h3><Status tone="warning">غیرفعال</Status><p>ساخته و تست می‌شود؛ launch پشت gate.</p></div>
    <div><UserCheck/><h3>Identity Verification</h3><Status tone="verified">فعال</Status><p>برای flows منتخب در دسترس است.</p></div>
  </div></AdminShell>
}

export function FeatureFlagsAdmin() {
  const flags=[['verified_listing','Verified Listing','روشن'],['transaction_rail','Transaction Rail','خاموش'],['escrow_flow','Escrow Flow','خاموش'],['inspector_assignment_v2','Inspector Assignment v2','روشن']]
  return <AdminShell section="تنظیمات"><AdminHeader title="Feature Flags" subtitle="کنترل rollout و قابلیت‌های regulated"/><Toolbar placeholder="جستجو در flagها..."/><div className="flag-list">{flags.map(f=><div key={f[0]}><div><code>{f[0]}</code><strong>{f[1]}</strong></div><span className={'toggle '+(f[2]==='روشن'?'on':'')}><i/></span></div>)}</div></AdminShell>
}

export function AuditAdmin() {
  const rows=[
    ['14:32','admin@propertyos.ir','UPDATE_CLAIM','CLM-4821'],
    ['14:18','system','ASSIGN_INSPECTOR','INS-3281'],
    ['13:52','support@propertyos.ir','VIEW_DOCUMENT','DOC-882'],
    ['13:31','system','PAYMENT_CONFIRMED','PAY-9241']
  ]
  return <AdminShell section="تنظیمات"><AdminHeader title="Security & Audit" subtitle="رویدادهای حساس و قابل ردیابی"/><Toolbar placeholder="actor، action یا resource..." chips={['همه','Admin','System']}/><DataTable headers={['زمان','Actor','Action','Resource']} rows={rows}/></AdminShell>
}

export function ServicePartnersAdmin() {
  const rows=[
    ['هوم‌سرویز','Referral','تأسیسات','فعال'],
    ['خدمت از ما','Deep Link','نظافت / تعمیر','فعال'],
    ['شرکت آلفا','API','بازرسی تخصصی','Pilot']
  ]
  return <AdminShell section="تنظیمات"><AdminHeader title="Service Partners" subtitle="Orchestration بدون marketplace عملیاتی داخلی" action="Partner جدید"/><Toolbar placeholder="جستجو در Partnerها..."/><DataTable headers={['Partner','Integration','حوزه','وضعیت']} rows={rows.map(r=>[r[0],r[1],r[2],<Status tone={r[3]==='فعال'?'verified':'warning'}>{r[3]}</Status>])}/></AdminShell>
}

export function AnalyticsAdmin() {
  return <AdminShell section="داشبورد"><AdminHeader title="گزارش‌ها و تحلیل" subtitle="Product، Trust و عملیات"/><div className="analytics-grid"><div className="analytics-card"><BarChart3/><span>Property creation</span><strong>+18.4%</strong><small>ماه به ماه</small></div><div className="analytics-card"><ShieldCheck/><span>Verified conversion</span><strong>32.8%</strong><small>از eligible listings</small></div><div className="analytics-card"><ClipboardCheck/><span>Inspection SLA</span><strong>4.6h</strong><small>میانه</small></div><div className="analytics-card"><Wrench/><span>Service evidence return</span><strong>61%</strong><small>Partner flows</small></div></div><div className="chart-card analytics-chart"><div className="card-title">روند Trust adoption</div><svg viewBox="0 0 600 160"><polyline points="10,135 90,122 170,110 250,88 330,75 410,57 500,40 590,25" fill="none" stroke="#315EFB" strokeWidth="4"/></svg></div></AdminShell>
}
