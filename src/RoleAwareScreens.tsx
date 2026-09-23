import {
  Bell, Building2, CalendarDays, ChevronLeft, CircleDollarSign, FileCheck2,
  Home, KeyRound, Landmark, ShieldCheck, Users, WalletCards, Wrench
} from 'lucide-react'
import { Phone, Status, type Tone } from './ui'
import { go } from './navigation'
import { useRoleScope } from './RoleScopeContext'

function RelationshipCard({title,type,meta,relation,status,tone='verified',route}:{title:string,type:string,meta:string,relation:string,status:string,tone?:Tone,route:string}) {
  return <button className="relationship-property-card" onClick={()=>go(route)}>
    <div className="relationship-thumb"><Home size={18}/></div>
    <div className="relationship-copy"><small>{type}</small><strong>{title}</strong><span>{meta}</span><div><em>{relation}</em><Status tone={tone}>{status}</Status></div></div>
    <ChevronLeft size={17}/>
  </button>
}

function TenantHome() {
  return <>
    <section className="home-focus-card tenant">
      <div className="focus-head"><div><span>خانه فعلی من</span><strong>آپارتمان نیاوران</strong><small>مستأجر · واحد ۴ + پارکینگ P-21</small></div><Status tone="verified">فعال</Status></div>
      <div className="focus-metrics"><div><span>مانده قرارداد</span><b>۲۷ روز</b></div><div><span>شارژ این ماه</span><b>۸۵۰ هزار</b></div><div><span>درخواست باز</span><b>۱</b></div></div>
      <div className="focus-actions"><button onClick={()=>go('/property-lease')}><FileCheck2/>قرارداد</button><button onClick={()=>go('/building')}><Building2/>ساختمان</button><button onClick={()=>go('/maintenance')}><Wrench/>تعمیرات</button></div>
    </section>
    <div className="home-section-head"><h3>کارهای مهم شما</h3><span>بر اساس نقش مستأجر</span></div>
    <button className="home-task warning" onClick={()=>go('/property-lease')}><CalendarDays/><div><strong>تمدید قرارداد نزدیک است</strong><span>۲۷ روز تا پایان اجاره</span></div><ChevronLeft/></button>
    <button className="home-task info" onClick={()=>go('/building-announcements')}><Bell/><div><strong>پیام جدید مدیر ساختمان</strong><span>سرویس آسانسور پنجشنبه ساعت ۱۰</span></div><ChevronLeft/></button>
    <button className="home-task neutral" onClick={()=>go('/maintenance')}><Wrench/><div><strong>سرویس پکیج</strong><span>موعد پیشنهادی: این هفته</span></div><ChevronLeft/></button>
    <div className="privacy-note"><ShieldCheck/><span>در نمای مستأجر، اطلاعات مالکیت، سند و ارزش‌گذاری خصوصی نمایش داده نمی‌شود.</span></div>
  </>
}

function OwnerHome() {
  return <>
    <section className="owner-summary-card">
      <div><span>سبد مالکیت</span><strong>۴ ملک</strong><small>۳ اجاره‌شده · ۱ خالی</small></div>
      <div className="owner-kpis"><span><b>۲</b> تمدید نزدیک</span><span><b>۱</b> تعمیر باز</span><span><b>۸۵م</b> اجاره ماه</span></div>
    </section>
    <div className="home-section-head"><h3>نیاز به توجه</h3><button onClick={()=>go('/portfolio')}>همه املاک</button></div>
    <RelationshipCard title="آپارتمان نیاوران" type="آپارتمان" meta="۱۴۰ متر · طبقه ۴" relation="مالک ۶/۶ دانگ" status="اجاره‌شده" route="/property/apartment"/>
    <RelationshipCard title="ویلای لواسان" type="ویلا" meta="۴۲۰ زمین · ۲۳۰ بنا" relation="مالک ۶/۶ دانگ" status="خالی" tone="warning" route="/property/villa"/>
    <RelationshipCard title="تجاری جردن" type="ملک تجاری" meta="۸۵ متر · بر ۶.۲ متر" relation="مالک ۲.۵/۶ دانگ" status="اجاره‌شده" route="/property/commercial"/>
  </>
}

function ManagerHome() {
  return <>
    <section className="manager-summary-card">
      <div className="manager-title"><Building2/><div><span>مدیریت ساختمان</span><strong>ساختمان نیاوران</strong><small>۱۲ واحد · ۹ ساکن</small></div></div>
      <div className="manager-kpis"><div><span>بدهی</span><b>۱۸.۴ م</b></div><div><span>درخواست باز</span><b>۳</b></div><div><span>سرویس بعدی</span><b>۶ روز</b></div></div>
    </section>
    <div className="manager-action-grid">
      <button onClick={()=>go('/charges')}><CircleDollarSign/><span>شارژ و بدهی</span><b>۲ بدهکار</b></button>
      <button onClick={()=>go('/maintenance')}><Wrench/><span>تعمیرات</span><b>۳ باز</b></button>
      <button onClick={()=>go('/building-announcements')}><Bell/><span>اعلان‌ها</span><b>۱ پیش‌نویس</b></button>
      <button onClick={()=>go('/building-units')}><Users/><span>ساکنین</span><b>۹ فعال</b></button>
      <button onClick={()=>go('/building-governance')}><Landmark/><span>مجمع و مصوبات</span><b>۱ رأی باز</b></button>
    </div>
    <button className="home-task warning" onClick={()=>go('/maintenance')}><Wrench/><div><strong>تیکت آسانسور منتظر تأیید است</strong><span>پیشنهاد سرویس‌کار: ۳.۸ میلیون تومان</span></div><ChevronLeft/></button>
  </>
}

function HomeTour({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const slides = [
    ['نقش و محدودهٔ فعال', 'اینجا همیشه می‌بینی در نقش چه کسی و برای کدام واحد یا ساختمان کار می‌کنی.'],
    ['ملک یا واحد فعال', 'کارت‌های صفحه فقط به رابطه و محل فعال تو مربوط‌اند؛ لازم نیست حدس بزنی اطلاعات برای چیست.'],
    ['اقدام‌های سریع', 'قرارداد، تعمیرات و شارژ از همان context باز می‌شوند؛ هر مسیر عمومیِ اشتباهی به پیام‌ها نمی‌رود.'],
    ['یادآوری‌های مهم', 'اولویت‌ها و موعدها را در همین نقش می‌بینی؛ هر زمان خواستی از بالای صفحه نقش را عوض کن.'],
  ]
  return <div className="home-tour" role="dialog" aria-modal="true" aria-labelledby="tour-title">
    <div className="home-tour-spotlight" aria-hidden="true"/>
    <section className="home-tour-card">
      <span>راهنمای کوتاه · {step + 1} از {slides.length}</span>
      <h2 id="tour-title">{slides[step][0]}</h2><p>{slides[step][1]}</p>
      <div><button onClick={onClose}>رد کردن</button><button className="btn primary compact" onClick={() => step === slides.length - 1 ? onClose() : setStep(step + 1)}>{step === slides.length - 1 ? 'متوجه شدم' : 'بعدی'}</button></div>
      <button className="home-tour-never" onClick={onClose}>دیگر نشان نده</button>
    </section>
  </div>
}

export function RoleAwareHome() {
  const { activeScope: context } = useRoleScope()
  const [tourOpen, setTourOpen] = useState(true)
  return <Phone active="home">
    <div className="role-home-top">
      <div className="hello role-hello"><div className="avatar">ح</div><div><strong>سلام حمیدرضا</strong><span>مهم‌ترین کارهای امروز، متناسب با رابطه شما</span></div></div>
      <p className="context-explainer">نقش و محدودهٔ فعال در بالای صفحه ثابت است و در تعمیرات، شارژ، ساختمان و قرارداد هم حفظ می‌شود.</p>
    </div>
    <div className="role-home-body">
      {context==='tenant' && <TenantHome/>}
      {context==='owner' && <OwnerHome/>}
      {context==='manager' && <ManagerHome/>}
    </div>
    {tourOpen && <HomeTour onClose={() => setTourOpen(false)}/>}
  </Phone>
}

type PortfolioFilter='all'|'owner'|'tenant'|'manager'

export function RelationshipPortfolio() {
  const [filter,setFilter]=useState<PortfolioFilter>('all')
  const items=[
    {title:'آپارتمان نیاوران',type:'آپارتمان',meta:'۱۴۰ متر · واحد ۴',relation:'مستأجر',status:'اجاره فعال',tone:'verified' as Tone,route:'/property/apartment',roles:['tenant']},
    {title:'ویلای لواسان',type:'ویلا',meta:'۴۲۰ زمین · ۲۳۰ بنا',relation:'مالک ۶/۶ دانگ',status:'خالی',tone:'warning' as Tone,route:'/property/villa',roles:['owner']},
    {title:'تجاری جردن',type:'تجاری',meta:'۸۵ متر · همکف',relation:'مالک ۲.۵/۶ دانگ',status:'اجاره‌شده',tone:'verified' as Tone,route:'/property/commercial',roles:['owner']},
    {title:'زمین دماوند',type:'زمین',meta:'۶۳۴ متر · مسکونی',relation:'مالک ۳/۶ دانگ',status:'بدون بهره‌بردار',tone:'neutral' as Tone,route:'/property/land',roles:['owner']},
    {title:'دفتر سعادت‌آباد',type:'اداری',meta:'۱۱۰ متر · طبقه ۵',relation:'مالک ۶/۶ دانگ',status:'فعال',tone:'verified' as Tone,route:'/property/office',roles:['owner']},
    {title:'باغ لواسانات',type:'باغ / کشاورزی',meta:'۳۲۰۰ متر · باغ میوه',relation:'مالک ۶/۶ دانگ',status:'فعال',tone:'verified' as Tone,route:'/property/agricultural',roles:['owner']},
    {title:'سوله جاده مخصوص',type:'صنعتی',meta:'۱۰۰۰ زمین · ۴۷۰ سالن',relation:'مالک ۶/۶ دانگ',status:'اجاره‌شده',tone:'info' as Tone,route:'/property/industrial',roles:['owner']},
    {title:'خانه کلنگی یوسف‌آباد',type:'کلنگی',meta:'۲۸۰ زمین · دو نبش',relation:'مالک ۶/۶ دانگ',status:'نیاز به تصمیم',tone:'warning' as Tone,route:'/property/teardown',roles:['owner']},
    {title:'ساختمان نیاوران',type:'ساختمان',meta:'۱۲ واحد · تهران',relation:'مدیر ساختمان',status:'فعال',tone:'info' as Tone,route:'/building',roles:['manager']},
  ]
  const visible=filter==='all'?items:items.filter(item=>item.roles.includes(filter))
  return <Phone title="املاک" active="properties">
    <div className="portfolio-purpose">
      <div><strong>همه املاک و فضاهای مرتبط با من</strong><span>مالکیت، اجاره، نمایندگی یا مدیریت — فهرست کامل اینجاست؛ Home فقط کارهای مهم امروز را نشان می‌دهد.</span></div>
    </div>
    <div className="portfolio-role-filter">{[
      ['all','همه'],['tenant','مستأجر'],['owner','مالک'],['manager','مدیر ساختمان']
    ].map(([key,label])=><button key={key} className={filter===key?'active':''} onClick={()=>setFilter(key as PortfolioFilter)}>{label}</button>)}</div>
    <div className="relationship-list">
      {visible.map(item=><RelationshipCard key={item.title} {...item}/>)}
    </div>
    <button className="portfolio-add" onClick={()=>go('/property-add')}>+ افزودن ملک یا رابطه جدید</button>
  </Phone>
}
import { useState } from 'react'
