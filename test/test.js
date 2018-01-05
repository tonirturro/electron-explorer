'use strict';

// Mocks for Electron
var ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae = {
    lastIpcRendererSendParams: {
        api: '',
        param1: null,
        param2: null
    },
    lastIpcRendererOnParams: {
        reply: '',
        expectedResult: null
    }
};

var electronMockGlobalcedc530f1ff11e78c3f9a214cf093ae = {
    ipcRenderer: {
        send: function (api, param1, param2) {
            ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae.lastIpcRendererSendParams.api = api;
            ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae.lastIpcRendererSendParams.param1 = 
                (typeof param1 === 'undefined') ? null : param1;
            ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae.lastIpcRendererSendParams.param2 = 
                (typeof param2 === 'undefined') ? null : param2;
        },
        on: function(reply, cb) {
            ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae.lastIpcRendererOnParams.reply = reply;
            cb(null, ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae.lastIpcRendererOnParams.expectedResult);
        }
    },
    ipcMock: ipcMockGlobalcedc530f1ff11e78c3f9a214cf093ae
};

window.require = function (moduleName) {
    if (moduleName === 'electron') {
        return electronMockGlobalcedc530f1ff11e78c3f9a214cf093ae;
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
