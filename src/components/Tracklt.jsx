import Habitos from "./Habitos";
import Hoje from "./Hoje";
import CadastroUsuario from "./CadastroUsuario";
import Loggin from "./Loggin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import UserContext from "./contexts/UserContext";



export default function Tracklt (){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    return (
            <UserContext.Provider value={[user, setUser]}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Loggin setToken={setToken}/>}/>
                        <Route path="/cadastro" element={ <CadastroUsuario />}/>
                        <Route path="/habitos" element={ <Habitos token={token}/>}/>
                        <Route path="/hoje" element={ <Hoje token={token}/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
    )
}
