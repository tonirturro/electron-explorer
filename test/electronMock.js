'use strict';

/* Polyfill indexOf. */
var indexOf;

if (typeof Array.prototype.indexOf === 'function') {
    indexOf = function (haystack, needle) {
        return haystack.indexOf(needle);
    };
} else {
    indexOf = function (haystack, needle) {
        var i = 0, length = haystack.length, idx = -1, found = false;

        while (i < length && !found) {
            if (haystack[i] === needle) {
                idx = i;
                found = true;
            }

            i++;
        }

        return idx;
    };
};

var EventEmitter = function () {
    var self = this;
    self.events = {};
    self.on = on;
    self.emit = emit;

    function on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
    
        this.events[event].push(listener);
    };

    function emit(event, args) {
        var i, listeners, length;
    
        if (typeof this.events[event] === 'object') {
            listeners = this.events[event].slice();
            length = listeners.length;
    
            for (i = 0; i < length; i++) {
                listeners[i].apply(this, args);
            }
        }
    };
};

var Sender = function (sender) {
    this.sender = sender;
}

var CrossEmitter = function(registerHere, emitHere) {
    var register = registerHere;
    var emit = emitHere;
    var self = this;
    self.on = on;
    self.send = send;

    function on(event, listener) {
        register.on(event, listener);
    }

    function send(event)
    {
        var sendArgs = [ new Sender(new CrossEmitter(emit, register)) ];
        var args = [].slice.call(arguments, 1);
        emit.emit(event, sendArgs.concat(args));
    }
}

var ElectronMock = function () {
    var ipcMainEmitter = new EventEmitter();
    var ipcRendererEmitter = new EventEmitter();
    var self = this;
    self.ipcMain = new CrossEmitter(ipcMainEmitter, ipcRendererEmitter);
    self.ipcRenderer = new CrossEmitter(ipcRendererEmitter, ipcMainEmitter);
};

module.exports = ElectronMock;