'use strict';

// load the code
require('../src/frontend/main');

// load the tests
const contextJS = require.context('../src', true, /\.spec.js$/);

// And load the modules.
contextJS.keys().map(contextJS);
