import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Modal from "./pages/Modal";
// import PrivateRoute from "./components/PrivateRoute";
import { MonthProvider } from "./context/MonthContext";

function App() {
  // const isAuthenticated = localStorage.getItem("token");
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/");
  // }

  return (
    <MonthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="app" element={<HomePage />} />
          {/* {isAuthenticated ? (
            <Route path="app" element={<HomePage />} />
          ) : // <Navigate path="/" replace />
          null} */}
          {/* <PrivateRoute path="app" element={<HomePage />} /> */}
          <Route path="modal" element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </MonthProvider>
  );
}

export default App;
