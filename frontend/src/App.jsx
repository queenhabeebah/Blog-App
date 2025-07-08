import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={
          <PrivateRoute>
            <Dashboard />

          </PrivateRoute>
          } />
      </Route>
    </Routes>
  );
}

export default App