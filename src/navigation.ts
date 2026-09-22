export type PrototypeGroup = 'mobile' | 'inspector' | 'admin'

export type PrototypeScreen = {
  path: string
  label: string
  group: PrototypeGroup
}

export const PROTOTYPE_SCREENS: PrototypeScreen[] = [
  { path: '/splash', label: 'Splash', group: 'mobile' },
  { path: '/login', label: 'ورود / ثبت‌نام', group: 'mobile' },
  { path: '/otp', label: 'کد تأیید', group: 'mobile' },
  { path: '/home', label: 'خانه', group: 'mobile' },
  { path: '/city', label: 'شهر من', group: 'mobile' },
  { path: '/portfolio', label: 'سبد املاک', group: 'mobile' },
  { path: '/property', label: 'جزئیات آپارتمان', group: 'mobile' },
  { path: '/property-types', label: 'انواع Property Record', group: 'mobile' },
  { path: '/property/apartment', label: 'آپارتمان — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/villa', label: 'ویلا — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/commercial', label: 'تجاری — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/office', label: 'اداری — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/land', label: 'زمین — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/agricultural', label: 'باغ / کشاورزی — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/industrial', label: 'صنعتی / سوله — مشخصات تخصصی', group: 'mobile' },
  { path: '/property/teardown', label: 'کلنگی — مشخصات تخصصی', group: 'mobile' },
  { path: '/passport', label: 'پاسپورت ملک', group: 'mobile' },
  { path: '/property-timeline', label: 'تاریخچه ملک', group: 'mobile' },
  { path: '/property-add', label: 'افزودن / ویرایش ملک', group: 'mobile' },
  { path: '/property-documents', label: 'اسناد ملک', group: 'mobile' },
  { path: '/property-people', label: 'افراد و نقش‌ها', group: 'mobile' },
  { path: '/property-finance', label: 'مالی ملک', group: 'mobile' },
  { path: '/property-lease', label: 'قرارداد اجاره', group: 'mobile' },
  { path: '/spaces', label: 'فضاها و متعلقات', group: 'mobile' },
  { path: '/space', label: 'جزئیات پارکینگ', group: 'mobile' },
  { path: '/bundle', label: 'ساخت Bundle', group: 'mobile' },
  { path: '/space-lease', label: 'اجاره فضای مستقل', group: 'mobile' },
  { path: '/building', label: 'داشبورد ساختمان', group: 'mobile' },
  { path: '/building-units', label: 'واحدها و ساکنین', group: 'mobile' },
  { path: '/charges', label: 'شارژ و بدهی', group: 'mobile' },
  { path: '/building-expenses', label: 'هزینه‌های ساختمان', group: 'mobile' },
  { path: '/building-announcements', label: 'اعلان‌های ساختمان', group: 'mobile' },
  { path: '/maintenance', label: 'درخواست تعمیرات', group: 'mobile' },
  { path: '/trust', label: 'مرکز اعتماد', group: 'mobile' },
  { path: '/claim-evidence', label: 'مدرک ادعا', group: 'mobile' },
  { path: '/inspection', label: 'درخواست بازرسی', group: 'mobile' },
  { path: '/inspection-status', label: 'وضعیت بازرسی', group: 'mobile' },
  { path: '/verified-passport', label: 'پاسپورت تأییدشده', group: 'mobile' },
  { path: '/marketplace', label: 'بازار ملک', group: 'mobile' },
  { path: '/listing', label: 'جزئیات آگهی', group: 'mobile' },
  { path: '/visit', label: 'رزرو بازدید', group: 'mobile' },
  { path: '/offer', label: 'ثبت پیشنهاد', group: 'mobile' },
  { path: '/deal', label: 'خلاصه معامله', group: 'mobile' },
  { path: '/transaction', label: 'پیگیری معامله', group: 'mobile' },
  { path: '/publish-listing', label: 'انتشار آگهی', group: 'mobile' },
  { path: '/negotiation', label: 'مذاکره پیشنهاد', group: 'mobile' },
  { path: '/contract-review', label: 'مرور قرارداد', group: 'mobile' },
  { path: '/secure-payment', label: 'پرداخت امن', group: 'mobile' },
  { path: '/notifications', label: 'اعلان‌ها', group: 'mobile' },
  { path: '/messages', label: 'پیام‌ها', group: 'mobile' },
  { path: '/account', label: 'حساب من', group: 'mobile' },
  { path: '/subscription', label: 'اشتراک', group: 'mobile' },
  { path: '/security', label: 'امنیت و دستگاه‌ها', group: 'mobile' },
  { path: '/support', label: 'پشتیبانی', group: 'mobile' },
  { path: '/notification-settings', label: 'تنظیمات اعلان', group: 'mobile' },

  { path: '/inspector-login', label: 'ورود بازرس', group: 'inspector' },
  { path: '/inspector', label: 'ماموریت‌ها', group: 'inspector' },
  { path: '/inspector-assignment', label: 'جزئیات ماموریت', group: 'inspector' },
  { path: '/inspector-checklist', label: 'چک‌لیست بازرسی', group: 'inspector' },
  { path: '/inspector-spaces', label: 'تأیید فضاها', group: 'inspector' },
  { path: '/inspector-evidence', label: 'مدارک و شواهد', group: 'inspector' },
  { path: '/inspector-media', label: 'ثبت رسانه', group: 'inspector' },
  { path: '/inspector-discrepancy', label: 'ثبت مغایرت', group: 'inspector' },
  { path: '/inspector-submit', label: 'ارسال گزارش', group: 'inspector' },
  { path: '/inspector-earnings', label: 'کیفیت و درآمد', group: 'inspector' },

  { path: '/admin', label: 'Admin Dashboard', group: 'admin' },
  { path: '/admin-users', label: 'Users Management', group: 'admin' },
  { path: '/admin-properties', label: 'Property Management', group: 'admin' },
  { path: '/admin-buildings', label: 'Buildings', group: 'admin' },
  { path: '/admin-listings', label: 'Listings', group: 'admin' },
  { path: '/admin-deals', label: 'Deals', group: 'admin' },
  { path: '/admin-trust', label: 'Trust Queue', group: 'admin' },
  { path: '/admin-inspectors', label: 'Inspectors', group: 'admin' },
  { path: '/admin-payments', label: 'Payments', group: 'admin' },
  { path: '/admin-support', label: 'Support', group: 'admin' },
  { path: '/admin-reports', label: 'Reports & Analytics', group: 'admin' },
  { path: '/admin-flags', label: 'Feature Flags', group: 'admin' },
  { path: '/admin-security', label: 'Security & Audit', group: 'admin' },
]

export function appPath(path: string) {
  const clean = path.startsWith('/') ? path : '/' + path
  return '#/app' + clean
}

export function go(path: string) {
  window.location.hash = appPath(path).slice(1)
}

export function goDesignBoard() {
  window.location.hash = '/design'
}

export function goBack(fallback = '/home') {
  if (window.history.length > 1) window.history.back()
  else go(fallback)
}

export function normalizeRoute(hash: string) {
  const raw = hash.replace(/^#/, '') || '/guide'
  if (raw === '/app' || raw === '/app/') return '/home'
  return raw.startsWith('/app/') ? raw.slice(4) : raw
}

export function isPrototypeRoute(hash: string) {
  return hash.replace(/^#/, '').startsWith('/app')
}

export function screenIndex(path: string) {
  return PROTOTYPE_SCREENS.findIndex(screen => screen.path === path)
}

export function adjacentScreen(path: string, direction: -1 | 1) {
  const index = screenIndex(path)
  if (index < 0) return PROTOTYPE_SCREENS[0]
  return PROTOTYPE_SCREENS[(index + direction + PROTOTYPE_SCREENS.length) % PROTOTYPE_SCREENS.length]
}
