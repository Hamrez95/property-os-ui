import type { ReactNode } from 'react'
import {
  AlertTriangle, Bell, Building2, CheckCircle2, ChevronLeft, FileCheck2, Home,
  House, Landmark, MessageSquare, Plus, Search, Settings, ShieldCheck, UserRound,
  Users, WalletCards, XCircle
} from 'lucide-react'
import { go, goBack } from './navigation'

export type Tone = 'verified' | 'warning' | 'danger' | 'neutral' | 'info'

export function Brand({ compact=false }: { compact?: boolean }) {
  return <div className="brand" aria-label="Property OS">
    <div className="brand-mark" aria-hidden="true"><House size={compact ? 17 : 23} strokeWidth={2.4}/></div>
    <div>
      <div className={compact ? 'brand-name compact' : 'brand-name'}>Property OS</div>
      {!compact && <div className="brand-tagline">Your Property. In a Smarter World.</div>}
    </div>
  </div>
}

export function Status({ tone='neutral', children }: { tone?: Tone, children: ReactNode }) {
  const Icon = tone === 'verified' ? CheckCircle2 : tone === 'warning' ? AlertTriangle : tone === 'danger' ? XCircle : ShieldCheck
  return <span className={'status ' + tone} aria-label={typeof children === 'string' ? children : undefined}>
    <Icon size={12} aria-hidden="true"/>{children}
  </span>
}

export function Phone({ title, children, active='auto' }: { title?: string, children: ReactNode, active?: string }) {
  return <div className="phone" dir="rtl" lang="fa">
    <div className="phone-status" aria-hidden="true"><span>9:41</span><span>▮▮◒</span></div>
    {title && <header className="mobile-header"><button className="header-back" onClick={() => goBack()} aria-label="بازگشت"><ChevronLeft size={20}/></button><strong>{title}</strong><span className="header-spacer"/></header>}
    <main className="phone-body">{children}</main>
    <BottomNav active={active}/>
  </div>
}

export function BottomNav({ active='auto' }: { active?: string }) {
  const route = window.location.hash.replace(/^#\/app/,'').replace(/^#/,'')
  const inferred = route==='/home'||route==='/city' ? 'home'
    : route.startsWith('/property')||route==='/portfolio'||route==='/spaces'||route==='/space'||route==='/bundle'||route.startsWith('/building')||route==='/charges'||route==='/maintenance'||route==='/trust'||route.startsWith('/inspection')||route==='/verified-passport' ? 'properties'
    : route==='/messages'||route==='/notifications' ? 'messages'
    : route==='/account'||route==='/subscription'||route==='/security'||route==='/support'||route==='/notification-settings' ? 'account'
    : 'home'
  const current = active==='auto' ? inferred : active
  const items = [
    ['home', Home, 'خانه', '/home'], ['properties', Building2, 'املاک', '/portfolio'], ['add', Plus, 'افزودن', '/property-add'],
    ['messages', MessageSquare, 'پیام‌ها', '/messages'], ['account', UserRound, 'حساب', '/account']
  ] as const
  return <nav className="bottom-nav" aria-label="ناوبری اصلی">
    {items.map(([key, Icon, label, path]) => <button
      key={key}
      type="button"
      onClick={() => go(path)}
      aria-current={current===key ? 'page' : undefined}
      aria-label={label}
      className={'nav-item ' + (current===key ? 'active' : '') + (key==='add' ? ' add' : '')}>
      <span className="nav-icon" aria-hidden="true"><Icon size={17}/></span><span>{label}</span>
    </button>)}
  </nav>
}

export function PropertyCard({title,meta,status,tone='verified',route='/property'}:{title:string,meta:string,status:string,tone?:Tone,route?:string}) {
  return <article className="property-card" aria-label={title} role="button" tabIndex={0}
    onClick={() => go(route)}
    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') go(route) }}>
    <div className="property-thumb" aria-hidden="true"><div className="mini-building"><i/><i/><i/></div></div>
    <div className="property-card-copy">
      <strong>{title}</strong><span>{meta}</span><Status tone={tone}>{status}</Status>
    </div>
    <ChevronLeft size={18} className="muted-icon" aria-hidden="true"/>
  </article>
}

export function Stat({icon:Icon,label,value,delta}:{icon:any,label:string,value:string,delta:string}) {
  return <div className="stat" aria-label={`${label}: ${value}, ${delta}`}>
    <div className="stat-icon" aria-hidden="true"><Icon size={18}/></div>
    <div><span>{label}</span><strong>{value}</strong><small>{delta}</small></div>
  </div>
}

export function AdminShell({section,children}:{section:string,children:ReactNode}) {
  const nav = [
    [Home,'داشبورد','/admin'],
    [Users,'کاربران','/admin-users'],
    [Building2,'املاک','/admin-properties'],
    [Landmark,'ساختمان‌ها','/admin-buildings'],
    [FileCheck2,'آگهی‌ها','/admin-listings'],
    [FileCheck2,'معاملات','/admin-deals'],
    [ShieldCheck,'Trust','/admin-trust'],
    [Users,'بازرسان','/admin-inspectors'],
    [WalletCards,'پرداخت‌ها','/admin-payments'],
    [MessageSquare,'پشتیبانی','/admin-support'],
    [FileCheck2,'گزارش‌ها','/admin-reports'],
    [Settings,'Feature Flags','/admin-flags'],
    [ShieldCheck,'امنیت','/admin-security']
  ] as const
  return <div className="admin-shell" dir="rtl" lang="fa">
    <aside className="sidebar">
      <Brand compact/>
      <nav aria-label="ناوبری مدیریت">{nav.map(([Icon,label,path])=><button
        key={label}
        type="button"
        onClick={() => go(path)}
        aria-current={section===label ? 'page' : undefined}
        className={section===label?'active':''}>
        <Icon size={17} aria-hidden="true"/><span>{label}</span>
      </button>)}</nav>
    </aside>
    <main className="admin-main">
      <header className="admin-topbar">
        <div className="global-search" role="search"><Search size={15} aria-hidden="true"/><span>جستجو ...</span></div>
        <button className="admin-profile" onClick={() => go('/admin-security')}><Bell size={17} aria-hidden="true"/><div className="avatar small" aria-hidden="true">ح</div><span>مدیر سیستم</span></button>
      </header>
      {children}
    </main>
  </div>
}
