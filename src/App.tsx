
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import './App.css'
// import CreateParticipantForm from './components/CreateParticipantForm'
import ParticipantsCreateUpdatePage from './components/ParticipantsCreateUpdatePage'

function App() {
  

  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/addParticipant" element={<ParticipantsCreateUpdatePage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  )
}

export default App
