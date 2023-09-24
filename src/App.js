import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import './App.css';
import Login from './pages/Login';
import Register from './pages/Regester';
import Home from './pages/Home';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      console.log("ins")
      return (
        <Navigate to="/login"/>
      )
    }
    return children;
  }

  return (
    <div className="App flex">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index 
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
            <Route path="login" element={<Login/>}/>
            <Route path="Register" element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
