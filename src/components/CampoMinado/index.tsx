import { useState } from 'react';
import Tabuleiro from "../Tabuleiro";
import './style.css';
import GameDifficultyType from '../../types/GameDifficultyType';
import Placar from '../Placar/Placar';

const gameOptions: Array<GameDifficultyType> = [
    { name: 'Fácil', rows: 9, columns: 9, numberOfBombs: 10 },
    { name: 'Médio', rows: 16, columns: 16, numberOfBombs: 40 },
    { name: 'Difícil', rows: 16, columns: 30, numberOfBombs: 99 }
];

const CampoMinado = () => {

    const [difficulty, setDifficulty] = useState<GameDifficultyType>(gameOptions[0]);
    const [bombsFinded, setBombsFinded] = useState<number>(0);

    console.log('Campo minado renderizou');

    return (
        <div id="campo-minado">
            <div id="placar-container">
                <Placar 
                    difficulties={ gameOptions }
                    selectedDifficulty={difficulty}
                    setDifficulty={setDifficulty}
                />
            </div>
            <Tabuleiro 
                gameOption={difficulty}
            />
        </div>
    );
}

export default CampoMinado;