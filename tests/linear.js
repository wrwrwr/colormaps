import linear from '../factories/linear.js'
import {round} from './utils.js'

// It is assumed that the first knot is at x = 0 and the last at x = 1, and
// that knot locations are nondecreasing. The factory is not meant to check
// knots format or consistency.
suite("factories: linear", () => {
    test("single segment", () => {
        const knots = [
            [[0, 0, 0]],
            [[1, 0, 0]]
        ]
        linear({knots}, 0).should.eql(
            []
        )
        linear({knots}, 1).should.eql(
            [[0, 0, 0]]
        )
        linear({knots}, 2).should.eql(
            [[0, 0, 0], [1, 0, 0]]
        )
        round(linear({knots}, 3)).should.eql(
            [[0, 0, 0], [.5, 0, 0], [1, 0, 0]]
        )
        round(linear({knots}, 4)).should.eql(
            round([[0, 0, 0], [1/3, 0, 0], [2/3, 0, 0], [1, 0, 0]])
        )
    })

    test("two segments", () => {
        const knots = [
            [[0, 1, 0]],
            [[0, .2, 0]],
            [[0, 0, 0]]
        ]
        linear({knots}, 0).should.eql(
            []
        )
        linear({knots}, 1).should.eql(
            [[0, 1, 0]]
        )
        linear({knots}, 2).should.eql(
            [[0, 1, 0], [0, 0, 0]]
        )
        linear({knots}, 3).should.eql(
            [[0, 1, 0], [0, .2, 0], [0, 0, 0]]
        )
        round(linear({knots}, 4)).should.eql(
            round([[0, 1, 0], [0, 7/15, 0], [0, 2/15, 0], [0, 0, 0]])
        )
    })

    test("nonequidistant", () => {
        const knots = [
            [[0, 0, 0]],
            [[0, 0, .4], .2],
            [[0, 0, .8]]
        ]
        linear({knots}, 0).should.eql(
            []
        )
        linear({knots}, 1).should.eql(
            [[0, 0, 0]]
        )
        linear({knots}, 2).should.eql(
            [[0, 0, 0], [0, 0, .8]]
        )
        round(linear({knots}, 3)).should.eql(
            [[0, 0, 0], [0, 0, .55], [0, 0, .8]]
        )
        round(linear({knots}, 4)).should.eql(
            round([[0, 0, 0], [0, 0, 7/15], [0, 0, 19/30], [0, 0, .8]])
        )
    })

    test("discontinuities", () => {
        const knots = [
            [[0, 0, 0]],
            [[0, 0, .3], .5],
            [[0, 0, .7], .5],
            [[0, 0, 1]]
        ]
        linear({knots}, 0).should.eql(
            []
        )
        linear({knots}, 1).should.eql(
            [[0, 0, 0]]
        )
        linear({knots}, 2).should.eql(
            [[0, 0, 0], [0, 0, 1]]
        )
        linear({knots}, 3).should.eql(
            [[0, 0, 0], [0, 0, .7], [0, 0, 1]]
        )
        round(linear({knots}, 4)).should.eql(
            [[0, 0, 0], [0, 0, .2], [0, 0, .8], [0, 0, 1]]
        )
    })
})
