import rfunc from './rfunc.js'

export default function({gamma, start, rotations, hue, vec1, vec2}, n) {
    return rfunc({func: x => {
        const xg = x ** gamma
        const amp = hue * xg * (1 - xg) / 2
        const phi = 2 * Math.PI * (start / 3 + rotations * x)
        return [
            xg + amp * (vec1[0] * Math.cos(phi) + vec2[0] * Math.sin(phi)),
            xg + amp * (vec1[1] * Math.cos(phi) + vec2[1] * Math.sin(phi)),
            xg + amp * (vec1[2] * Math.cos(phi) + vec2[2] * Math.sin(phi))
        ]
    }}, n)
}
