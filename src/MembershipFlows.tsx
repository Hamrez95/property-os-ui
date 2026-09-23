import { Building2, CheckCircle2, ChevronLeft, ClipboardCheck, FileCheck2, KeyRound, MapPin, QrCode, Search, ShieldCheck, UserRound } from 'lucide-react'
import { Phone, Status } from './ui'
import { go } from './navigation'

const identity = <div className="identity-guard"><ShieldCheck size={16}/><span>کدپستی به‌تنهایی شناسهٔ قطعی واحد نیست؛ تطبیق با نشانی، ساختمان و شمارهٔ واحد انجام می‌شود.</span></div>

export function JoinResidence() {
  return <Phone title="پیوستن به محل سکونت" active="none">
    <section className="membership-hero tenant"><div className="membership-hero-icon"><MapPin/></div><span>RESIDENCE MATCH</span><h2>محل سکونتت را پیدا کنیم</h2><p>اول واحد موجود را پیدا می‌کنیم تا ساختمان یا واحد تکراری ساخته نشود.</p></section>
    <div className="membership-form"><label>کدپستی یا نشانی ساختمان<div className="membership-input"><Search size={16}/><span>۱۲۳۴۵۶۷۸۹۰ · نیاوران، خیابان باهنر</span></div></label><label>شمارهٔ واحد<div className="membership-input"><Building2 size={16}/><span>۲</span></div></label>{identity}</div>
    <button className="btn primary membership-cta" onClick={() => go('/join-residence-match')}>جست‌وجوی ساختمان و واحد</button>
    <button className="membership-secondary" onClick={() => go('/building-invite')}><KeyRound size={15}/>کد دعوت یا QR دارم</button>
  </Phone>
}

export function JoinResidenceMatch() {
  return <Phone title="نتیجهٔ تطبیق" active="none">
    <section className="match-state"><CheckCircle2/><div><span>BUILDING FOUND</span><h2>ساختمان نیاوران پیدا شد</h2><p>نشانی و کدپستی با ساختمان ثبت‌شده هم‌خوانی دارد.</p></div></section>
    <section className="canonical-unit"><div className="unit-visual"><span>۲</span></div><div><small>UNIT · CANONICAL RECORD</small><strong>واحد ۲ · طبقه اول</strong><span>ساختمان نیاوران · تهران</span><Status tone="verified">واحد موجود</Status></div></section>
    <div className="membership-list"><div><UserRound size={16}/><span><strong>درخواست شما</strong><small>مستأجر این واحد هستم</small></span></div><div><FileCheck2 size={16}/><span><strong>بازهٔ سکونت</strong><small>شروع و پایان را پس از تأیید ثبت می‌کنی</small></span></div></div>
    <div className="membership-note">با ارسال درخواست، مدیر ساختمان یا دعوت‌کننده رابطهٔ «مستأجر → واحد ۲» را تأیید می‌کند. تا آن زمان، دسترسی به اطلاعات خصوصی مالکیت نداری.</div>
    <button className="btn primary membership-cta" onClick={() => go('/tenant-request-sent')}>ارسال درخواست سکونت</button>
    <button className="membership-secondary" onClick={() => go('/join-residence')}>واحد دیگری را جست‌وجو کن</button>
  </Phone>
}

export function TenantRequestSent() {
  return <Phone title="درخواست ارسال شد" active="none">
    <section className="membership-success"><CheckCircle2/><span>REQUEST PENDING</span><h2>درخواستت برای واحد ۲ ثبت شد</h2><p>پس از تأیید مدیر یا دعوت‌کننده، قرارداد، شارژ و اعلان‌های مربوط به همین واحد در دسترس قرار می‌گیرد.</p></section>
    <div className="membership-timeline"><div className="done"><i>۱</i><span><strong>تطبیق ساختمان و واحد</strong><small>انجام شد</small></span></div><div className="active"><i>۲</i><span><strong>تأیید رابطهٔ سکونت</strong><small>در انتظار مدیر ساختمان</small></span></div><div><i>۳</i><span><strong>انتخاب بازهٔ زمانی</strong><small>پس از تأیید</small></span></div></div>
    <button className="btn primary membership-cta" onClick={() => go('/home')}>رفتن به خانه</button>
  </Phone>
}

export function ClaimOwnership() {
  return <Phone title="ثبت ادعای مالکیت" active="none">
    <section className="membership-hero owner"><div className="membership-hero-icon"><ClipboardCheck/></div><span>OWNERSHIP CLAIM</span><h2>واحد موجود را Claim کن</h2><p>مالکیت را خودکار قطعی نمی‌کنیم؛ ابتدا ادعا، سپس مدرک و بررسی.</p></section>
    <section className="canonical-unit"><div className="unit-visual owner"><span>۲</span></div><div><small>EXISTING UNIT</small><strong>واحد ۲ · ساختمان نیاوران</strong><span>کدپستی و نشانی تطبیق شده</span><Status tone="info">بدون ساخت واحد جدید</Status></div></section>
    {identity}
    <div className="claim-path"><div><i>۱</i><span>ادعای مالکیت</span></div><div><i>۲</i><span>مدرک</span></div><div><i>۳</i><span>بررسی</span></div></div>
    <button className="btn primary membership-cta" onClick={() => go('/claim-ownership-evidence')}>ادامه و افزودن مدرک</button>
  </Phone>
}

export function ClaimOwnershipEvidence() {
  return <Phone title="مدرک مالکیت" active="none">
    <section className="evidence-head"><ShieldCheck/><div><span>CLAIM → EVIDENCE</span><h2>مدرکت را به Claim وصل کن</h2><p>این مدرک برای بررسی است؛ به‌تنهایی وضعیت رسمی ایجاد نمی‌کند.</p></div></section>
    <div className="evidence-options"><button><FileCheck2/><span><strong>سند یا مبایعه‌نامه</strong><small>تصویر یا PDF</small></span><ChevronLeft/></button><button><QrCode/><span><strong>کد دعوت مدیر / مالک</strong><small>در صورت دریافت</small></span><ChevronLeft/></button></div>
    <div className="claim-result"><span>وضعیت پس از ثبت</span><strong>Evidence-backed claim</strong><p>برای platform یا official verification باید مسیر بررسی جداگانه طی شود.</p></div>
    <button className="btn primary membership-cta" onClick={() => go('/property')}>ثبت نمونه و مشاهدهٔ Property</button>
  </Phone>
}

export function BuildingInvite() {
  return <Phone title="دعوت به ساختمان" active="none">
    <section className="membership-hero manager"><div className="membership-hero-icon"><QrCode/></div><span>MANAGER TOOL</span><h2>دعوت بدون ساخت Duplicate</h2><p>دعوت به ساختمان یا واحد موجود وصل می‌شود، نه به یک رکورد تازه.</p></section>
    <div className="invite-code"><small>JOIN CODE · UNIT 2</small><strong>NIAV-2A8F</strong><span>تا ۴۸ ساعت معتبر</span></div>
    <div className="invite-methods"><button><QrCode/><span>نمایش QR واحد ۲</span></button><button><KeyRound/><span>کپی لینک دعوت</span></button></div>
    <div className="membership-note">دعوت فقط نقطهٔ شروع رابطه است؛ نقش، Scope و بازهٔ زمانی هنگام پذیرش مشخص می‌شوند.</div>
    <button className="btn primary membership-cta" onClick={() => go('/building-units')}>بازگشت به واحدها</button>
  </Phone>
}
