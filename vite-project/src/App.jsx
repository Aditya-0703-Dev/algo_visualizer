import React from 'react'
import { Header } from './components/componentIndex'
import { Outlet } from 'react-router-dom'

function App() {
    return (
        <div className='min-h-screen flex flex-col bg-slate-800'>
        <Header />
          <main className='flex-grow shadow-inner'>
            <Outlet />
          </main>
      </div>
    )
}

export default App
