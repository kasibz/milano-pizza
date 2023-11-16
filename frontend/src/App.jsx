import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignup from './pages/EmployeeSignup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage/>} />
          <Route path="/pos" element = {<POSPage/>} />
          <Route path="/login" element = { <EmployeeLogin/> } />
          <Route path="/signup" element = { <EmployeeSignup/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
