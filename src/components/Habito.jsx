import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AdicionarHabitos from "./AdicionarHabitos";
import { Oval } from "react-loader-spinner";

export default function Habito({ token }) {
    const [addHabito, setAddHabito] = useState(false);
    const [listaHabitos, setListaHabitos] = useState([]);
    const [exibirMensagem, setExibirMensagem] = useState(false);
    const [carregando, setCarregando] = useState(false)
    const [nomeHabito, setNomeHabito] = useState("");
    const [diasSelecionados, setDiasSelecionados] = useState([]);


    const dias = [
        { label: "D", value: 0 },
        { label: "S", value: 1 },
        { label: "T", value: 2 },
        { label: "Q", value: 3 },
        { label: "Q", value: 4 },
        { label: "S", value: 5 },
        { label: "S", value: 6 },
    ];

    function habitoAdicionado() {
        setAddHabito(!addHabito);
    }

    function buscarHabitos() {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setListaHabitos(res.data);
            setCarregando(false)
            setExibirMensagem(res.data.length === 0);
        })
        .catch(err => {
            console.log(err.response.data)
            setCarregando(false)
        });
    }

    useEffect(() => {
        setCarregando(true)
        buscarHabitos();
    }, []);

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
                <h2>Meus hábitos</h2>
                <AdicionarHabito onClick={habitoAdicionado}>+</AdicionarHabito>
            </Habitos>

            {addHabito && (
                <AdicionarHabitos
                    token={token}
                    setAddHabito={setAddHabito}
                    buscarHabitos={buscarHabitos}
                    nomeHabito={nomeHabito}
                    setNomeHabito={setNomeHabito}
                    diasSelecionados={diasSelecionados}
                    setDiasSelecionados={setDiasSelecionados}
                />
            )}

            <TelaAdicionarHabito>
                {exibirMensagem ? (
                    <SemHabito>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </SemHabito>
                ) : (
                    listaHabitos.map(hab => (
                        <HabitosUsuario key={hab.id}>
                            <h1>{hab.name}</h1>
                            <Dias>
                                {dias.map(dia => (
                                    <Dia
                                        key={dia.value}
                                        $selecionado={hab.days.includes(dia.value)}
                                    >
                                        {dia.label}
                                    </Dia>
                                ))}
                            </Dias>
                        </HabitosUsuario>
                    ))
                )}
            </TelaAdicionarHabito>
        </>
    );
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

const AdicionarHabito = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #52B6FF;
    color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
`;

const SemHabito = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    color: #666666;
    font-size: 18px;
    font-weight: 400;
`;

const TelaAdicionarHabito = styled.div``;

const HabitosUsuario = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    margin: 0px 20px 20px 20px;
    border-radius: 5px;

    h1 {
        font-size: 22px;
        color: #757575;
        margin: 20px 0px 0px 20px;
    }
`;

const Dias = styled.div`
    display: flex;
    margin: 10px 20px 20px 20px;
`;

const Dia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D4D4D4;
    background-color: ${props => props.$selecionado ? "#CFCFCF" : "#FFFFFF"};
    color: ${props => props.$selecionado ? "#FFFFFF" : "#DBDBDB"};
    width: 30px;
    height: 30px;
    margin: 1px;
    border-radius: 5px;
`;

const Loading = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px
`;