export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isEmergency?: boolean
  timestamp: Date
}

export interface ChatResponse {
  response: string
  is_emergency: boolean
  conversation_id: string
  sources: string[]
}
