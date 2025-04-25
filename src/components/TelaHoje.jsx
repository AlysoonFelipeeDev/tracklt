import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import Checkbox from '@mui/material/Checkbox';
import { Oval } from "react-loader-spinner";


export default function TelaHoje ({token}) {
    const [listaHabitos, setListaHabitos] = useState([])
    const dataFormatada = dayjs().locale('pt-br').format('dddd, DD/MM');
    const dataComMaiuscula = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    const [checkedStates, setCheckedStates] = useState({});
    const [exibirMensagem, setExibirMensagem] = useState (false)
    const [carregando, setCarregando] = useState(false)

    function handleCheckboxToggle(habitoId) {
        const estaMarcado = checkedStates[habitoId];
    
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitoId}/${estaMarcado ? 'uncheck' : 'check'}`;
    
        axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setListaHabitos(res.data);
                setCheckedStates((prev) => ({
                    ...prev,
                    [habitoId]: !prev[habitoId]
                }));
            })
            .catch(err => console.log(err.response.data));
        })
        .catch(err => console.log(err.response.data))
    }
    
    useEffect(() => {
        setCarregando(true)
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => { 
            setListaHabitos(res.data)
            setCarregando(false)
            if(res.data.length === 0){
                setExibirMensagem(true)
            } else {
                setExibirMensagem(false)
            }
            const novoCheckedStates = {};
            res.data.forEach(hab => {
                novoCheckedStates[hab.id] = hab.done;
        });
        setCheckedStates(novoCheckedStates);
        })
        .catch(err => {
            console.log(err.response.data)
            setCarregando(false)
        })
    }, [])

    if(carregando){
        return <Loading><Oval 
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            secondaryColor="black"
            arialLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        /></Loading>
    }
    return (
            <>
                <Habitos>
                        <h2>{dataComMaiuscula}</h2>  
                </Habitos>
                <TelaAdicionarHabito>
                {exibirMensagem ? ( 
                        <SemHabito>
                            Você não tem nenhum hábito cadastrado para hoje!
                        </SemHabito> 
                    ) : ( 
                        listaHabitos.map(hab => (
                        <Habito key={hab.id}>
                            <HabitoCheck>
                                <h1>{hab.name}</h1>
                                <p>
                                Sequencia Atual: {hab.currentSequence} dias <br/>
                                Seu Recorde: {hab.highestSequence} dias
                                </p>
                            </HabitoCheck>
                            <Recordes>
                            <Checkbox
                                checked={!!checkedStates[hab.id]}
                                onChange={() => handleCheckboxToggle(hab.id)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    '& .MuiSvgIcon-root': {
                                    fontSize: "5rem",
                                    },
                                    color: "#EBEBEB",
                                    '&.Mui-checked': {
                                    color: "#8FC549"
                                    }
                                }}
                            />
                            </Recordes>
                        </Habito>
                        ))
                )}
                    
                </TelaAdicionarHabito> 
            </>
    )
}

const Habitos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    color: #666666;
    font-size: 18px;
    font-weight: 400;
    h2 {
        font-size: 23px;
        font-weight: 400;
        color: #126BA5;
    }
`;

const TelaAdicionarHabito = styled.div`
`;

const Habito = styled.div`
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-around;
    margin: 0px 20px 20px 20px;
    border-radius: 5px;
    h1 {
        font-size: 18px;
        color: #757575;
        margin: 20px 0px 0px 20px
    }
    p {
        font-size: 12px;
        color: #757575;
        margin: 10px 0px 20px 20px
    } 
`;

const Recordes = styled.div`
    width: 30%;
    padding-top:  0px;
`;

const HabitoCheck = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

const SemHabito = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
    color: #666666;
    font-size: 18px;
    font-weight: 400;
`;

const Loading = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px
`;

