import { Heart, MessageCircle, Info, BookOpen, ShieldAlert } from 'lucide-react'
import type { Page } from '../App'

const navItems = [
  { page: 'chat' as Page, icon: MessageCircle, label: 'Chat' },
  { page: 'about' as Page, icon: Info, label: 'About' },
  { page: 'resources' as Page, icon: BookOpen, label: 'Resources' },
  { page: 'safety' as Page, icon: ShieldAlert, label: 'Safety' },
]

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo — hidden on mobile */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={18} color="#FFFFFF" fill="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '16px' }}>Amara</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ANC Assistant</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map(({ page, icon: Icon, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`nav-btn${currentPage === page ? ' active' : ''}`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Footer — hidden on mobile */}
      <div className="sidebar-footer">
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
          Informational use only. Not medical advice. In emergencies, contact your health worker.
        </p>
      </div>
    </aside>
  )
}
