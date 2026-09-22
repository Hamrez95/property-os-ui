import type { ReactNode } from 'react'
import {
  AlertTriangle, Bell, Building2, CheckCircle2, ChevronLeft, FileCheck2, Home,
  House, Landmark, MessageSquare, Plus, Search, Settings, ShieldCheck, UserRound,
  Users, WalletCards, XCircle
} from 'lucide-react'

export type Tone = 'verified' | 'warning' | 'danger' | 'neutral' | 'info'

export function Brand({ compact=false }: { compact?: boolean }) {
  return <div className="brand">
    <div className="brand-mark"><House size={compact ? 17 : 23} strokeWidth={2.4}/></div>
    <div>
      <div className={compact ? 'brand-name compact' : 'brand-name'}>Property OS</div>
      {!compact && <div className="brand-tagline">Your Property. In a Smarter World.</div>}
    </div>
  </div>
}

export function Status({ tone='neutral', children }: { tone?: Tone, children: ReactNode }) {
  const Icon = tone === 'verified' ? CheckCircle2 : tone === 'warning' ? AlertTriangle : tone === 'danger' ? XCircle : ShieldCheck
  return <span className={'status ' + tone}><Icon size={12}/>{children}</span>
}

export function Phone({ title, children, active='home' }: { title?: string, children: ReactNode, active?: string }) {
  return <div className="phone">
    <div className="phone-status"><span>9:41</span><span>▮▮◒</span></div>
    {title && <div className="mobile-header"><ChevronLeft size={20}/><strong>{title}</strong><span className="header-spacer"/></div>}
    <div className="phone-body">{children}</div>
    <BottomNav active={active}/>
  </div>
}

export function BottomNav({ active='home' }: { active?: string }) {
  const items = [
    ['home', Home, 'خانه'], ['search', Search, 'جستجو'], ['add', Plus, 'افزودن'],
    ['messages', MessageSquare, 'پیام‌ها'], ['account', UserRound, 'حساب']
  ] as const
  return <div className="bottom-nav">
    {items.map(([key, Icon, label]) => <div key={key} className={'nav-item ' + (active===key ? 'active' : '') + (key==='add' ? ' add' : '')}>
      <span className="nav-icon"><Icon size={17}/></span><span>{label}</span>
    </div>)}
  </div>
}

export function PropertyCard({title,meta,status,tone='verified'}:{title:string,meta:string,status:string,tone?:Tone}) {
  return <div className="property-card">
    <div className="property-thumb"><div className="mini-building"><i/><i/><i/></div></div>
    <div className="property-card-copy">
      <strong>{title}</strong><span>{meta}</span><Status tone={tone}>{status}</Status>
    </div>
    <ChevronLeft size={18} className="muted-icon"/>
  </div>
}

export function Stat({icon:Icon,label,value,delta}:{icon:any,label:string,value:string,delta:string}) {
  return <div className="stat"><div className="stat-icon"><Icon size={18}/></div><div><span>{label}</span><strong>{value}</strong><small>{delta}</small></div></div>
}

export function AdminShell({section,children}:{section:string,children:ReactNode}) {
  const nav = [
    [Home,'داشبورد'],[Users,'کاربران'],[Building2,'املاک'],[Landmark,'ساختمان‌ها'],
    [FileCheck2,'قراردادها'],[ShieldCheck,'بازرسی‌ها'],[WalletCards,'پرداخت‌ها'],
    [MessageSquare,'پیام‌ها'],[Settings,'تنظیمات']
  ] as const
  return <div className="admin-shell" dir="rtl">
    <aside className="sidebar">
      <Brand compact/>
      <nav>{nav.map(([Icon,label])=><div key={label} className={section===label?'active':''}><Icon size={17}/><span>{label}</span></div>)}</nav>
    </aside>
    <main className="admin-main">
      <div className="admin-topbar"><div className="global-search"><Search size={15}/><span>جستجو ...</span></div><div className="admin-profile"><Bell size={17}/><div className="avatar small">ح</div><span>مدیر سیستم</span></div></div>
      {children}
    </main>
  </div>
}
