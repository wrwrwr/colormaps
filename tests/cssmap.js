import {cssmap} from '../index.js'

function factory({color}, n) {
    return (new Array(n)).fill(color)
}

suite("cssmap", () => {
    test("rgb", () => {
        const map = [factory, {color: [1, .5, 0]}]
        cssmap([], map).should.eql(
            new Map()
        )
        cssmap([0], map).should.eql(
            new Map([[0, 'rgb(100%, 50%, 0%)']])
        )
        cssmap([0, 1], map).should.eql(
            new Map([[0, 'rgb(100%, 50%, 0%)'], [1, 'rgb(100%, 50%, 0%)']])
        )
    })

    test("hsl", () => {
        const map = [factory, {color: [.1, .2, .3]}, 'hsl']
        cssmap([], map).should.eql(
            new Map()
        )
        cssmap([0], map).should.eql(
            new Map([[0, 'hsl(36, 20%, 30%)']])
        )
        cssmap([0, 1], map).should.eql(
            new Map([[0, 'hsl(36, 20%, 30%)'], [1, 'hsl(36, 20%, 30%)']])
        )
    })

    test("css", () => {
        const map = [factory, {color: '#aabbcc'}, 'css']
        cssmap([], map).should.eql(
            new Map()
        )
        cssmap([0], map).should.eql(
            new Map([[0, '#aabbcc']])
        )
        cssmap([0, 1], map).should.eql(
            new Map([[0, '#aabbcc'], [1, '#aabbcc']])
        )
    })
})
