'use strict';
const ElectronMock = require('./electronMock');

window.require = function (moduleName) {
    if (moduleName === 'electron') {
        return new ElectronMock();
    } else {
        return null;
    }
};

// load the code
require('../src/frontend/main');

// load the tests
const contextJS = require.context('../src', true, /\.spec.js$/);

// And load the modules.
contextJS.keys().map(contextJS);
