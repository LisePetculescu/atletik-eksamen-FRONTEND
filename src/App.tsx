
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import './App.css'
import ParticipantsCreateUpdatePage from './components/ParticipantsPage'
import ResultsPage from './components/ResultsPage'
import ParticipantDetails from './components/ParticipantDetails'

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ResultsPage />} />
        <Route path="/addParticipant" element={<ParticipantsCreateUpdatePage />} />
        <Route path="/participants/:participantId" element={<ParticipantDetails />} />
      </Routes>
    </Layout>
  )
}

export default App
