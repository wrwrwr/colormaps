export function round(colors) {
    return colors.map(c => c.map(v => Number(v.toPrecision(6))))
}
