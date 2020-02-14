import twilight from './twilight.js'

const [factory, {knots}] = twilight
const knots1 = knots.slice(0, knots.length / 2)
const knots2 = knots.slice(-knots.length / 2)
export default [factory, {knots: knots2.concat(knots1).reverse()}]
