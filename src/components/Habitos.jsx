import styled from "styled-components";
import Habito from "./Habito";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function Habitos ( {token}){
    const [user] = useContext(UserContext) 

    return ( 
        <TelaHabitos>
            <Header>
                <Topo>
                <h1>TrackIt</h1>
                <img src={user?.image} alt="imagem-usuário" />
                </Topo>
            </Header>
            <LocalHabitos>
                <Habito token={token}/>
            </LocalHabitos>
            <Footer>
                <PaginaHabito to="/habitos">
                <CalendarMonthIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    Hábitos
                </PaginaHabito>
                <PaginaHoje to="/hoje">
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
    height: calc(100vh - 140px);
    background-color: #eeeeee;
    margin-top: 70px;
    overflow-y: auto;
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
    background-color: #52B6FF;
    font-size: 18px;
    color: #FFFFFF;
    text-decoration: none
`;

const PaginaHoje = styled(Link)`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    color: #D4D4D4;
    font-size: 18px;
    text-decoration: none
`;

