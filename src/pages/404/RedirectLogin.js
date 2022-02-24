import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      navigate('/login');
    }
  }, [navigate]);
  return <div></div>;
}
export { RedirectLogin };
