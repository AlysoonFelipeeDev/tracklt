import ImgLogo from "../images/tracklt.png"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import {Tooltip} from 'react-tooltip'; 
import HelpIcon from '@mui/icons-material/Help';


export default function CadastroUsuario (){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] =useState(false)

    function cadastroUsuario (e) {
        e.preventDefault()
        setLoading(true)

        const dados = {
            email,
            name,
            image,
            password
        }

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", dados)
        .then(res => {
            navigate("/")
            setLoading(false)
        })
        .catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
            setLoading(false)
    })
    }

    return (
        <TelaCadastro>
            <Cadastro>
                <Logo>
                    <img src={ImgLogo} alt="logo-tracklt"></img>
                </Logo>
                <Cadastrar onSubmit={cadastroUsuario}>
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
                    <input 
                    type="text"
                    placeholder=" nome" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={loading}
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", width: "350px" }}>
                        <input
                        type="text"
                        placeholder=" foto"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        disabled={loading}
                        style ={{width: "298px", marginLeft:"28px"}}
                        />
                        <HelpIcon
                            data-tooltip-id="tooltip-foto"
                            style={{ cursor: 'pointer', color: '#999' }}
                        />
                        <Tooltip id="tooltip-foto">
                            <div style={{ fontSize: '14px', lineHeight: '18px', maxWidth: '280px' }}>
                                <p>Site de teste...</p> <br />
                                <p>Insira uma URL válida para sua foto:</p><br/>
                                <p>Botão direito do mouse (computador) ou segurar com o dedo (celular) na imagem;</p><br />
                                <p>Copiar endereço da imagem e colar no formulario de cadastro (foto);</p><br />
                                <p>Exemplo: https://imagem.com/foto.jpg</p>
                            </div>
                        </Tooltip>
                    </div>
                    <FinalizarCadastro disabled={loading}>
                        {!loading ? "Cadastrar" : <Oval height="30" color="#ffffff" secondaryColor="#AEE4FF" />}
                    </FinalizarCadastro>
                </Cadastrar>
                <LogarSe to="/">
                    <p>Já tem uma conta? Faça loggin!</p>
                </LogarSe>
            </Cadastro>
        </TelaCadastro>
    )
}

const TelaCadastro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Cadastro = styled.div`
`;

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


const Cadastrar = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    input{
        font-family: "Lexend Deca", sans-serif;
        font-size: 17px;
        font-weight: 400;
        width: 98%;
        height: 45px;
        margin-top: 4px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        &:disabled{
            opacity: 0.5;
        }
    }
`;

const FinalizarCadastro = styled.button`
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

const LogarSe = styled(Link)`
        text-decoration: none;
    p {
        margin-top: 25px;
        color: #52B6FF;
        text-align: center;
    }
`;