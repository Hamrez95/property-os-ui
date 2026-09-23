import { createContext, useContext, useState, type ReactNode } from 'react'

export type RoleScopeKey = 'tenant' | 'owner' | 'manager'

export const ROLE_SCOPES: Record<RoleScopeKey, { label: string; role: string; scope: string; place: string }> = {
  tenant: { label: 'در نقش: مستأجر · واحد ۲', role: 'مستأجر', scope: 'واحد ۲', place: 'داخل واحد' },
  owner: { label: 'در نقش: مالک · واحد ۱', role: 'مالک', scope: 'واحد ۱', place: 'داخل ملک' },
  manager: { label: 'در نقش: مدیر ساختمان · ساختمان نیاوران', role: 'مدیر ساختمان', scope: 'مشاعات', place: 'ساختمان نیاوران' },
}

type RoleScopeState = { activeScope: RoleScopeKey; setActiveScope: (key: RoleScopeKey) => void }
const RoleScopeContext = createContext<RoleScopeState | null>(null)

export function RoleScopeProvider({ children }: { children: ReactNode }) {
  const [activeScope, setActiveScope] = useState<RoleScopeKey>('tenant')
  return <RoleScopeContext.Provider value={{ activeScope, setActiveScope }}>{children}</RoleScopeContext.Provider>
}

export function useRoleScope() {
  const value = useContext(RoleScopeContext)
  if (!value) throw new Error('useRoleScope must be used within RoleScopeProvider')
  return { ...value, context: ROLE_SCOPES[value.activeScope] }
}
