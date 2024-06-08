import { BrowserRouter,Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Contect from './Contect';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import AdminHeader from './AdminHeader';
import { Profile } from './Profile';
import { About } from './About';
import Term from './Term';
import { ProductList } from './ProductList';
import { AddProduct } from './AddProduct';
import { UpdateProduct } from './UpdateComponent';
import Orderadd from './orderadd';
import Orderlist from './orderlist';
import { User1 } from './Userlist';
import { Userupdate } from './UserUpdate';
import { AddUser } from './adduser';
import Confi from './confirm_ord';


function App() {
  const isauth = JSON.parse(localStorage.getItem('r'));

  return (
    <>
    <BrowserRouter>
    {isauth === 'admin' ? <AdminHeader /> : <Header />}
    {/* <Header/> */}
    <Routes>
      <Route path='/' index element={<Home/>}/>
      
      <Route path="/products" element={isauth === 'admin' ? <ProductList /> : <Navigate to='/' />} />
      <Route path="/add" element={isauth === 'admin' ? <AddProduct /> : <Navigate to='/' />} />
      <Route path="/update/:id" element={isauth === 'admin' ? <UpdateProduct /> : <Navigate to='/' />} />
      <Route path="/profile" element={isauth ? <Profile /> : <Navigate to='/' />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/about' element={<About />} />
      {/* <Route path='/contact' element={<Contect />} /> */}
      <Route path='/term' element={<Term />} />
      <Route path='/detail/:id' element={<ProductDetail />} />
       <Route path='/buynow' element={<Confi />} />
      {/* <Route path='/payment' element={<Orderpaymant />} />  */}

      <Route path='/login'  element={<Login/>}/>
      <Route path='/signup'  element={<Signup/>}/>
      <Route path='/product'  element={<Products/>}/>
      {/* <Route path='/detail'  element={<ProductDetail/>}/> */}
      <Route path='/cart'  element={<Cart/>}/>


          
            <Route path='/addorder' element={<Orderadd />} />
            <Route path='/order' element={isauth === 'admin' ? <Orderlist /> : <Navigate to='/' />} />

            <Route path='/user' element={isauth === 'admin' ? <User1 /> : <Navigate to='/' />} />
            <Route path='/userupdate/:id' element={isauth === 'admin' ? <Userupdate /> : <Navigate to='/' />} />
            <Route path="/adduser" element={isauth === 'admin' ? <AddUser /> : <Navigate to='/' />} />


    </Routes>
    <Contect/>
    <Footer/>
    </BrowserRouter>
    
   
    
   

    </>
  );
}

export default App;
