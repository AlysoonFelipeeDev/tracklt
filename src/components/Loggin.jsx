import styled from "styled-components";
import ImgLogo from "../images/tracklt.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import UserContext from "./contexts/UserContext";

export default function Loggin({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
            navigate("/hoje");  
        }
    }, [setToken, setUser, navigate]);

    function entrar(e) {
        e.preventDefault();
        setLoading(true);

        const dados = {
            email,
            password
        };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", dados)
            .then(res => {
                const userData = res.data;
                setUser(userData);
                setToken(userData.token);
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));  
                navigate("/hoje");  
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response.data);
                alert(err.response.data.message);
                setLoading(false);
            });
    }

    return (
        <TelaLoggin>
            <DadosUsuario>
                <Logo>
                    <img src={ImgLogo} alt="logo-tracklt" />
                </Logo>
                <DadosCadastrados onSubmit={entrar}>
                    <input
                        type="text"
                        placeholder=" email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder=" senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <Logar disabled={loading}>
                        {!loading ? "Entrar" : <Oval height="30" color="#ffffff" secondaryColor="#AEE4FF" />}
                    </Logar>
                </DadosCadastrados>
                <CadastrarSe to="/cadastro">
                    <p>Não tem uma conta? Cadastre-se!</p>
                </CadastrarSe>
            </DadosUsuario>
        </TelaLoggin>
    );
}

const TelaLoggin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const DadosUsuario = styled.div``;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
    img {
        width: 180px;
    }
`;

const DadosCadastrados = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    input {
        font-family: "Lexend Deca", sans-serif;
        font-size: 17px;
        font-weight: 400;
        width: 98%;
        height: 45px;
        margin: 4px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        &:disabled {
            opacity: 0.5;
        }
    }
`;

const Logar = styled.button`
    background-color: #52B6FF;
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    width: 100%;
    height: 45px;
    margin: 4px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const CadastrarSe = styled(Link)`
    text-decoration: none;
    p {
        margin-top: 25px;
        color: #52B6FF;
        text-align: center;
    }
`;


