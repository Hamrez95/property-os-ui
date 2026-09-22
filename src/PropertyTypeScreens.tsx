import { useState } from 'react'
import {
  Building2, ChevronLeft, FileCheck2, Home, KeyRound, Landmark, MapPin,
  Ruler, ShieldCheck, Store, TreePine, Users, Wrench
} from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

type DetailField = { label:string; value:string; private?:boolean; evidence?:string }
type PropertyType = {
  key:string; title:string; kind:string; location:string; relation:string; status:string;
  icon:'apartment'|'villa'|'commercial'|'office'|'land'|'teardown';
  headline:[string,string][];
  base:DetailField[]; specialist:DetailField[]; ownership:DetailField[]; services:string[];
}

const data:Record<string,PropertyType>={
  apartment:{
    key:'apartment',title:'آپارتمان نیاوران',kind:'آپارتمان مسکونی',location:'تهران، نیاوران · ساختمان کسری',relation:'مستأجر + دسترسی مالک در نمونه',status:'اجاره فعال',icon:'apartment',
    headline:[['۱۴۰','متر'],['۳','خواب'],['۴ از ۶','طبقه'],['۱۴۰۰','سال ساخت']],
    base:[
      {label:'شماره واحد',value:'۴'},{label:'تعداد سرویس',value:'۲'},{label:'جهت',value:'شمالی'},{label:'واحد در طبقه',value:'۲'},
      {label:'آسانسور',value:'دارد'},{label:'بالکن',value:'دارد'},{label:'گرمایش',value:'پکیج'},{label:'سرمایش',value:'اسپلیت'}
    ],
    specialist:[
      {label:'پارکینگ',value:'P-21 · سندی',evidence:'Space مستقل'},{label:'انباری',value:'A4 · ۶ متر',evidence:'Space مستقل'},
      {label:'بازسازی',value:'۱۴۰۳ · آشپزخانه',evidence:'ثبت مالک'},{label:'دسترسی ساختمان',value:'لابی + ریموت',evidence:'عملیاتی'}
    ],
    ownership:[
      {label:'نوع سند',value:'تک‌برگ',private:true},{label:'سهم مالکیت',value:'۶ از ۶ دانگ',private:true},
      {label:'وضعیت سند',value:'آزاد',private:true},{label:'ارزش‌گذاری داخلی',value:'نمایش فقط مالک',private:true}
    ],
    services:['قرارداد اجاره','شارژ ساختمان','تعمیرات و سرویس','پیام‌های مدیر']
  },
  villa:{
    key:'villa',title:'ویلای لواسان',kind:'ویلا / خانه مستقل',location:'لواسان، بلوار امام خمینی',relation:'مالک ۶/۶ دانگ',status:'خالی',icon:'villa',
    headline:[['۴۲۰','زمین'],['۲۳۰','زیربنا'],['۴','خواب'],['۱۴۰۱','سال ساخت']],
    base:[
      {label:'طبقات',value:'۲ · دوبلکس'},{label:'خواب مستر',value:'۲'},{label:'سرویس',value:'۳'},{label:'پارکینگ',value:'۳ خودرو'},
      {label:'حیاط اختصاصی',value:'۱۹۰ متر'},{label:'استخر',value:'چهارفصل'},{label:'گرمایش',value:'از کف'},{label:'انشعابات',value:'آب، برق، گاز'}
    ],
    specialist:[
      {label:'نوع سازه',value:'مدرن'},{label:'روف / تراس',value:'روف‌گاردن + تراس'},{label:'نگهبانی',value:'شهرکی ۲۴ساعته'},{label:'پایان‌کار',value:'ثبت شده',evidence:'Document-backed'}
    ],
    ownership:[
      {label:'نوع سند',value:'تک‌برگ',private:true},{label:'سهم مالکیت',value:'۶ از ۶ دانگ',private:true},
      {label:'وضعیت سند',value:'آزاد',private:true},{label:'پروانه ساخت',value:'موجود',private:true}
    ],
    services:['تعمیر استخر','محوطه و فضای سبز','قبوض و انشعابات','آگهی / اجاره']
  },
  commercial:{
    key:'commercial',title:'تجاری جردن',kind:'مغازه / ملک تجاری',location:'تهران، جردن · همکف',relation:'مالک ۲.۵/۶ دانگ',status:'اجاره‌شده',icon:'commercial',
    headline:[['۸۵','متر'],['۶.۲','متر بر'],['۴.۸','ارتفاع'],['همکف','طبقه']],
    base:[
      {label:'کاربری',value:'تجاری'},{label:'دهنه',value:'۲ دهنه'},{label:'انبار',value:'۱۲ متر'},{label:'سرویس',value:'۱'},
      {label:'برق',value:'سه‌فاز'},{label:'آب / گاز',value:'مستقل'},{label:'پارکینگ',value:'ندارد'},{label:'دسترسی',value:'بر خیابان'}
    ],
    specialist:[
      {label:'نوع حق',value:'ملکیت + سهم سرقفلی'},{label:'سرقفلی',value:'دارای پرونده مستقل',evidence:'Scope جدا'},
      {label:'کسب فعلی',value:'فروشگاه'},{label:'ارتفاع قابل نیم‌طبقه',value:'نیازمند بررسی مجوز',evidence:'Claim'}
    ],
    ownership:[
      {label:'نوع سند',value:'تک‌برگ تجاری',private:true},{label:'سهم مالکیت',value:'۲.۵ از ۶ دانگ',private:true},
      {label:'مالکیت مشاع',value:'بله · ۳ شریک',private:true},{label:'وضعیت حق کسب',value:'نیازمند مستندات',private:true}
    ],
    services:['اجاره تجاری','قبوض واحد','سرویس تجهیزات','مدیریت شریک‌ها']
  },
  office:{
    key:'office',title:'دفتر سعادت‌آباد',kind:'اداری / دفتر کار',location:'تهران، سعادت‌آباد · طبقه ۵',relation:'مالک ۶/۶ دانگ',status:'فعال',icon:'office',
    headline:[['۱۱۰','متر'],['۳','اتاق'],['۵ از ۸','طبقه'],['۱۳۹۸','سال ساخت']],
    base:[
      {label:'کاربری',value:'اداری'},{label:'آسانسور',value:'۲ دستگاه'},{label:'پارکینگ',value:'۱ سندی'},{label:'انباری',value:'۸ متر'},
      {label:'سرویس',value:'۲'},{label:'آبدارخانه',value:'دارد'},{label:'سرمایش',value:'فن‌کویل'},{label:'دسترسی',value:'۲۴ ساعته'}
    ],
    specialist:[
      {label:'اتاق جلسه',value:'۱'},{label:'شبکه',value:'کابل‌کشی ساختاریافته'},{label:'نگهبانی',value:'دارد'},{label:'تابلو / پلاک',value:'قابل نصب'}
    ],
    ownership:[
      {label:'نوع سند',value:'اداری تک‌برگ',private:true},{label:'سهم مالکیت',value:'۶ از ۶ دانگ',private:true},
      {label:'وضعیت سند',value:'آزاد',private:true},{label:'عوارض',value:'تسویه ۱۴۰۵',private:true}
    ],
    services:['اجاره اداری','هزینه ساختمان','سرویس HVAC','دسترسی کارمندان']
  },
  land:{
    key:'land',title:'زمین دماوند',kind:'زمین مسکونی',location:'دماوند، گیلاوند',relation:'مالک ۳/۶ دانگ',status:'بدون بهره‌بردار',icon:'land',
    headline:[['۶۳۴','متر'],['۱۲','متر بر'],['۱۰','متر گذر'],['۲ نبش','موقعیت']],
    base:[
      {label:'کاربری ثبت‌شده',value:'مسکونی'},{label:'ابعاد تقریبی',value:'۲۱ × ۳۰ متر'},{label:'جهت',value:'جنوبی'},{label:'محصور',value:'بله'},
      {label:'آب',value:'لب مرز'},{label:'برق',value:'لب مرز'},{label:'گاز',value:'کوچه'},{label:'راه دسترسی',value:'آسفالت'}
    ],
    specialist:[
      {label:'عرض گذر',value:'۱۰ متر'},{label:'تعداد بر',value:'۲ نبش'},{label:'پروانه / جواز',value:'ثبت نشده',evidence:'نیاز به استعلام'},{label:'تراکم / سطح اشغال',value:'نامشخص',evidence:'نباید حدس زده شود'}
    ],
    ownership:[
      {label:'نوع سند',value:'شش‌دانگ مشاعی',private:true},{label:'سهم من',value:'۳ از ۶ دانگ',private:true},
      {label:'شریک‌ها',value:'۱ شخص دیگر',private:true},{label:'وضعیت سند',value:'آزاد',private:true}
    ],
    services:['استعلام و مدارک','مالکیت مشترک','بازدید زمین','آگهی فروش']
  },
  teardown:{
    key:'teardown',title:'خانه کلنگی یوسف‌آباد',kind:'ملک کلنگی / زمین دارای بنا',location:'تهران، یوسف‌آباد · دو نبش',relation:'مالک ۶/۶ دانگ',status:'نیاز به تصمیم',icon:'teardown',
    headline:[['۲۸۰','زمین'],['۱۶۰','بنای فعلی'],['۱۲','متر بر'],['۱۳۵۸','سال بنا']],
    base:[
      {label:'طبقات فعلی',value:'۲'},{label:'واحد فعلی',value:'۲'},{label:'سکونت',value:'خالی'},{label:'وضعیت بنا',value:'فرسوده'},
      {label:'عرض گذر اصلی',value:'۱۲ متر'},{label:'عرض گذر فرعی',value:'۸ متر'},{label:'تعداد بر',value:'۲'},{label:'عقب‌نشینی',value:'نیاز به استعلام'}
    ],
    specialist:[
      {label:'قابلیت تخریب',value:'در بررسی'},{label:'کاربری فعلی',value:'مسکونی'},{label:'پایان‌کار قدیم',value:'موجود',evidence:'Document-backed'},{label:'پتانسیل ساخت',value:'نباید بدون استعلام نمایش قطعی شود',evidence:'Claim'}
    ],
    ownership:[
      {label:'نوع سند',value:'تک‌برگ',private:true},{label:'سهم مالکیت',value:'۶ از ۶ دانگ',private:true},
      {label:'وضعیت سند',value:'آزاد',private:true},{label:'وراث / شریک',value:'ندارد',private:true}
    ],
    services:['بررسی مدارک','بازدید سازه','آگهی کلنگی','پیگیری استعلام']
  }
}

function TypeIcon({type}:{type:PropertyType['icon']}) {
  const Icon=type==='villa'?TreePine:type==='commercial'?Store:type==='office'?Building2:type==='land'?MapPin:type==='teardown'?Wrench:Home
  return <Icon size={24}/>
}

function Fields({title,items,privateSection=false}:{title:string,items:DetailField[],privateSection?:boolean}) {
  return <section className={'typed-section '+(privateSection?'private-section':'')}>
    <div className="typed-section-title"><strong>{title}</strong>{privateSection&&<span><KeyRound size={12}/> مالک / نماینده مجاز</span>}</div>
    <div className="typed-field-grid">{items.map(item=><div key={item.label}><span>{item.label}</span><strong>{item.value}</strong>{item.evidence&&<small>{item.evidence}</small>}</div>)}</div>
  </section>
}

export function PropertyTypeDetail({type}:{type:keyof typeof data}) {
  const item=data[type]
  const [viewer,setViewer]=useState<'resident'|'owner'>(type==='apartment'?'resident':'owner')
  const isApartment=type==='apartment'
  return <Phone title={item.title} active="properties">
    <div className="typed-hero">
      <div className="typed-icon"><TypeIcon type={item.icon}/></div>
      <div><small>{item.kind}</small><h2>{item.title}</h2><span><MapPin size={12}/>{item.location}</span></div>
      <Status tone={item.status.includes('فعال')||item.status.includes('اجاره')?'verified':'warning'}>{item.status}</Status>
    </div>
    <div className="typed-relation"><Users size={15}/><span>رابطه شما</span><strong>{item.relation}</strong></div>
    {isApartment&&<div className="viewer-switch"><span>نمای اطلاعات:</span><button className={viewer==='resident'?'active':''} onClick={()=>setViewer('resident')}>مستأجر / ساکن</button><button className={viewer==='owner'?'active':''} onClick={()=>setViewer('owner')}>مالک</button></div>}
    <div className="typed-headline">{item.headline.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <Fields title="مشخصات پایه" items={item.base}/>
    <Fields title="ویژگی‌های تخصصی" items={item.specialist}/>
    {(!isApartment||viewer==='owner')&&<Fields title="مالکیت و اسناد" items={item.ownership} privateSection/>}
    {isApartment&&viewer==='resident'&&<div className="resident-privacy"><ShieldCheck size={16}/><div><strong>نمای ساکن</strong><span>سند مالکیت، سهم دانگ، ارزش‌گذاری و اطلاعات مالی مالک پنهان است.</span></div></div>}
    <section className="typed-section">
      <div className="typed-section-title"><strong>کارهای مرتبط</strong></div>
      <div className="typed-service-grid">{item.services.map((service,index)=><button key={service} onClick={()=>go(index===0?'/property-lease':index===1?'/building':index===2?'/maintenance':'/property-documents')}><span>{service}</span><ChevronLeft size={14}/></button>)}</div>
    </section>
    <div className="typed-actions"><button className="btn secondary" onClick={()=>go('/property-people')}>افراد و نقش‌ها</button><button className="btn primary" onClick={()=>go('/passport')}>Property Passport</button></div>
  </Phone>
}

export function PropertyTypeGallery() {
  const items=(Object.keys(data) as (keyof typeof data)[])
  return <Phone title="انواع ملک" active="properties">
    <div className="type-gallery-intro"><strong>مدل‌های تخصصی Property Record</strong><span>فیلدهای مشترک + ویژگی‌های ویژه هر نوع ملک</span></div>
    <div className="type-gallery-list">{items.map(key=><button key={key} onClick={()=>go('/property/'+key)}><div className="typed-icon small"><TypeIcon type={data[key].icon}/></div><div><strong>{data[key].title}</strong><span>{data[key].kind} · {data[key].relation}</span></div><ChevronLeft size={16}/></button>)}</div>
  </Phone>
}
