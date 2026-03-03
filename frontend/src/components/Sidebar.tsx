import type { Page } from '../App'

const navItems = [
  { page: 'chat' as Page, icon: '💬', label: 'Chat with Amara' },
  { page: 'about' as Page, icon: 'ℹ️', label: 'About Amara' },
  { page: 'resources' as Page, icon: '📋', label: 'ANC Resources' },
  { page: 'safety' as Page, icon: '🚨', label: 'Safety Guide' },
]

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside style={{
      width: '256px',
      backgroundColor: 'var(--color-sidebar-bg)',
      borderRight: '1px solid var(--color-sidebar-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--color-sidebar-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px'
          }}>🤱</div>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '16px' }}>Amara</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ANC Assistant</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px' }}>
        {navItems.map(({ page, icon, label }) => {
          const isActive = currentPage === page
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 12px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '2px',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? '500' : '400',
                fontSize: '14px',
                transition: 'background-color 0.15s, color 0.15s',
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-sidebar-border)' }}>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
          Informational use only. Not medical advice. In emergencies, contact your health worker.
        </p>
      </div>
    </aside>
  )
}
