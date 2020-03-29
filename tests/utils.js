export function round(colors, precision = 6) {
    return colors.map(c => c.map(v => Number(v.toPrecision(precision))))
}
