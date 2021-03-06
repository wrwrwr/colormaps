# Colormaps

(Yet another) colormap library: with maps declared as modules, for the
advantage of browsers downloading only what is imported, support for
functional generators and some predefined color map sets.

Please note that there are other solutions such as [colormaps.io] or
[colormap] that are probably more suitable in most circumstances.

[colormaps.io]: https://colormaps.io/
[colormap]: https://github.com/bpostlethwaite/colormap


## Using the module

Running the examples requires a browser with [support for ES6 modules].

[support for ES6 modules]: https://caniuse.com/#feat=es6-module

### An array of RGB values

For a start, import the `colors` helper and a colormap from `maps`:

```javascript
import {colors} from 'colormaps/index.js'
import gray from 'colormaps/maps/mpl/gray.js'

colors(3, gray)
// [[0, 0, 0], [.5, .5, .5], [1, 1, 1]]
```

### Tuning colormaps

Some of the maps take parameters:

```javascript
import {colors} from 'colormaps/index.js'
import cubehelix from 'colormaps/maps/mpl/cubehelix.js'

colors(3, cubehelix)
// [[0, 0, 0], [.63, .47, .29], [1, 1, 1]]

colors(3, cubehelix, {gamma: 1.1})
// [[0, 0, 0], [.59, .44, .25], [1, 1, 1]]
```

### Styling HTML

The helper can return CSS colors:

```html
<script type="module">
    import {colors} from 'colormaps/index.js'
    import viridis from 'colormaps/maps/mpl/viridis.js'

    const items = document.querySelectorAll('div')
    const bcolors = colors(items.length, viridis, {}, 'css')
    for (const [index, item] of items.entries()) {
        item.style.backgroundColor = bcolors[index]
    }
</script>
```

### Terminal codes

The helper may also be used to produce escape sequences can be used in xterm
scripting and similar environments:

```javascript
import {colors} from 'colormaps/index.js'
import wistia from 'colormaps/maps/mpl/wistia.js'

colors(3, wistia, {}, 'term')
```

You could then prefix letters or words with the returned codes:

```bash
echo -e '\033[38;2;228;255;122mA \033[38;2;255;189;0mB \033[38;2;252;127;0mC'
```

### Providing a palette choice

If you would want to give users a choice of a colors scheme you may use a
predefined set of maps:

```javascript
import * as maps from 'colormaps/sets/cb/qualitative.js'

const select = document.querySelector('select')
for (const key of Object.keys(maps)) {
    const option = document.createElement('option')
    option.value = key
    option.textContent = key
    select.appendChild(option)
}
select.addEventListener('change', () => {
    const map = maps[select.value]
})
```

## Maps and sets

There is a visual index of all defined [maps] and [sets].

[maps]: https://wrwrwr.github.io/colormaps/index.html
[sets]: https://wrwrwr.github.io/colormaps/index.html?sets

### References

All of the maps in the `mpl` directory are imported from [matplotlib], the data
can be updated using the `importers/mpl.py` script. The original sources are as
follows:

* Maps in the `cb/*` sets are from [ColorBrewer] by [Cynthia A. Brewer] and
  are covered by an Apache [license][ColorBrewer license].
* Maps in the `mpl/gist` set are from [Yorick] written by [David H. Munro] and
  are released under a BSD [license][Yorick license].
* [Cubehelix] was designed by D.A. Green.
* [Coolwarm] was developed by Kenneth Moreland.
* [Wistia] ([a deuteranopia-friendly map][Wistia blog]) was designed by
  Joe Ringenberg and is covered by a MIT [license][Wistia license].
* Maps in the `mpl/vega` set are from [Vega] under a BSD 3-clause
  [license][Vega license].
* Maps in the `mpl/uniform` set except `cividis`, were created by Nathaniel
  J. Smith, Stefan van der Walt, and Eric Firing with the help of [viscm] and
  are released with a public domain [dedication][BIDS dedication].
* [Cividis] was developed by Jamie R. Nuñez, Christopher R. Anderton and
  Ryan S. Renslow using [cmaputil].

Some additional descriptions and grouping can be found in the matplotlib's
[_cm] and [_cm_listed] modules.

[matplotlib]: https://matplotlib.org/
[ColorBrewer]: http://colorbrewer.org
[ColorBrewer license]: licenses/colorbrewer.txt
[Cynthia A. Brewer]: https://en.wikipedia.org/wiki/Cynthia_Brewer
[Yorick]: https://github.com/LLNL/yorick/tree/master/g
[Yorick license]: licenses/yorick.txt
[David H. Munro]: https://github.com/dhmunro
[Cubehelix]: https://arxiv.org/abs/1108.5083
[Coolwarm]: https://www.kennethmoreland.com/color-maps/
[Wistia]: https://github.com/wistia/heatmap-palette
[Wistia license]: licenses/wistia.txt
[Wistia blog]: https://wistia.com/learn/culture/heatmaps-for-colorblindness
[Vega]: https://vega.github.io/vega/docs/schemes/
[Vega license]: licenses/vega.txt
[viscm]: https://github.com/matplotlib/viscm
[BIDS dedication]: https://github.com/BIDS/colormap/blob/master/colormaps.py
[Cividis]: https://arxiv.org/ftp/arxiv/papers/1712/1712.01662.pdf
[cmaputil]: https://github.com/pnnl/cmaputil
[_cm]: https://github.com/matplotlib/matplotlib/blob/master/lib/matplotlib/_cm.py
[_cm_listed]: https://github.com/matplotlib/matplotlib/blob/master/lib/matplotlib/_cm_listed.py

## Extending the module

A color map is a function that given a number returns a list of colors.
They are conveniently declared using a factory, a function generator, and
default arguments for the generator:

```javascript
import factory from 'colormaps/factories/linear.js'

const defaults = {knots: [[[1, 0, 0]], [[1, 1, 0]]]}
const autumn = [factory, defaults]
```

### Included factories

#### linear

Interpolation with a piecewise linear function defined by a list of knots:
`[[color], optional x]` arrays.

The default, uniform, spacing of knots can be overridden:

```javascript
import linear from 'colormaps/factories/linear.js'

const knots = [[[0, 0, 0]], [[.4, 0, 0], .8], [[1, 0, 0]]]
linear({knots}, 3)  // [[0, 0, 0], [.25, 0, 0], [1, 0, 0]]
```

Repeated steps may be used to represent discontinuity:

```javascript
const knots = [[[0, 0, 0]], [[.2, 0, 0], .5], [[.8, 0, 0], .5], [[1, 0, 0]]]
linear({knots}, 5)  // [[0, 0, 0], [.1, 0, 0], [.8, 0, 0], [.9, 0, 0], [1, 0, 0]]
```

#### repeat

Cycles through a list of colors; useful for qualitative, discrete maps:

```javascript
import repeat from 'colormaps/factories/repeat.js'

const colors = [[0, 0, 0], [1, 1, 1]]
repeat({colors}, 3)  // [[0, 0, 0], [1, 1, 1], [0, 0, 0]]
```

#### rfunc

A thin wrapper for color maps that are best expressed as a function over [0, 1].
Values are automatically clamped:

```javascript
import rfunc from 'colormaps/factories/rfunc.js'

const func = x => [x, x - .5, x - 1]
rfunc({func}, 3)  // [[0, 0, 0], [.5, 0, 0], [1, .5, 0]]
```

### Writing a factory

A simple example of grays with adjustable gamma:

```javascript
function grays({gamma}, n) {
    const colors = new Array(n)
    for (let i = 0; i < n; i += 1) {
        const y = (i / (n - 1)) ** gamma
        colors[i] = [y, y, y]
    }
    return colors
}
```

You could then declare color maps based on it:

```javascript
const grays1 = [grays, {gamma: 1}]
const grays2 = [grays, {gamma: 2}]
```

## Testing

Unit tests may be run [directly in browser][tests].

[tests]: https://wrwrwr.github.io/colormaps/tests.html

## Further

* Prepare a bundle or describe how to bundle.
* Importer for the [JSON format].
* Importers for other sources.

[JSON format]: https://github.com/njsmith/json-cm/blob/master/json-cm-spec.md
