import { random } from './MathUtils';

export const getSomeRandomElements = <T> (source: Array<T>, numberOfElements: number): Array<T> => {
    const sourceAux = [...source];
    const elements: Array<T> = [];

    for(let i = 0; i < numberOfElements; i++) {
        const index = random(0, sourceAux.length - 1);
        elements.push(sourceAux[index]);
        sourceAux.splice(index, 1);
    }

    return elements;
}