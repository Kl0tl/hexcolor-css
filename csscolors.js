import cssnames from './cssnames';

var csscolors = {};

for (var name in cssnames) {
  csscolors[cssnames[name]] = name;
}

export default csscolors;
