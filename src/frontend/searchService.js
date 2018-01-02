'use strict';
var lunr = require('lunr');

function searchService(q) {
    var index;
    self = this;
    self.resetIndex = resetIndex;
    self.find = find;

    /*****************************
     * Public members 
     *****************************/
    function resetIndex(files) {
        index = lunr(function() {
            this.field('fileName');
            this.field('type');
            this.ref('path');
            angular.forEach(files, function(file) {
                this.add(file);
            }, this);
        });
    }
    
    function find(query,) {
        if (!index) {
            resetIndex();
        }
        return q.resolve(index.search(query));
    }
}

searchService.$inject = ['$q'];

module.exports = searchService;