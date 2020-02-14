import rfunc from '../../factories/rfunc.js'

export default [rfunc, {func: x => [
    Math.abs(2 * x - .5),
    Math.sin(Math.PI * x),
    Math.cos(.5 * Math.PI * x)
]}]
