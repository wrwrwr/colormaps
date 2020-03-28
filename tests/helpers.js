import {colors} from '../index.js'

const cmap = [({color}, n) => (new Array(n)).fill(color), {color: [1, .5, 0]}]

suite("helpers", () => {
    test("colors", () => {
        colors(0, cmap).should.eql(
            []
        )
        colors(1, cmap).should.eql(
            ['rgb(100%, 50%, 0%)']
        )
        colors(2, cmap).should.eql(
            ['rgb(100%, 50%, 0%)', 'rgb(100%, 50%, 0%)']
        )
    })

    test("colors args", () => {
        colors(0, cmap, {color: [.2, 0, 0]}).should.eql(
            []
        )
        colors(1, cmap, {color: [.2, 0, 0]}).should.eql(
            ['rgb(20%, 0%, 0%)']
        )
        colors(2, cmap, {color: [.2, 0, 0]}).should.eql(
            ['rgb(20%, 0%, 0%)', 'rgb(20%, 0%, 0%)']
        )
    })

    test("colors term", () => {
        colors(0, cmap, {}, 'term').should.eql(
            []
        )
        colors(1, cmap, {}, 'term').should.eql([
            '\\033[38;2;255;128;0m'
        ])
        colors(2, cmap, {}, 'term').should.eql(
            ['\\033[38;2;255;128;0m', '\\033[38;2;255;128;0m']
        )
    })
})
