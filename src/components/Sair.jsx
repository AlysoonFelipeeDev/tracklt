import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); 

    navigate("/");
  };

  return <ButtonLogout><Logout onClick={handleLogout}>Sair</Logout></ButtonLogout>;
}

const ButtonLogout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px; 
`;

const Logout = styled.button`
    background-color: #ff4d4d;
    width: 50%;
    color: white;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
