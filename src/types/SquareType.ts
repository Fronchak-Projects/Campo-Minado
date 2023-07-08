import SquareStatus from "./SquareStatus";

type SquareType = {
    row: number;
    column: number;
    numberOfBombs?: number;
    isBomb: boolean;
    status: SquareStatus;
}

export default SquareType;