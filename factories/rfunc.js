const clamp = value => value < 0 ? 0 : value > 1 ? 1 : value

export default function({func}, n) {
    const colors = new Array(n)
    if (n === 1) {
        return [func(0).map(clamp)]
    }
    for (let i = 0; i < n; i += 1) {
        colors[i] = func(i / (n - 1)).map(clamp)
    }
    return colors
}
