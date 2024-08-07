import { useSelector } from "react-redux";
import { selectUser } from "@storeVars";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import showToast from "@utils/toastAlert/toaster";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.roleName !== "admin") {
      showToast("error", "You have not the admin role to access this page");
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default AdminProtected;
