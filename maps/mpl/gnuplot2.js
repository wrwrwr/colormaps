import rfunc from '../../factories/rfunc.js'

export default [rfunc, {func: x => [
    x / .32 - .78125,
    2 * x - .84,
    x < .25 ? 4 * x : x < .92 ? 1.84 - 2 * x : x / .08 - 11.5
]}]
