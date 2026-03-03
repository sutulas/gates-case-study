import { useEffect, useRef } from 'react'
import { Heart, ArrowRight } from 'lucide-react'
import type { Message } from '../types'
import { MessageBubble } from './MessageBubble'

const SUGGESTED_PROMPTS = [
  'What happens at my first ANC visit?',
  'How many check-ups do I need during pregnancy?',
  'What vitamins should I take during pregnancy?',
]

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
  onSend: (text: string) => void
}

export function ChatWindow({ messages, isLoading, onSend }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'var(--color-app-bg)',
      padding: '0',
    }}>
      {messages.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            backgroundColor: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px',
          }}>
            <Heart size={32} color="#FFFFFF" fill="#FFFFFF" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Hello, I'm Amara
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: '1.6' }}>
            I'm here to help you with questions about your antenatal care journey. Ask me about your appointments, what to expect, nutrition, or common pregnancy experiences.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '480px' }}>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button key={prompt} onClick={() => onSend(prompt)} style={{
                padding: '12px 16px', borderRadius: '8px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                fontSize: '14px', cursor: 'pointer',
                textAlign: 'left', width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background-color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary-light)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
              }}>
                <span>{prompt}</span>
                <ArrowRight size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 24px 8px' }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 0', color: 'var(--color-text-muted)', fontSize: '14px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'inline-block',
                    animation: `bounce 1.2s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
              <span>Amara is thinking...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
