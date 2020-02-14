#!/usr/bin/env python3

import pathlib

import matplotlib as mpl
import numpy as np
import pandas as pd


def simplify_knots(data):
    """All stops for all channels with discontinuities as repeated knots."""
    frames = []
    for channel, cdata in data.items():
        if callable(cdata):
            raise NotImplementedError("callable channel")
        if channel == 'alpha' and all(r[1] == 1 for r in cdata):
            continue
        cdata = list(cdata)
        i = 0
        while i < len(cdata):
            x, y0, y1 = cdata[i]
            if y0 != y1:
                i += 1
                cdata.insert(i, (x + np.spacing(x), y1, 0))
            i += 1
        frames.append(pd.DataFrame.from_records(
            cdata,
            columns=('x', channel, 'unused'),
            index='x',
            exclude=('unused',)
        ))
    return pd.concat(frames, 'columns').interpolate('slinear')


def save_linear(path, knots):
    with open(path, 'w') as file:
        file.write('import linear from \'../../factories/linear.js\'\n\n'
                   'export default [linear, {knots: [\n')
        defxs = np.linspace(0, 1, len(knots))
        for (x, *values), defx in zip(knots.itertuples(), defxs):
            file.write(f'    [[{", ".join(shorten(v) for v in values)}]')
            if abs(x - defx) > .001:
                file.write(f', {shorten(x)}')
            file.write('],\n')
        file.write(']}]\n')


def save_repeat(path, colors):
    with open(path, 'w') as file:
        file.write('import repeat from \'../../factories/repeat.js\'\n\n'
                   'export default [repeat, {colors: [\n')
        for color in colors:
            file.write(f'    [{", ".join(shorten(n) for n in color)}],\n')
        file.write(']}]\n')


def shorten(number):
    if type(number) == float:
        number = round(number, 6)
        if number.is_integer():
            return str(round(number))
        else:
            return str(number).strip('0')
    return str(number)


def save_index(path, keys):
    with open(path, 'w') as file:
        for key in keys:
            file.write(f'export {{default as {key}}} from \'./{key}.js\'\n')


bpath = pathlib.Path(__file__).parent.joinpath('../maps/mpl')
index = bpath.joinpath('index.js').read_text()
skipped = 0
keys = []
for key, cmap in mpl.cm.cmap_d.items():
    key = key.lower()
    if key.endswith('_r') or f'/{key}.js' in index:
        # Skip reversed and manually ported maps.
        skipped += 1
        continue
    path = bpath.joinpath(key + '.js')
    try:
        if type(cmap) == mpl.colors.LinearSegmentedColormap:
            knots = simplify_knots(cmap._segmentdata)
            save_linear(path, knots)
        elif type(cmap) == mpl.colors.ListedColormap:
            if len(cmap.colors) > 128:
                # Turn large lists of colors into linear maps.
                stops = np.linspace(0, 1, len(cmap.colors))
                knots = pd.DataFrame(cmap.colors, index=stops)
                save_linear(path, knots)
            else:
                save_repeat(path, cmap.colors)
        else:
            raise NotImplementedError("unknown class")
    except NotImplementedError as exc:
        print(f'Skipping: {key} ({exc})')
        continue
    keys.append(key)
save_index(bpath.joinpath('index-imp.js'), keys)
print(f"Imported {len(keys)} maps (explicitly skipped {skipped})")
