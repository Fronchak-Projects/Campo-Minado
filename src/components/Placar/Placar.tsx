
import GameDifficultyType from '../../types/GameDifficultyType';
import GameDifficultyOption from '../GameDifficultyOption/GameDifficultyOption';
import './style.css';

type Props = {
    difficulties: Array<GameDifficultyType>;
    selectedDifficulty: GameDifficultyType;
    setDifficulty: (difficultyOption: GameDifficultyType) => void;
    reset: () => void;
}

const Placar = ({ difficulties, selectedDifficulty, setDifficulty, reset }: Props) => {

    const handleResetClick = () => {
        reset();
    }

    return (
        <div>
            <div id="game-options">
                { difficulties.map((difficulty) => (
                    <GameDifficultyOption 
                        key={ difficulty.name }
                        difficultyOption={difficulty} 
                        isActivate={ difficulty.name === selectedDifficulty.name }
                        setDifficulty={setDifficulty}
                    />
                ))}
            </div>
            <button id="new-game-button" onClick={handleResetClick}>Reiniciar</button>
        </div>
    );
}

export default Placar;