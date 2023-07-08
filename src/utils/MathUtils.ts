export const random = (min: number, max: number) => {
    const fator = (max - min) + 1;
    return Math.floor(Math.random() * fator) + min; 
}

export const getRandomNumbersBetween = (min: number, max: number, totalNumbers: number): Array<number> => {
    const numbers: Array<number> = [];

    while((numbers.length) < totalNumbers) {
        const number = random(min, max);
        if(!numbers.includes(number)) {
            numbers.push(number);
        }
    }

    return numbers;
}
