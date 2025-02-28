import Dashboard from "./pages/dashboard"
import { SignIn } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


function App() {
  return <BrowserRouter>

    <Routes>
    <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup/> } />
      <Route path="/signin" element={<SignIn/> } />
      <Route path="/dashboard" element={<Dashboard/> } />
    </Routes>

</BrowserRouter>
}

export default App