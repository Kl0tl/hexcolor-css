import * as hexcolor from 'hexcolor';

import cssnames from './cssnames';
import csscolors from './csscolors';

var hex3 = new RegExp('^\\s*#' + '([0-9a-f])'.repeat(3) + '\\s*$');
var hex6 = new RegExp('^\\s*#' + '([0-9a-f]{2})'.repeat(3) + '\\s*$');

var rgb100 = new RegExp('^\\s*rgb\\(' + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)%\\s*,'.repeat(2) + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)%\\s*\\)\\s*$');
var rgb255 = new RegExp('^\\s*rgb\\(' + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)\\s*,'.repeat(2) + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)\\s*\\)\\s*$');

var rgba100 = new RegExp('^\\s*rgba\\(' + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)%\\s*,'.repeat(3) + '\\s*([0-9]+(?:\\.[0-9]+))\\s*\\)\\s*$');
var rgba255 = new RegExp('^\\s*rgba\\(' + '\\s*(-?[0-9]+(?:\\.[0-9]+)?)\\s*,'.repeat(3) + '\\s*([0-9]+(?:\\.[0-9]+))\\s*\\)\\s*$');

export function css(style) {
  var normalizedStyle = style.toLowerCase();
  var matches;

  if (normalizedStyle in cssnames) {
    return cssnames[normalizedStyle];
  }

  if ((matches = normalizedStyle.match(hex3))) {
    return hexcolor.rgba(parseInt16(matches[1].repeat(2)), parseInt16(matches[2].repeat(2)),
      parseInt16(matches[3].repeat(2)), 255);
  }

  if ((matches = normalizedStyle.match(hex6))) {
    return hexcolor.rgba(parseInt16(matches[1]), parseInt16(matches[2]), parseInt16(matches[3]), 255);
  }

  if ((matches = normalizedStyle.match(rgb100))) {
    return hexcolor.rgba(matches[1] * 2.55, matches[2] * 2.55, matches[3] * 2.55, 255);
  }

  if ((matches = normalizedStyle.match(rgb255))) {
    return hexcolor.rgba(matches[1], matches[2], matches[3], 255);
  }

  if ((matches = normalizedStyle.match(rgba100))) {
    return hexcolor.rgba(matches[1] * 2.55, matches[2] * 2.55, matches[3] * 2.55, matches[4] * 255);
  }

  if ((matches = normalizedStyle.match(rgba255))) {
    return hexcolor.rgba(matches[1], matches[2], matches[3], matches[4] * 255);
  }

  return 0;
};

export function name(color) {
  return csscolors[color] || '';
};

// #rgb
hexcolor.format.csshex12 = function (color) {
  return hexcolor.format(color, 'hex12').replace('0x', '#');
};

// #rrggbb
hexcolor.format.csshex24 = function (color) {
  return hexcolor.format(color, 'hex24').replace('0x', '#');
};

function parseInt16(value) {
  return parseInt(value, 16);
}

export * from hexcolor;
