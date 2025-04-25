import styled from "styled-components";
import TelaHoje from "./TelaHoje";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Sair from "./Sair"

export default function Hoje ( {token}){
    const location = useLocation()
    const [user] = useContext(UserContext) 

    return ( 
        <TelaHabitos>
            <Header>
                <Topo>
                <h1>TrackIt</h1>
                <img src={user?.image} alt="imagem-usuario" />
                </Topo>
            </Header>
            <LocalHabitos>
                <TelaHoje token={token}/>
                <Sair></Sair>
            </LocalHabitos>
            <Footer>
                <PaginaHabito to="/habitos" $ativo={location.pathname === "/habitos"}>
                    <CalendarMonthIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    Hábitos
                </PaginaHabito>
                <PaginaHoje to="/hoje" $ativo={location.pathname === "/hoje"}>
                    <EventAvailableIcon style={{ verticalAlign: 'middle', marginRight: "8px" }} />
                    Hoje
                </PaginaHoje>
            </Footer>
        </TelaHabitos>
    )
}

const TelaHabitos = styled.div`
`;

const Header = styled.header`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1;
    img {
        height: 51px;
        width: 51px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid white;
    }
`;

const Topo = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Playball", cursive;
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    margin: 0 15px;
    padding: 10px
`;

const LocalHabitos = styled.div`
width: 100%;
  min-height: 100vh;
  background-color: #eeeeee;
  padding: 90px 15px 90px 15px; /* espaço pro header e footer */
  overflow-y: auto;
  box-sizing: border-box;
`;

const Footer = styled.footer`
    display: flex;
    width: 100%;
    height: 70px;
    position: fixed; 
    bottom: 0;
    left: 0;
`;

const PaginaHabito = styled(Link)`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.$ativo ? "#FFFFFF" : "#D4D4D4"};
    background-color: ${props => props.$ativo ? "#52B6FF" : "#FFFFFF"};
    font-size: 18px;
    text-decoration: none
`;

const PaginaHoje = styled(Link)`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.$ativo ? "#FFFFFF" : "#D4D4D4"};
    background-color: ${props => props.$ativo ? "#52B6FF" : "#FFFFFF"};
    font-size: 18px;
    text-decoration: none
`;