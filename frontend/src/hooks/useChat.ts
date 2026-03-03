// frontend/src/hooks/useChat.ts
import { useState, useCallback } from 'react'
import type { Message, ChatResponse } from '../types'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const apiBase = import.meta.env.VITE_API_URL ?? ''
        const res = await fetch(`${apiBase}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversation_id: conversationId,
          }),
        })

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }

        const data: ChatResponse = await res.json()
        setConversationId(data.conversation_id)

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          isEmergency: data.is_emergency,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. If this is urgent, please contact your health worker or go to your nearest health facility directly.",
          isEmergency: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [conversationId]
  )

  return { messages, isLoading, sendMessage }
}
