import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignup from './pages/EmployeeSignup';
import CustomerLookup from './pages/CustomerLookup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage/>} />
          <Route path="/pos" element = {<POSPage/>} />
          <Route path="/login" element = { <EmployeeLogin/> } />
          <Route path="/signup" element = { <EmployeeSignup/> } />
          <Route path="/customerlookup" element = { <CustomerLookup /> }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
