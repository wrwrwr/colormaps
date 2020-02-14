export default function({knots}, n) {
    if (n === 0) {
        return []
    }
    if (n === 1) {
        return [knots[0][0]]
    }
    const colors = new Array(n)
    for (let k = 0; k < knots.length - 1; k += 1) {
        const [[r1, g1, b1], x1 = k / (knots.length - 1)] = knots[k]
        const [[r2, g2, b2], x2 = (k + 1) / (knots.length - 1)] = knots[k + 1]
        const dx = x2 - x1
        if (dx === 0) {
            continue
        }
        const ar = (r2 - r1) / dx
        const ag = (g2 - g1) / dx
        const ab = (b2 - b1) / dx
        const i1 = Math.ceil(x1 * (n - 1))
        const i2 = Math.ceil(x2 * (n - 1))
        for (let i = i1; i <= i2; i += 1) {
            const sx = i / (n - 1) - x1
            colors[i] = [r1 + ar * sx, g1 + ag * sx, b1 + ab * sx]
        }
    }
    return colors
}
