import { useState, type FormEvent } from 'react'

interface InputBarProps {
  onSend: (text: string) => void
  disabled: boolean
}

export function InputBar({ onSend, disabled }: InputBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div style={{
      borderTop: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-app-bg)',
      padding: '16px 24px 20px',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '8px 8px 8px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e as unknown as FormEvent)
            }
          }}
          placeholder="Ask Amara about your pregnancy care..."
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: '15px',
            lineHeight: '1.5',
            color: 'var(--color-text-primary)',
            backgroundColor: 'transparent',
            padding: '4px 0',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          style={{
            width: '36px', height: '36px', borderRadius: '8px', border: 'none',
            backgroundColor: disabled || !value.trim() ? 'var(--color-border)' : 'var(--color-primary)',
            color: disabled || !value.trim() ? 'var(--color-text-muted)' : '#FFFFFF',
            cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', flexShrink: 0,
            transition: 'background-color 0.15s',
          }}
        >
          ↑
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
        Amara may make mistakes. Always consult your health worker for medical decisions.
      </p>
    </div>
  )
}
