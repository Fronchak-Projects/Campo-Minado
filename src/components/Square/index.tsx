
import SquareType from '../../types/SquareType';
import './style.css';

type Props = {
    square: SquareType,
    clickAt: (row: number, column: number) => void,
    rightClickAt: (row: number, column: number) => void,
    isPlaying: boolean
}

const Square = ({ square, clickAt, rightClickAt, isPlaying }: Props) => {
    
    const handleClick = () => {
        if(square.status === 'NON_CLICKED' && isPlaying) {
            clickAt(square.row, square.column);
        }
    }

    const handleRigthClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if((square.status === 'NON_CLICKED' || square.status === 'FLAG') && isPlaying) {
            rightClickAt(square.row, square.column);
        }
    }


    const squareContend = () => {
        if (square.status === 'FLAG') {
            return <img src="/imgs/flag.png" />
        }
        else if (square.status === 'BOMBED') {
            return <img src="/imgs/bomb.jpg" />
        }
        else if (square.status === 'CLICKED') {
            return (
                <div className="clicked">
                    { square.numberOfBombs && (square.numberOfBombs !== 0) ? square.numberOfBombs : '' }
                </div>
            )
        }
        else {
            return <div className={`non-clicked ${ !isPlaying ? 'not-playing' : '' }`}></div>
        }
    }

    return (
        <div className={`square`} 
            onClick={() => handleClick()} 
            onContextMenu={(e) => handleRigthClick(e)}
        >
            { squareContend() }
        </div>
    );
}

export default Square;