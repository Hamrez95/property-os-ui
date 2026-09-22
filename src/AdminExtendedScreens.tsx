import {
  Activity, Bell, Building2, CheckCircle2, CircleDollarSign, ClipboardCheck,
  FileCheck2, Flag, Headphones, Landmark, MessageSquare, MoreVertical, Plus,
  Search, ShieldCheck, SlidersHorizontal, Users, WalletCards
} from 'lucide-react'
import { AdminShell, Stat, Status, type Tone } from './ui'
import { go } from './navigation'

type Row = [string,string,string,string,Tone]

function Toolbar({placeholder,action,actionRoute}:{placeholder:string,action?:string,actionRoute?:string}) {
  return <div className="adminx-toolbar"><div className="global-search"><Search size={15}/><span>{placeholder}</span></div>{action&&<button className="btn primary compact" onClick={() => actionRoute && go(actionRoute)}><Plus size={14}/>{action}</button>}</div>
}

function SimpleTable({columns,rows,rowRoute}:{columns:string[],rows:Row[],rowRoute?:string}) {
  return <div className="adminx-table">
    <div className="adminx-row header">{columns.map(c=><span key={c}>{c}</span>)}<span/></div>
    {rows.map((r,i)=><button className="adminx-row interactive-row" key={r[0]+i} onClick={() => rowRoute && go(rowRoute)}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span><Status tone={r[4]}>{r[3]}</Status></span><span><MoreVertical size={15}/></span></button>)}
  </div>
}

export function AdminBuildings() {
  const rows:Row[]=[['ساختمان نیاوران','۱۲ واحد','تهران','فعال','verified'],['برج فرمانیه','۳۶ واحد','تهران','فعال','verified'],['مجتمع ونک','۲۴ واحد','تهران','نیاز به بررسی','warning'],['رزیدنس لواسان','۸ واحد','لواسان','فعال','verified']]
  return <AdminShell section="ساختمان‌ها"><div className="admin-page-head"><div><h2>ساختمان‌ها</h2><p>ساختار، واحدها، مدیریت و عملیات مشترک</p></div></div><Toolbar placeholder="جستجو در ساختمان‌ها..." action="ساختمان جدید" actionRoute="/admin-properties"/><SimpleTable columns={['عنوان','تعداد واحد','موقعیت','وضعیت']} rows={rows} rowRoute="/admin-properties"/></AdminShell>
}

export function AdminListings() {
  const rows:Row[]=[['آپارتمان فرمانیه','اجاره','۲ ساعت قبل','منتشرشده','verified'],['ویلا لواسان','فروش','امروز','در انتظار بررسی','warning'],['پارکینگ P-21','اجاره','دیروز','منتشرشده','verified'],['تجاری جردن','فروش','۳ روز قبل','متوقف','neutral']]
  return <AdminShell section="آگهی‌ها"><div className="admin-page-head"><div><h2>آگهی‌ها</h2><p>Listing projectionها و وضعیت انتشار</p></div></div><Toolbar placeholder="جستجو در آگهی‌ها..."/><SimpleTable columns={['آگهی','نوع','بروزرسانی','وضعیت']} rows={rows} rowRoute="/listing"/></AdminShell>
}

export function AdminDeals() {
  const rows:Row[]=[['TX-1842','آپارتمان فرمانیه','۱۲.۴ میلیارد','قرارداد','info'],['TX-1831','ویلای لواسان','۲۸ میلیارد','مذاکره','warning'],['TX-1810','تجاری جردن','۱۸.۲ میلیارد','تکمیل‌شده','verified'],['TX-1804','پارکینگ ونک','۳۸۰ میلیون','لغوشده','neutral']]
  return <AdminShell section="معاملات"><div className="admin-page-head"><div><h2>معاملات</h2><p>Offer → Contract → Payment → Handover</p></div></div><Toolbar placeholder="شناسه یا ملک..."/><SimpleTable columns={['شناسه','ملک','ارزش','مرحله']} rows={rows} rowRoute="/transaction"/></AdminShell>
}

export function AdminTrustQueue() {
  const rows:Row[]=[['P-1042','مالکیت','سند رسمی','تأیید','verified'],['P-1108','پارکینگ','گزارش بازرس','QA','warning'],['P-1144','متراژ','مدرک پشتیبان','بررسی','info'],['P-1201','تصاویر','بازرس','تأیید','verified']]
  return <AdminShell section="Trust"><div className="admin-page-head"><div><h2>Trust & Verification</h2><p>Claimها، provenance و صف بررسی</p></div></div><div className="adminx-trust-summary"><Stat icon={ShieldCheck} label="صف بررسی" value="148" delta="-9%"/><Stat icon={ClipboardCheck} label="QA امروز" value="42" delta="+16%"/><Stat icon={CheckCircle2} label="تأییدشده" value="1,204" delta="+6%"/></div><Toolbar placeholder="Property یا Claim..."/><SimpleTable columns={['Property','Claim','منبع','وضعیت']} rows={rows} rowRoute="/verified-passport"/></AdminShell>
}

export function AdminInspectors() {
  const rows:Row[]=[['محمد رضایی','4.92','۱۲ ماموریت','فعال','verified'],['سینا کریمی','4.81','۹ ماموریت','فعال','verified'],['آرش نادری','4.42','۳ ماموریت','بازبینی کیفیت','warning'],['لیلا صالحی','4.88','۸ ماموریت','فعال','verified']]
  return <AdminShell section="بازرسان"><div className="admin-page-head"><div><h2>بازرسان</h2><p>تخصیص، کیفیت و عملکرد میدانی</p></div></div><Toolbar placeholder="جستجو در بازرسان..." action="دعوت بازرس" actionRoute="/admin-users"/><SimpleTable columns={['نام','امتیاز','این ماه','وضعیت']} rows={rows} rowRoute="/inspector-earnings"/></AdminShell>
}

export function AdminPayments() {
  const rows:Row[]=[['PAY-9421','TX-1842','۳.۷۲ میلیارد','در انتظار rail','warning'],['PAY-9381','اشتراک Owner Pro','۱.۹ میلیون','موفق','verified'],['PAY-9370','بازرسی INS-3278','۱.۶ میلیون','موفق','verified'],['PAY-9312','TX-1810','۵.۴۶ میلیارد','تسویه‌شده','verified']]
  return <AdminShell section="پرداخت‌ها"><div className="admin-page-head"><div><h2>پرداخت‌ها</h2><p>Payment intent، وضعیت rail و reconciliation</p></div></div><Toolbar placeholder="شناسه پرداخت..."/><SimpleTable columns={['شناسه','مرجع','مبلغ','وضعیت']} rows={rows} rowRoute="/secure-payment"/></AdminShell>
}

export function AdminSupport() {
  const rows:Row[]=[['#2481','اصلاح Property Passport','۲ ساعت','در حال بررسی','info'],['#2479','پرداخت اشتراک','۴ ساعت','پاسخ داده شد','verified'],['#2471','گزارش آگهی','دیروز','اولویت بالا','warning'],['#2466','تغییر شماره موبایل','دیروز','بسته شد','verified']]
  return <AdminShell section="پشتیبانی"><div className="admin-page-head"><div><h2>پشتیبانی</h2><p>درخواست‌ها، SLA و ارجاع داخلی</p></div></div><Toolbar placeholder="شماره تیکت یا کاربر..."/><SimpleTable columns={['تیکت','موضوع','سن','وضعیت']} rows={rows} rowRoute="/admin-support-ticket"/></AdminShell>
}

export function AdminSupportTicket() {
  return <AdminShell section="پشتیبانی">
    <div className="admin-page-head"><div><h2>تیکت #2481</h2><p>اصلاح اطلاعات Property Passport · کاربر: علی رضایی</p></div><Status tone="info">در حال بررسی</Status></div>
    <div className="admin-support-detail-grid">
      <section className="admin-support-thread">
        <div className="admin-support-event customer"><span>کاربر · دیروز ۱۸:۲۲</span><strong>سال ساخت نمایش‌داده‌شده با مدرک من یکی نیست.</strong><p>درخواست کرده‌ام Property Passport دوباره بررسی شود.</p></div>
        <div className="admin-support-event internal"><span>یادداشت داخلی · امروز ۰۸:۴۰</span><strong>Evidence موجود است</strong><p>سند برای تیم Trust ارجاع شده و Claim مرتبط باید re-check شود.</p></div>
        <div className="admin-support-event agent"><span>پشتیبانی · امروز ۰۹:۱۰</span><strong>پاسخ ثبت‌شده</strong><p>مدرک دریافت شد و نتیجه پس از بررسی Trust در همین تیکت ثبت می‌شود.</p></div>
      </section>
      <aside className="admin-support-meta">
        <div><span>Owner</span><strong>Support Tier 1</strong></div>
        <div><span>Linked Property</span><strong>آپارتمان نیاوران</strong></div>
        <div><span>Linked workflow</span><strong>Trust / Passport</strong></div>
        <div><span>SLA</span><strong>تا فردا ۱۲:۰۰</strong></div>
        <button className="btn secondary" onClick={() => go('/admin-trust')}>باز کردن Trust Queue</button>
        <button className="btn primary" onClick={() => go('/admin-support')}>ثبت و بازگشت به صف</button>
      </aside>
    </div>
  </AdminShell>
}

export function AdminReports() {
  return <AdminShell section="گزارش‌ها">
    <div className="admin-page-head"><div><h2>گزارش‌ها و تحلیل</h2><p>سلامت marketplace، trust و عملیات</p></div></div>
    <div className="adminx-report-kpis"><Stat icon={Users} label="MAU" value="18.4K" delta="+14%"/><Stat icon={Building2} label="Active Properties" value="8.3K" delta="+8%"/><Stat icon={FileCheck2} label="Verified" value="1.2K" delta="+11%"/><Stat icon={CircleDollarSign} label="GMV tracked" value="94B" delta="+19%"/></div>
    <div className="adminx-report-grid"><div className="adminx-chart"><div><strong>فعالیت ۳۰ روزه</strong><span>Property / Listing / Deal</span></div><svg viewBox="0 0 500 160"><polyline points="0,135 65,118 130,123 195,83 260,92 325,61 390,69 455,28 500,36" fill="none" stroke="#315EFB" strokeWidth="4"/></svg></div><div className="adminx-health"><strong>شاخص‌های اعتماد</strong><div><span>Claim دارای provenance</span><b>88%</b></div><div><span>Inspection SLA</span><b>94%</b></div><div><span>Dispute rate</span><b>1.8%</b></div></div></div>
  </AdminShell>
}

export function AdminFeatureFlags() {
  const flags=[['Official Registration','ثبت رسمی و integration','off'],['Escrow Rail','پرداخت واسط regulated','off'],['Verified Listing','انتشار آگهی تأییدشده','on'],['Inspector Network','تخصیص بازرس','on']]
  return <AdminShell section="Feature Flags"><div className="admin-page-head"><div><h2>Feature Flags</h2><p>Capability gates برای قابلیت‌های حساس و مجوزمحور</p></div></div><div className="flag-list">{flags.map(f=><div key={f[0]}><Flag size={16}/><span><strong>{f[0]}</strong><small>{f[1]}</small></span><i className={f[2]}><em/></i></div>)}</div></AdminShell>
}

export function AdminSecurityAudit() {
  const rows:Row[]=[['AUTH-8821','Role changed','admin@propertyos','ثبت‌شده','verified'],['SEC-4410','Failed login burst','0912***6789','بررسی','warning'],['DATA-1204','Property ownership edit','P-1042','ثبت‌شده','verified'],['API-8142','Capability denied','official-registration','مسدود','neutral']]
  return <AdminShell section="امنیت"><div className="admin-page-head"><div><h2>Security & Audit</h2><p>رویدادهای حساس، دسترسی و تغییرات غیرقابل انکار</p></div></div><Toolbar placeholder="شناسه یا actor..."/><SimpleTable columns={['Event','عملیات','Actor / Target','وضعیت']} rows={rows} rowRoute="/admin-security"/></AdminShell>
}
