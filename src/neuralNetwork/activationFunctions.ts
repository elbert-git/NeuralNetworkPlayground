export function sigmoid(x: number): number {
    // return ((1 / (1 + Math.exp(-x)))*2)-1;
    return (1 / (1 + Math.exp(-x)))
}

export function tanh(x: number): number {
    return Math.tanh(x);
}

export function relu(x: number): number {
    return Math.max(0, x);
}

export function leakyRelu(x: number, alpha: number = 0.01): number {
    return x >= 0 ? x : alpha * x;
}

export function elu(x: number, alpha: number = 1.0): number {
    return x > 0 ? x : alpha * (Math.exp(x) - 1);
}

export function softmax(arr: number[]): number[] {
    const exps = arr.map(Math.exp);
    const expSum = exps.reduce((acc, val) => acc + val, 0);
    return exps.map((exp) => exp / expSum);
}
