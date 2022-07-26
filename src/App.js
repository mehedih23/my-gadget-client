import Home from "./pages/Home/Home";
import { Routes, Route } from 'react-router-dom'
import Security from "./pages/Security/Security";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from 'react-hot-toast';
import ForgotPass from "./components/ForgotPass";
import Settings from "./pages/Settings/Settings";
import ChangePass from "./components/ChangePass";
import Profile from "./pages/Profile/Profile";
import AddItem from "./pages/AddItem/AddItem";
import Products from "./pages/Product/Products";
import UpdateItem from "./components/UpdateItem";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Toaster
        position="bottom-right"
        reverseOrder={false} />
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/security' element={<Security></Security>}>
          <Route index element={<Login></Login>}></Route>
          <Route path='/security/signup' element={<Signup></Signup>}></Route>
        </Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/change-password" element={<ChangePass />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/additem" element={<AddItem />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<UpdateItem />}></Route>
      </Routes>
    </div>
  );
}

export default App;
