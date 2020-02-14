export default function({colors}, n) {
    return (new Array(n)).fill().map((_, i) => colors[i % colors.length])
}
