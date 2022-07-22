import Home from "./pages/Home/Home";
import { Routes, Route } from 'react-router-dom'
import Security from "./pages/Security/Security";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from 'react-hot-toast';
import ForgotPass from "./components/ForgotPass";
import Settings from "./pages/Settings/Settings";
import ChangePass from "./components/ChangePass";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Toaster
        position="bottom-right"
        reverseOrder={false} />
      <Home />
      <Routes>
        <Route path='/security' element={<Security></Security>}>
          <Route index element={<Login></Login>}></Route>
          <Route path='/security/signup' element={<Signup></Signup>}></Route>
        </Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/change-password" element={<ChangePass />}></Route>
      </Routes>
    </div>
  );
}

export default App;
