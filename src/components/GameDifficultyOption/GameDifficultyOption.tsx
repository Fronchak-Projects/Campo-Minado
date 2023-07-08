import GameDifficultyType from "../../types/GameDifficultyType";
import './style.css';

type Props = {
    difficultyOption: GameDifficultyType;
    isActivate: boolean;
    setDifficulty: (difficultyOption: GameDifficultyType) => void
}

const GameDifficultyOption = ({ difficultyOption, isActivate, setDifficulty }: Props) => {

    const handleClick = () => {
        if(!isActivate) {
            setDifficulty(difficultyOption);
        }
    }

    return (
        <div className={ isActivate ? "game-option-container active-game-option" : "game-option-container" }>
            <div className="game-option-content" onClick={handleClick}>
                <h2>{ difficultyOption.name }</h2>
                <span>Tabuleiro de { difficultyOption.rows }x{ difficultyOption.columns } - Bombas: { difficultyOption.numberOfBombs }</span>
            </div>
        </div>
    );
}

export default GameDifficultyOption;