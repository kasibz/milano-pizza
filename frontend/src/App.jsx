import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignup from './pages/EmployeeSignup';
import CustomerLookup from './pages/CustomerLookup';
import EmployeeLogOut from './pages/EmployeeLogOut';
import AddProduct from './pages/AddProduct';
import OrderZipcode from './pages/OrderZipcode';
import EmployeeOrderDetail from './pages/EmployeeOrderDetail';
import OrderDetailZipcode from './pages/OrderDetailZipcode';
import EmployeeOrderDetailView from './pages/EmployeeOrderDetailView';

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
          <Route path="/logout" element = { <EmployeeLogOut/> } />
          <Route path='/addProduct' element = { <AddProduct/> } />
          <Route path='/orderbyzipcode/:zipcodeID' element = { <OrderZipcode/> } />
          <Route path='/employeeorderdetail' element = { <EmployeeOrderDetail/> } />
          <Route path='/employeeorderdetail/orderDetail/:employeeID/:customerOrderID' element = { <EmployeeOrderDetailView/> } />
          <Route path='/orderbyzipcode/:zipcodeID/orderDetail/:customerOrderID' element = { <OrderDetailZipcode/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
