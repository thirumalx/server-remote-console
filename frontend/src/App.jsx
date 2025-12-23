import { useState } from 'react'
import './App.css'
import Servers from './Servers'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-root">
      <header>
        <h1>Server Remote Console</h1>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('servers')}>Servers</button>
        </nav>
      </header>

      <main>
        {page === 'home' && (
          <section>
            <h2>Welcome</h2>
            <p>Use the Servers page to add and manage SSH target servers.</p>
          </section>
        )}

        {page === 'servers' && <Servers />}
      </main>
    </div>
  )
}

export default App
