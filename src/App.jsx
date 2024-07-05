import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/userAuthSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;
