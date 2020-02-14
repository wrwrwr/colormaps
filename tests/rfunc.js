import rfunc from '../factories/rfunc.js'
import {round} from './utils.js'

suite("factories: rfunc", () => {
    test("identity", () => {
        const func = x => [x, 0, 0]
        rfunc({func}, 0).should.eql(
            []
        )
        rfunc({func}, 1).should.eql(
            [[0, 0, 0]]
        )
        rfunc({func}, 2).should.eql(
            [[0, 0, 0], [1, 0, 0]]
        )
        rfunc({func}, 3).should.eql(
            [[0, 0, 0], [.5, 0, 0], [1, 0, 0]]
        )
        round(rfunc({func}, 4)).should.eql(
            round([[0, 0, 0], [1/3, 0, 0], [2/3, 0, 0], [1, 0, 0]])
        )
    })

    test("clamping", () => {
        const func = x => [x - 1, x + 1, 2 * x]
        rfunc({func}, 0).should.eql(
            []
        )
        rfunc({func}, 1).should.eql(
            [[0, 1, 0]]
        )
        rfunc({func}, 2).should.eql(
            [[0, 1, 0], [0, 1, 1]]
        )
        rfunc({func}, 3).should.eql(
            [[0, 1, 0], [0, 1, 1], [0, 1, 1]]
        )
        round(rfunc({func}, 4)).should.eql(
            round([[0, 1, 0], [0, 1, 2/3], [0, 1, 1], [0, 1, 1]])
        )
    })
})
