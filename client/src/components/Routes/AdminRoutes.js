import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Loader from "../Loader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <h1 className="text-center">Redirecting in {count} second...</h1>
      <Loader loading={true} />
    </>
  );
};

export default function AdminRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  console.log(auth.token);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
          {
            headers: {
              Authorization: `${auth?.token}`,
            },
          }
        );
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {}
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
