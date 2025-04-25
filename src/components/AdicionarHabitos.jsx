import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function AdicionarHabitos({ 
    token, 
    setAddHabito, 
    buscarHabitos, 
    nomeHabito,
    setNomeHabito,
    diasSelecionados,
    setDiasSelecionados }) {
    
    const [loading, setLoading] = useState(false)

    const dias = [
        { label: "D", value: 0 },
        { label: "S", value: 1 },
        { label: "T", value: 2 },
        { label: "Q", value: 3 },
        { label: "Q", value: 4 },
        { label: "S", value: 5 },
        { label: "S", value: 6 },
    ];

    function selecionaDia(value) {
        if (diasSelecionados.includes(value)) {
            setDiasSelecionados(diasSelecionados.filter(dia => dia !== value));
        } else {
            setDiasSelecionados([...diasSelecionados, value]);
        }
    }

    function cancelar() {
        setAddHabito(false);
    }

    function adicionarHabitos(e) {
        e.preventDefault();
        if (diasSelecionados.length === 0) {
            alert("Selecione os dias da semana!");
            return;
        }
        
        setLoading(true)
        const habito = { name: nomeHabito, days: diasSelecionados };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habito, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("Habito Adicionado", res.data);
            setNomeHabito("");
            setDiasSelecionados([]);
            setAddHabito(false);
            buscarHabitos();
            setLoading(false) 
        })
        .catch(err => {
            console.log(err.response.data)
            setLoading(false)
        });
    }

    return (
        <TelaAdicionarHabito>
            <NomeHabito onSubmit={adicionarHabitos}>
                <input
                    type="text"
                    placeholder=" nome do hábito"
                    required
                    value={nomeHabito}
                    onChange={e => setNomeHabito(e.target.value)}
                    disabled={loading}
                />
                <SalvarCancelar>
                    <Cancelar type="button" onClick={cancelar}>Cancelar</Cancelar>
                    <Salvar type="submit" disabled={loading}>
                        {!loading ? "Salvar" : <Oval height="30" color="#ffffff" secondaryColor="#AEE4FF" />}
                    </Salvar>
                </SalvarCancelar>
            </NomeHabito>

            <DiasSemana>
                {dias.map(dia => (
                    <Dia
                        type="button"
                        key={dia.value}
                        onClick={() => selecionaDia(dia.value)}
                        $selecionado={diasSelecionados.includes(dia.value)}
                        disabled={loading}
                    >
                        {dia.label}
                    </Dia>
                ))}
            </DiasSemana>
        </TelaAdicionarHabito>
    );
}

const TelaAdicionarHabito = styled.div`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    margin: 0px 20px 20px 20px;
    border-radius: 5px;
    position: relative;
    height: 180px;
`;

const NomeHabito = styled.form`
    display: flex;
    width: 90%;
    margin: 0px 15px;
    input {
        margin-top: 10px;
        width: 100%;
        padding: 8px;
        font-family: "Lexend Deca", sans-serif;
        font-size: 16px;
        font-weight: 400;
        &:disabled {
            opacity: 0.5;
        }
    }
`;

const DiasSemana = styled.div`
    display: flex;
    margin: 8px 0 0px 15px;
`;

const Dia = styled.button`
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
    font-size: 16px;
    font-weight: 700;
`;

const SalvarCancelar = styled.div`
    display: flex;
    width: 200px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    bottom: 10px;
    margin-right: 20px
`;

const Cancelar = styled.button`
    background-color: #FFFFFF;
    color: #52B6FF;
    width: 50%;
    padding: 10px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    border: none
`;

const Salvar = styled.button`
    font-size: 16px;
    font-weight: 400;
    width: 50%;
    cursor: pointer;
    background-color: #52B6FF;
    color: white;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
