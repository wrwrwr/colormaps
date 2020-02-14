import linear from '../factories/linear.js'
import repeat from '../factories/repeat.js'
import rfunc from '../factories/rfunc.js'
import cubehelix from '../maps/mpl/cubehelix.js'
import summer from '../maps/mpl/summer.js'

suite("examples", () => {
    test("using factories", () => {
        const [factory, defaults] = summer
        factory(defaults, 2).should.eql(
            [[0, .5, .4], [1, 1, .4]]
        )
    })

    test("linear: nonuniform", () => {
        const knots = [
            [[0, 0, 0]],
            [[.4, 0, 0], .8],
            [[1, 0, 0]]
        ]
        linear({knots}, 3).should.eql(
            [[0, 0, 0], [.25, 0, 0], [1, 0, 0]]
        )
    })

    test("linear: repeated", () => {
        const knots = [
            [[0, 0, 0]],
            [[.2, 0, 0], .5],
            [[.8, 0, 0], .5],
            [[1, 0, 0]]
        ]
        linear({knots}, 5).should.eql(
            [[0, 0, 0], [.1, 0, 0], [.8, 0, 0], [.9, 0, 0], [1, 0, 0]]
        )
    })

    test("repeat", () => {
        const colors = [
            [0, 0, 0],
            [1, 1, 1]
        ]
        repeat({colors}, 3).should.eql(
            [[0, 0, 0], [1, 1, 1], [0, 0, 0]]
        )
    })

    test("rfunc", () => {
        const func = x => [x, x - .5, x - 1]
        rfunc({func}, 3).should.eql(
            [[0, 0, 0], [.5, 0, 0], [1, .5, 0]]
        )
    })
})
