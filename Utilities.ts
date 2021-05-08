export function* createRange(count = 10, start = 0, step = 1) {
    for (let i = start; i < start + count; i += step) yield i;
}