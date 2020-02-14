import repeat from '../factories/repeat.js'

suite("factories: repeat", () => {
    test("single color", () => {
        const colors = [
            [1, 0, 0]
        ]
        repeat({colors}, 0).should.eql(
            []
        )
        repeat({colors}, 1).should.eql(
            [[1, 0, 0]]
        )
        repeat({colors}, 2).should.eql(
            [[1, 0, 0], [1, 0, 0]]
        )
        repeat({colors}, 3).should.eql(
            [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
        )
        repeat({colors}, 4).should.eql(
            [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]]
        )
    })

    test("two colors", () => {
        const colors = [
            [1, 0, 0],
            [1, 1, 0]
        ]
        repeat({colors}, 0).should.eql(
            []
        )
        repeat({colors}, 1).should.eql(
            [[1, 0, 0]]
        )
        repeat({colors}, 2).should.eql(
            [[1, 0, 0], [1, 1, 0]]
        )
        repeat({colors}, 3).should.eql(
            [[1, 0, 0], [1, 1, 0], [1, 0, 0]]
        )
        repeat({colors}, 4).should.eql(
            [[1, 0, 0], [1, 1, 0], [1, 0, 0], [1, 1, 0]]
        )
    })

    test("repeated", () => {
        const colors = [
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 1]
        ]
        repeat({colors}, 0).should.eql(
            []
        )
        repeat({colors}, 1).should.eql(
            [[0, 0, 0]]
        )
        repeat({colors}, 2).should.eql(
            [[0, 0, 0], [0, 0, 1]]
        )
        repeat({colors}, 3).should.eql(
            [[0, 0, 0], [0, 0, 1], [0, 0, 1]]
        )
        repeat({colors}, 4).should.eql(
            [[0, 0, 0], [0, 0, 1], [0, 0, 1], [0, 0, 0]]
        )
    })
})
