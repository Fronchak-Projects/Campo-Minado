import { useState, useEffect, useRef } from 'react';
import SquareType from '../../types/SquareType';
import Square from '../Square';
import { getRandomNumbersBetween } from '../../utils/MathUtils';
import './style.css';
import GameDifficultyType from '../../types/GameDifficultyType';

type Props = {
    gameOption: GameDifficultyType;
    setWin: () => void;
    setLost: () => void;
    increaseBombsFinded: () => void;
    decreaseBombsFinded: () => void;
    isPlaying: boolean;
}

const Tabuleiro = ({ gameOption, setWin, setLost, increaseBombsFinded, decreaseBombsFinded, isPlaying }: Props) => {

    const [squares, setSquares] = useState<Array<Array<SquareType>>>([]);
    const first = useRef<boolean>(true);
    
    useEffect(() => {
        if(!first.current) {
            const bombsIndex = getRandomNumbersBetween(0, gameOption.rows * gameOption.columns - 1, gameOption.numberOfBombs);
            const squaresAux: Array<Array<SquareType>> = [];
            let count = 0;
            for(let i = 0; i < gameOption.rows; i++) {
                const row: Array<SquareType> = [];
                for(let j = 0; j < gameOption.columns; j++) {
                    const isBomb = bombsIndex.includes(count);
                    row.push({
                        isBomb,
                        column: j,
                        row: i,
                        status: 'NON_CLICKED'
                    });
                    count++;
                }
                squaresAux.push(row);
            }
            setSquares(squaresAux);
        }

        return () => {
            first.current = false;
        }
    }, [gameOption]);

    const clickAtNonBomb = (square: SquareType, squaresAux: SquareType[]) => {
        const nearSquares = squaresAux.filter((squareAux) => {
            const rowDistance = Math.abs(square.row - squareAux.row);
            const columnDistance = Math.abs(square.column - squareAux.column);
            if(rowDistance == 0 && columnDistance == 0) return false;
            return (rowDistance < 2 && columnDistance < 2);
        });
        square.status = 'CLICKED';
        const nearBombs = nearSquares.filter((squaresAux) => squaresAux.isBomb).length;
        square.numberOfBombs = nearBombs;
        if(nearBombs == 0) {
            nearSquares.forEach((squareAux) => {
                if(!squareAux.isBomb && squareAux.numberOfBombs === undefined) {
                    clickAtNonBomb(squareAux, squaresAux);
                }
            })
        }
    }

    const handleClickAt = (row: number, column: number) => {
        const squaresAux = [...squares];

        const square = squaresAux[row][column];
        if(square.isBomb) {
            squaresAux.forEach((squareRow) => {
                squareRow.forEach((squareAux) => {
                    if(squareAux.isBomb) {
                        squareAux.status = 'BOMBED';
                    }
                })
            })
            setLost();
            setSquares([...squaresAux]);
        }
        else {
            clickAtNonBomb(square, squaresAux.flat());
            setSquares([...squaresAux]);
            checkIfWin();
        }
    }

    const checkIfWin = () => {
        const allNonBombosAreClicked = squares.flat()
            .filter((square) => !square.isBomb)
            .every((square) => square.status === 'CLICKED');
        if(allNonBombosAreClicked) {
            setWin();
        }
    }

    const handleRigthClickAt = (row: number, column: number) => {
        const squaresAux = [...squares];

        const square = squaresAux[row][column];
        if(square.status === 'FLAG') {
            square.status = 'NON_CLICKED';
            decreaseBombsFinded();
        }
        else if(square.status === 'NON_CLICKED') {
            square.status = 'FLAG';
            increaseBombsFinded();
        }
        setSquares([...squaresAux]);
    }

    const tabuleiroRows = () => {
        return squares.map((row, i) => {
            return (
                <div key={i} className="tabuleiro-row">
                    { row.map((square, j) => {
                        return (
                            <Square 
                                key={`${i}-${j}`} 
                                square={square} 
                                clickAt={handleClickAt} 
                                rightClickAt={handleRigthClickAt}    
                                isPlaying={ isPlaying }
                            />
                        )
                    }) }
                </div>

            )
        });
    }

    return (
        <div>
            { tabuleiroRows() }
        </div>
    );
}

export default Tabuleiro;