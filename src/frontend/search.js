'use strict';

var lunr = require('lunr');
var index;

function resetIndex(files) {
    index = lunr(function() {
        this.field('fileName');
        this.field('type');
        this.ref('path');
        this.add(files);
    });
}

function find(query, cb) {
    if (!index) {
        resetIndex();
    }
    const results = index.search(query);
    cb(results);
}

module.exports = { resetIndex, find };