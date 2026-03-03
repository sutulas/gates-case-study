import { Heart, AlertTriangle } from 'lucide-react'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isEmergency = message.isEmergency

  if (isEmergency) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '2px solid #DC2626',
          borderRadius: '12px',
          padding: '16px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '8px', color: '#DC2626', fontWeight: '600', fontSize: '14px',
          }}>
            <AlertTriangle size={16} />
            <span>Urgent Safety Information</span>
          </div>
          <p style={{ color: '#7F1D1D', lineHeight: '1.6', margin: 0, fontSize: '15px' }}>
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <div style={{
          maxWidth: '75%',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '18px 18px 4px 18px',
          fontSize: '15px',
          lineHeight: '1.5',
        }}>
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
        backgroundColor: 'var(--color-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: '2px',
      }}>
        <Heart size={16} color="#FFFFFF" fill="#FFFFFF" />
      </div>
      <div style={{
        maxWidth: '75%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: '12px 16px',
        borderRadius: '4px 18px 18px 18px',
        fontSize: '15px',
        lineHeight: '1.6',
        color: 'var(--color-text-primary)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}>
        {message.content}
      </div>
    </div>
  )
}
