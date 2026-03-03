import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled: boolean
}

export function InputBar({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white px-4 py-3 flex gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about your pregnancy..."
        disabled={disabled}
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="bg-blue-600 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Send
      </button>
    </form>
  )
}
