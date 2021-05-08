export function* createRange(count = 10, start = 0, step = 1) {
    for (let i = start; i < start + count; i += step) yield i;
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