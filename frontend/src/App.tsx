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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-app-bg)' }}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {currentPage === 'chat' && (
          <>
            <ChatWindow messages={messages} isLoading={isLoading} />
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
