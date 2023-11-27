import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignup from './pages/EmployeeSignup';
import EmployeeLogOut from './pages/EmployeeLogOut';
import AddProduct from './pages/AddProduct';
import OrderZipcode from './pages/OrderZipcode';
import EmployeeOrderDetail from './pages/EmployeeOrderDetail';
import OrderDetailZipcode from './pages/OrderDetailZipcode';
import CustomerLogOut from './pages/CustomerLogOut';
import EmployeeOrderDetailView from './pages/EmployeeOrderDetailView';
import CustomerLookup from './pages/CustomerLookup';
import EditEmployee from './pages/EditEmployee';
import ProductPriceHistory from './pages/ProductPriceHistory';
import EditProductPage from './pages/EditProductPage';
import "./App.css"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage/>} />
          <Route path="/pos" element = {<POSPage/>} />
          <Route path="/login" element = { <EmployeeLogin/> } />
          <Route path="/signup" element = { <EmployeeSignup/> } />
          <Route path="/logout" element = { <EmployeeLogOut/> } />
          <Route path='/addProduct' element = { <AddProduct/> } />
          <Route path="/customerlookup" element = {<CustomerLookup/>}/>
          <Route path='/orderbyzipcode/:zipcodeID' element = { <OrderZipcode/> } />
          <Route path='/employeeorderdetail' element = { <EmployeeOrderDetail/> } />
          <Route path='/employeeorderdetail/orderDetail/:employeeID/:customerOrderID' element = { <EmployeeOrderDetailView/> } />
          <Route path='/orderbyzipcode/:zipcodeID/orderDetail/:customerOrderID' element = { <OrderDetailZipcode/> } />
          <Route path='/pricehistory/:productID' element = { <ProductPriceHistory/> } />
          <Route path='/editproduct/:productID' element = { <EditProductPage/> } />
          <Route path='/customerlogout' element = { <CustomerLogOut/> } />
          <Route path='/editemployee' element = { <EditEmployee/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
