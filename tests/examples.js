import {colors} from '../index.js'
import linear from '../factories/linear.js'
import repeat from '../factories/repeat.js'
import rfunc from '../factories/rfunc.js'
import cubehelix from '../maps/mpl/cubehelix.js'
import gray from '../maps/mpl/gray.js'
import wistia from '../maps/mpl/wistia.js'
import {round} from './utils.js'

suite("examples", () => {
    test("raw", () => {
        colors(3, gray).should.eql(
            [[0, 0, 0], [.5, .5, .5], [1, 1, 1]]
        )
    })

    test("args", () => {
        round(colors(3, cubehelix), 2).should.eql(
            [[0, 0, 0], [.63, .47, .29], [1, 1, 1]]
        )
        round(colors(3, cubehelix, {gamma: 1.1}), 2).should.eql(
            [[0, 0, 0], [.59, .44, .25], [1, 1, 1]]
        )
    })

    test("term", () => {
        colors(3, wistia, {}, 'term').should.eql([
            '\\033[38;2;228;255;122m',
            '\\033[38;2;255;189;0m',
            '\\033[38;2;252;127;0m'
        ])
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
