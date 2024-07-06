import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default Protected;
