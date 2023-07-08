import { useState } from 'react';
import Tabuleiro from "../Tabuleiro";
import './style.css';
import GameDifficultyType from '../../types/GameDifficultyType';
import Placar from '../Placar/Placar';
import GameStatusType from '../../types/GameStatusType';

const gameOptions: Array<GameDifficultyType> = [
    { name: 'Fácil', rows: 9, columns: 9, numberOfBombs: 10 },
    { name: 'Médio', rows: 16, columns: 16, numberOfBombs: 40 },
    { name: 'Difícil', rows: 16, columns: 30, numberOfBombs: 99 }
];

const CampoMinado = () => {

    const [difficulty, setDifficulty] = useState<GameDifficultyType>(gameOptions[0]);
    const [bombsFinded, setBombsFinded] = useState<number>(0);
    const [status, setStatus] = useState<GameStatusType>('PLAYING');

    const reset = () => {
        setDifficulty((difficulty) => ({ ...difficulty }));
        setBombsFinded(0);
        setStatus('PLAYING');
    }

    return (
        <div id="campo-minado">
            <div id="placar-container">
                <Placar 
                    difficulties={ gameOptions }
                    selectedDifficulty={difficulty}
                    setDifficulty={setDifficulty}
                    reset={reset}
                />
            </div>
            { (status === 'WIN' || status === 'LOST') && (
                <div id="feedback" className={ status === 'WIN' ? 'win' : 'lost' }>
                    { status === 'WIN' ? 'Parabéns você ganhou !!!' : 'Oops, Você perdeu :(' }
                </div>
            ) }
            <div id="bombs-summary-container">
                <div id="bombs-summary-contend">
                    Bombas encontradas: { bombsFinded } / { difficulty.numberOfBombs }
                </div>
            </div>
            <Tabuleiro 
                gameOption={difficulty}
                setLost={() => setStatus('LOST')}
                setWin={() => setStatus('WIN')}
                increaseBombsFinded={() => setBombsFinded((bombs) => bombs + 1)}
                decreaseBombsFinded={() => setBombsFinded((bombs) => bombs - 1)}
                isPlaying={ status === 'PLAYING' }
            />
        </div>
    );
}

export default CampoMinado;