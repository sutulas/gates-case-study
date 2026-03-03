import { SafetyBanner } from './components/SafetyBanner'
import { ChatWindow } from './components/ChatWindow'
import { InputBar } from './components/InputBar'
import { useChat } from './hooks/useChat'

function App() {
  const { messages, isLoading, sendMessage } = useChat()

  return (
    <div className="h-screen flex flex-col bg-white max-w-lg mx-auto border-x border-gray-200">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-3 text-center">
        <h1 className="text-lg font-semibold">Amara</h1>
        <p className="text-xs text-blue-100">
          Your antenatal care information assistant
        </p>
      </header>

      <SafetyBanner />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar onSend={sendMessage} disabled={isLoading} />
    </div>
  )
}

export default App
