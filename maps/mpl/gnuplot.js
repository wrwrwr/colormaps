import rfunc from '../../factories/rfunc.js'

export default [rfunc, {func: x => [
    x ** .5,
    x ** 3,
    Math.sin(2 * Math.PI * x)
]}]
