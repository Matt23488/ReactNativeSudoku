export function createRange(count = 10, start = 0, step = 1) {
    const result: number[] = [];
    for (let i = start; i < start + count; i += step) result.push(i);
    return result;
}

export function lerp(from: number, to: number, val: number) {
    return from + (to - from) * val;
}

export function adjustRange(oldFrom: number, oldTo: number, newFrom: number, newTo: number, val: number) {
    const oldRange = oldTo - oldFrom;
    const newRange = newTo - newFrom;
    const normalizedVal = val - oldFrom;
    const percentage = normalizedVal / oldRange;
    return percentage * newRange + newFrom;
}

export function flatten2DArray<T>(arr: T[][]): T[] {
    return ([] as T[]).concat.apply<T[], T[][], T[]>([], arr);
}

export function replaceCopy<T>(arr: T[][], i: number, j: number, value: T) {
    const copy = arr.map(inner => inner.map(obj => obj));
    copy[i][j] = value;
    return copy;
}