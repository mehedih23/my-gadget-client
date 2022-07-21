import Home from "./pages/Home/Home";
import { Routes, Route } from 'react-router-dom'
import Security from "./pages/Security/Security";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from 'react-hot-toast';

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
      </Routes>
    </div>
  );
}

export default App;
