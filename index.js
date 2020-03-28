export function colors(n, [factory, defaults], args, format = 'css') {
    let trans
    switch (format) {
        case 'css':
            // https://www.w3.org/TR/css-color-3/#rgb-color
            trans = ([r, g, b]) => `rgb(${r * 100}%, ${g * 100}%, ${b * 100}%)`
            break
        case 'term':
            // https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
            const bt = v => Math.round(v * 255)
            trans = ([r, g, b]) => `\\033[38;2;${bt(r)};${bt(g)};${bt(b)}m`
            break
    }
    return factory({...defaults, ...args}, n).map(trans)
}
