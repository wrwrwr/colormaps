import rfunc from './rfunc.js'

export default function({f, ra, rx, ry, ga, gx, gy, ba, bx, by}, n) {
    return rfunc({func: x => [
        ra * Math.sin(f * x + rx) + ry,
        ga * Math.sin(f * x + gx) + gy,
        ba * Math.sin(f * x + bx) + by
    ]}, n)
}
