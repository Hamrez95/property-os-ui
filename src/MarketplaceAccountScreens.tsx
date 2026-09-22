import {
  Bell, CheckCircle2, ChevronLeft, FileCheck2, Home, Image, MapPin, MessageSquare,
  ShieldCheck, SlidersHorizontal, UserRound, WalletCards
} from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

export function PublishListing() {
  return <Phone title="انتشار آگهی">
    <button className="mk-property-ref interactive-card" onClick={() => go('/property')}><div className="mk-thumb"><Home size={20}/></div><div><span>منبع آگهی</span><strong>آپارتمان نیاوران</strong><small>Property Record #P-1042</small></div><Status tone="verified">مالک تأییدشده</Status></button>
    <div className="mk-progress"><i className="done"/><i className="active"/><i/><span>۲ از ۳</span></div>
    <div className="mk-form">
      <label>نوع معامله</label><div className="mk-choice"><button className="active">اجاره</button><button>فروش</button></div>
      <label>مبلغ ودیعه</label><div className="mk-field"><span>۱,۲۰۰,۰۰۰,۰۰۰</span><small>تومان</small></div>
      <label>اجاره ماهانه</label><div className="mk-field"><span>۸۵,۰۰۰,۰۰۰</span><small>تومان</small></div>
      <label>تصاویر آگهی</label><button className="mk-upload interactive-row" onClick={() => go('/property-documents')}><Image size={18}/><span>۱۲ تصویر از Property Record</span><ChevronLeft size={15}/></button>
    </div>
    <div className="mk-info"><ShieldCheck size={17}/><span>اطلاعات تأییدشده مستقیماً از Property Passport نمایش داده می‌شوند.</span></div>
    <button className="btn primary mk-cta" onClick={() => go('/listing')}>پیش‌نمایش آگهی</button>
  </Phone>
}

export function NegotiationThread() {
  return <Phone title="مذاکره پیشنهاد">
    <div className="negotiation-summary"><span>آپارتمان فرمانیه</span><strong>پیشنهاد فعلی: ۱۲.۳ میلیارد</strong><Status tone="info">در مذاکره</Status></div>
    <div className="offer-history">
      <div className="them"><small>فروشنده · ۱۰:۱۴</small><p>۱۲.۶ میلیارد، انتقال در ۳۰ روز.</p></div>
      <div className="me"><small>شما · ۱۰:۲۶</small><p>۱۲.۳ میلیارد با ۳۰٪ پیش‌پرداخت.</p></div>
      <div className="them"><small>فروشنده · ۱۰:۴۲</small><p>۱۲.۴۵ میلیارد و انتقال در ۴۵ روز.</p></div>
    </div>
    <div className="counter-card"><label>پیشنهاد متقابل</label><strong>۱۲,۴۰۰,۰۰۰,۰۰۰ تومان</strong><div><span>اعتبار: ۲۴ ساعت</span><span>پرداخت: ۳۰٪ اولیه</span></div></div>
    <div className="negotiation-actions"><button className="btn secondary" onClick={() => go('/offer')}>ویرایش شرایط</button><button className="btn primary" onClick={() => go('/deal')}>ارسال پیشنهاد</button></div>
    <div className="mk-info subtle"><MessageSquare size={17}/><span>تمام تغییرات مبلغ و شرایط در timeline معامله نگهداری می‌شوند.</span></div>
  </Phone>
}

export function ContractReview() {
  return <Phone title="مرور قرارداد">
    <div className="contract-hero"><FileCheck2 size={24}/><div><span>پیش‌نویس قرارداد</span><strong>CTR-1405-1842</strong><small>نسخه ۳ · بروزرسانی ۱۴ دقیقه قبل</small></div><Status tone="warning">نیاز به تأیید</Status></div>
    <div className="contract-parties"><div><UserRound/><span><small>فروشنده</small><strong>رضا احمدی</strong></span><Status tone="verified">احراز‌شده</Status></div><div><UserRound/><span><small>خریدار</small><strong>حمیدرضا پاکپور</strong></span><Status tone="verified">احراز‌شده</Status></div></div>
    <div className="contract-sections">
      <div><span>موضوع قرارداد</span><strong>آپارتمان فرمانیه + پارکینگ P12</strong></div>
      <div><span>مبلغ نهایی</span><strong>۱۲.۴ میلیارد تومان</strong></div>
      <div><span>زمان انتقال</span><strong>حداکثر ۴۵ روز</strong></div>
    </div>
    <div className="mk-info"><ShieldCheck size={17}/><span>این صفحه پیش‌نمایش محصول است؛ مراحل رسمی فقط در صورت فعال بودن Capability Gate اجرا می‌شوند.</span></div>
    <button className="btn primary mk-cta" onClick={() => go('/secure-payment')}>تأیید پیش‌نویس</button>
  </Phone>
}

export function SecurePayment() {
  return <Phone title="پرداخت امن">
    <div className="payment-hero"><WalletCards size={25}/><div><span>مرحله پرداخت</span><strong>۳.۷۲ میلیارد تومان</strong><small>۳۰٪ مبلغ معامله</small></div></div>
    <div className="payment-breakdown"><div><span>مبلغ مرحله</span><strong>۳,۷۲۰,۰۰۰,۰۰۰</strong></div><div><span>کارمزد نمایش‌داده‌شده</span><strong>طبق سرویس فعال</strong></div><div><span>شناسه معامله</span><strong>TX-1405-0921-1842</strong></div></div>
    <div className="payment-method"><label>روش پرداخت</label><div className="active"><i/><span><strong>درگاه بانکی</strong><small>تسویه بر اساس rail فعال</small></span></div><div><i/><span><strong>انتقال بانکی</strong><small>ثبت رسید و بررسی</small></span></div></div>
    <div className="mk-info warning"><ShieldCheck size={17}/><span>Escrow / پرداخت واسط تا زمان مجوز و اتصال رسمی باید پشت Capability Gate باقی بماند.</span></div>
    <button className="btn primary mk-cta" onClick={() => go('/transaction')}>ادامه پرداخت</button>
  </Phone>
}

export function NotificationSettings() {
  const rows=[['یادآوری قرارداد','پایان، تمدید و سررسیدها',true],['اعلان مالی','اجاره، شارژ و پرداخت',true],['بازرسی و Trust','تغییر وضعیت Claimها',true],['پیامک تبلیغاتی','پیشنهادها و کمپین‌ها',false]] as const
  return <Phone title="تنظیمات اعلان">
    <div className="settings-hero"><Bell size={22}/><div><strong>اعلان‌های هوشمند</strong><span>فقط چیزهایی که برای نقش و املاک شما مهم‌اند.</span></div></div>
    <div className="notification-settings">{rows.map(r=><div key={r[0]}><div><strong>{r[0]}</strong><span>{r[1]}</span></div><i className={r[2]?'on':''}><em/></i></div>)}</div>
    <div className="channel-card"><SlidersHorizontal size={18}/><div><strong>کانال‌ها</strong><span>Push + پیامک برای موارد حساس</span></div><ChevronLeft size={16}/></div>
    <div className="mk-info subtle"><Bell size={17}/><span>پیامک فقط برای رویدادهای ضروری یا مواردی که خودتان فعال کرده‌اید ارسال می‌شود.</span></div>
  </Phone>
}
