export function cssmap(items, [factory, defaults, output = 'rgb'], args) {
    let css
    switch (output) {
        case 'rgb':
            css = c => `rgb(${c[0] * 100}%, ${c[1] * 100}%, ${c[2] * 100}%)`
            break
        case 'hsl':
            css = c => `hsl(${c[0] * 360}, ${c[1] * 100}%, ${c[2] * 100}%)`
            break
        default:
            // Assume the map returns CSS-ready colors.
            css = c => c
    }
    const map = new Map()
    const colors = factory({...defaults, ...args}, items.length)
    for (let i = 0; i < items.length; i += 1) {
        map.set(items[i], css(colors[i]))
    }
    return map
}
