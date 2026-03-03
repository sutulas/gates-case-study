import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatWindow } from './components/ChatWindow'
import { InputBar } from './components/InputBar'
import { AboutPage } from './pages/AboutPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { SafetyPage } from './pages/SafetyPage'
import { useChat } from './hooks/useChat'

export type Page = 'chat' | 'about' | 'resources' | 'safety'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('chat')
  const { messages, isLoading, sendMessage } = useChat()

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="app-main">
        {currentPage === 'chat' && (
          <>
            <ChatWindow messages={messages} isLoading={isLoading} onSend={sendMessage} />
            <InputBar onSend={sendMessage} disabled={isLoading} />
          </>
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'safety' && <SafetyPage />}
      </main>
    </div>
  )
}

export default App
