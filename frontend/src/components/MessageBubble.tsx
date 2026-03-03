import type { Message } from '../types'

interface Props {
  message: Message
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : message.isEmergency
              ? 'bg-red-50 border-2 border-red-400 text-red-900 rounded-bl-md'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
        }`}
      >
        {message.isEmergency && (
          <div className="font-bold text-red-700 mb-1 text-xs uppercase tracking-wide">
            ⚠ Urgent
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  )
}
