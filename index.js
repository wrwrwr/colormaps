export function colors(n, [factory, defaults], args, format) {
    const colors = factory({...defaults, ...args}, n)
    switch (format) {
        case 'css':
            // https://www.w3.org/TR/css-color-3/#rgb-color
            return colors.map(
                ([r, g, b]) => `rgb(${r * 100}%, ${g * 100}%, ${b * 100}%)`
            )
        case 'term':
            // https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
            const bt = v => Math.round(v * 255)
            return colors.map(
                ([r, g, b]) => `\\033[38;2;${bt(r)};${bt(g)};${bt(b)}m`
            )
        default:
            return colors
    }
}
