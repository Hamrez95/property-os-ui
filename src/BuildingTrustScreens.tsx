import {
  AlertTriangle, Bell, CalendarDays, CheckCircle2, ChevronLeft,
  ClipboardCheck, CircleDollarSign, FileCheck2, Landmark, Megaphone, Plus, ShieldCheck,
  Users, Vote, WalletCards, Wrench
} from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

export function BuildingGovernance() {
  const resolutions=[
    ['بودجه تعمیر پمپ آب','تصویب‌شده · مجمع شهریور','verified'],
    ['افزایش اندوخته تعمیرات','در انتظار رأی مجمع','warning'],
    ['قرارداد سرویس آسانسور','تصویب‌شده تا اسفند','verified'],
  ] as const
  return <Phone title="مدیریت و مصوبات ساختمان">
    <div className="governance-hero"><Landmark size={24}/><div><span>Mandate فعال</span><strong>مدیریت ساختمان نیاوران</strong><small>مدیر: نرگس اکبری · تا ۱۴۰۶/۰۶/۳۱</small></div><Status tone="verified">فعال</Status></div>
    <div className="governance-kpis">
      <button onClick={()=>go('/building-announcements')}><CalendarDays/><span>مجمع بعدی</span><b>۲۸ مهر</b></button>
      <button onClick={()=>go('/building-expenses')}><WalletCards/><span>اندوخته</span><b>۴۸ م</b></button>
      <button onClick={()=>go('/charges')}><CircleDollarSign/><span>روش شارژ</span><b>ترکیبی</b></button>
    </div>
    <section className="governance-card">
      <div className="governance-title"><Vote size={17}/><div><strong>آخرین مصوبات</strong><span>صورت‌جلسه و نسخه قاعده باید نگهداری شود.</span></div></div>
      {resolutions.map(r=><button className="governance-resolution" key={r[0]} onClick={()=>go('/building-expenses')}><div><strong>{r[0]}</strong><span>{r[1]}</span></div><Status tone={r[2]}>{r[2]==='verified'?'معتبر':'باز'}</Status></button>)}
    </section>
    <section className="governance-card">
      <div className="governance-title"><ShieldCheck size={17}/><div><strong>تعهدات پایه مدیر</strong><span>برای prototype، به‌صورت reminder عملیاتی نمایش داده شده‌اند.</span></div></div>
      <div className="governance-checks">
        <div><CheckCircle2/><span>بیمه آتش‌سوزی کل بنا</span><b>سررسید ۵ روز</b></div>
        <div><CheckCircle2/><span>دفتر درآمد / هزینه و اسناد</span><b>بروزشده</b></div>
        <div><CheckCircle2/><span>اطلاع‌رسانی مصوبات به غایبین</span><b>۱ مورد باز</b></div>
      </div>
    </section>
    <div className="bt-info warning"><AlertTriangle size={17}/><span>روش تقسیم شارژ از یک فرمول ثابت نمی‌آید؛ Rule و دوره اثر باید ثبت شود و مبنای محاسبه هر بدهی snapshot داشته باشد.</span></div>
  </Phone>
}

export function BuildingExpenses() {
  const rows=[['سرویس آسانسور','۱۲,۵۰۰,۰۰۰','پرداخت‌شده','verified'],['نظافت شهریور','۶,۸۰۰,۰۰۰','پرداخت‌شده','verified'],['تعمیر پمپ آب','۱۸,۴۰۰,۰۰۰','در انتظار تصویب','warning'],['بیمه ساختمان','۲۴,۰۰۰,۰۰۰','سررسید ۵ روز','warning']] as const
  return <Phone title="هزینه‌های ساختمان">
    <div className="bt-summary-card">
      <div><CircleDollarSign size={23}/><span>هزینه این ماه</span><strong>۶۱.۷ میلیون</strong></div>
      <small>+۸٪ نسبت به ماه قبل</small>
    </div>
    <div className="bt-kpis"><div><span>بودجه ماه</span><strong>۷۵ م</strong></div><div><span>پرداخت‌شده</span><strong>۴۳.۳ م</strong></div><div><span>در انتظار</span><strong>۱۸.۴ م</strong></div></div>
    <div className="bt-section-title"><h3>ریز هزینه‌ها</h3><button onClick={() => go('/property-finance')}>گزارش کامل</button></div>
    <div className="bt-list">{rows.map(r=><div className="bt-row" key={r[0]}><div><strong>{r[0]}</strong><span>{r[1]} تومان</span></div><Status tone={r[3]}>{r[2]}</Status></div>)}</div>
  </Phone>
}

export function BuildingAnnouncements() {
  const notes=[
    ['قطعی آب برنامه‌ریزی‌شده','فردا ۱۰ تا ۱۲ · موتورخانه','warning'],
    ['جلسه ماهانه ساختمان','پنجشنبه ساعت ۱۹ · لابی','info'],
    ['سرویس آسانسور انجام شد','امروز · شرکت سرویس‌کار','verified']
  ] as const
  return <Phone title="اعلان‌های ساختمان">
    <div className="bt-action-hero"><Megaphone size={23}/><div><strong>اطلاع‌رسانی به ساکنین</strong><span>اعلان، پیام و اطلاعیه‌های عملیاتی</span></div><button className="icon-button" onClick={() => go('/building-announcement-new')} aria-label="اعلان جدید"><Plus size={15}/></button></div>
    <div className="bt-list announcement-list">{notes.map((n,i)=><div className="announcement-row" key={n[0]}>
      <div className={'announcement-icon n'+i}><Bell size={16}/></div><div><strong>{n[0]}</strong><span>{n[1]}</span></div><Status tone={n[2]}>{n[2]==='verified'?'انجام شد':n[2]==='warning'?'مهم':'اطلاعیه'}</Status>
    </div>)}</div>
    <button className="bt-audience-card interactive-row" onClick={() => go('/building-units')}><Users size={18}/><div><strong>مخاطب پیش‌فرض</strong><span>همه ساکنین و مالکان ساختمان نیاوران</span></div><ChevronLeft size={16}/></button>
  </Phone>
}

export function BuildingAnnouncementComposer() {
  return <Phone title="اعلان جدید ساختمان">
    <div className="bt-action-hero"><Megaphone size={23}/><div><strong>اطلاعیه عملیاتی</strong><span>مستقل از چت شخصی؛ با مخاطب و زمان‌بندی مشخص</span></div><Status tone="info">Draft</Status></div>
    <div className="announcement-form">
      <label><span>عنوان</span><input defaultValue="جلسه ماهانه ساختمان"/></label>
      <label><span>متن اعلان</span><textarea defaultValue="جلسه ماهانه ساختمان پنجشنبه ساعت ۱۹ در لابی برگزار می‌شود."/></label>
      <div className="announcement-form-row">
        <label><span>مخاطب</span><select defaultValue="all"><option value="all">همه ساکنین و مالکان</option><option>فقط مالکان</option><option>فقط ساکنین</option><option>واحدهای منتخب</option></select></label>
        <label><span>اولویت</span><select defaultValue="normal"><option value="normal">عادی</option><option>مهم</option><option>فوری</option></select></label>
      </div>
      <label><span>زمان انتشار</span><input defaultValue="همین حالا"/></label>
    </div>
    <div className="bt-info"><Users size={17}/><span>این اعلان برای ۱۲ واحد و ۱۷ Party مجاز نمایش داده می‌شود. پیام خصوصی یا Chat ایجاد نمی‌شود.</span></div>
    <div className="announcement-submit">
      <button className="btn secondary" onClick={() => go('/building-announcements')}>انصراف</button>
      <button className="btn primary" onClick={() => go('/building-announcements')}><CheckCircle2 size={15}/>انتشار اعلان</button>
    </div>
  </Phone>
}

export function MaintenanceRequest() {
  return <Phone title="درخواست تعمیرات">
    <div className="maintenance-hero"><Wrench size={24}/><div><strong>خرابی پمپ آب</strong><span>مشاعات · موتورخانه</span></div><Status tone="warning">اولویت بالا</Status></div>
    <div className="maintenance-timeline">
      <div className="done"><i>✓</i><span><strong>ثبت درخواست</strong><small>امروز ۰۹:۱۲</small></span></div>
      <div className="active"><i>2</i><span><strong>تخصیص سرویس‌کار</strong><small>در حال هماهنگی</small></span></div>
      <div><i>3</i><span><strong>انجام خدمت</strong><small>پس از تأیید زمان</small></span></div>
      <div><i>4</i><span><strong>ثبت هزینه و نتیجه</strong><small>پایان کار</small></span></div>
    </div>
    <div className="maintenance-detail"><div><span>ثبت‌کننده</span><strong>مدیر ساختمان</strong></div><div><span>بودجه اولیه</span><strong>۱۵–۲۰ میلیون</strong></div><div><span>دسترسی</span><strong>موتورخانه</strong></div></div>
    <button className="btn primary bt-bottom-cta" onClick={() => go('/support')}>مشاهده سرویس‌کارها</button>
  </Phone>
}

export function InspectionStatus() {
  return <Phone title="وضعیت بازرسی">
    <div className="inspection-status-hero"><ClipboardCheck size={25}/><div><span>درخواست #IN-2481</span><strong>بازرسی ملک نیاوران</strong><small>آخرین بروزرسانی: ۱۸ دقیقه قبل</small></div></div>
    <div className="inspection-steps">
      <div className="done"><i>✓</i><div><strong>درخواست ثبت شد</strong><span>۱۴۰۵/۰۶/۳۰</span></div></div>
      <div className="done"><i>✓</i><div><strong>بازرس تخصیص یافت</strong><span>محمد رضایی</span></div></div>
      <div className="active"><i>3</i><div><strong>بازدید انجام شد</strong><span>گزارش در حال بررسی کیفیت</span></div></div>
      <div><i>4</i><div><strong>تأیید و انتشار</strong><span>پس از QA</span></div></div>
    </div>
    <div className="bt-info"><ShieldCheck size={17}/><span>تا پایان QA، Claimهای جدید با برچسب «در حال بررسی» نمایش داده می‌شوند.</span></div>
  </Phone>
}

export function VerifiedPassport() {
  return <Phone title="پاسپورت تأییدشده">
    <div className="verified-hero">
      <div className="verified-seal"><ShieldCheck size={29}/></div>
      <div><span>Property Passport</span><h3>آپارتمان نیاوران</h3><Status tone="verified">بازرسی‌شده</Status></div>
    </div>
    <div className="verified-score"><div><strong>92</strong><span>/100</span></div><p>سطح اعتماد این ملک بر اساس اسناد، سابقه و بازدید میدانی محاسبه شده است.</p></div>
    <div className="verified-grid">
      <div><CheckCircle2/><span>مالکیت</span><strong>Official</strong></div>
      <div><CheckCircle2/><span>متراژ</span><strong>Document</strong></div>
      <div><CheckCircle2/><span>پارکینگ</span><strong>Inspector</strong></div>
      <div><CheckCircle2/><span>تصاویر</span><strong>Inspector</strong></div>
    </div>
    <button className="provenance-card interactive-row" onClick={() => go('/claim-evidence')}><FileCheck2 size={18}/><div><strong>چرا این وضعیت قابل اعتماد است؟</strong><span>برای هر Claim منبع و زمان آخرین تأیید قابل مشاهده است.</span></div><ChevronLeft size={16}/></button>
    <div className="bt-info warning"><AlertTriangle size={17}/><span>تأیید Property OS جایگزین استعلام رسمی مراجع قانونی نیست.</span></div>
  </Phone>
}
