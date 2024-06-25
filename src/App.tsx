
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import './App.css'
// import CreateParticipantForm from './components/CreateParticipantForm'
import ParticipantsCreateUpdatePage from './components/ParticipantsPage'
import ResultsPage from './components/ResultsPage'

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ResultsPage />} />
        <Route path="/addParticipant" element={<ParticipantsCreateUpdatePage />} />
      </Routes>
    </Layout>
  )
}

export default App
