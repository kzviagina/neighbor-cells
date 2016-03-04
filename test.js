(function () {
    'use strict';

    function Matrix() {
        this.min = 0;
        this.max = 9;
        this.dimentions = 7;
        this.limit = 3;
        this.array = [];
        this.wrapId = 'wrap';
        this.btnId = 'btn-reload';
    }

    /**
     * Generate random matrix
     */
    Matrix.prototype.createArr = function () {
        var i, j;
        var array = new Array(this.dimentions);

        for (i = 0; i < this.dimentions; i++) {
            array[i] = new Array(this.dimentions);

            for (var j = 0; j < this.dimentions; j++) {
                array[i][j] = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
            }
        }

        this.array = array;
    }

    /**
     * Display matrix
     */
    Matrix.prototype.displayMatrix = function () {
        var container = document.getElementById(this.wrapId);
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < this.array.length; i++) {
            var rowContainer = document.createElement('div');

            for (var j = 0; j < this.array[i].length; j++) {
                var itemContainer = document.createElement('span');
                itemContainer.setAttribute('data-index', i + ',' + j);
                itemContainer.innerHTML = this.array[i][j];
                rowContainer.appendChild(itemContainer);
            }

            fragment.appendChild(rowContainer);
        }

        container.innerHTML = '';
        container.appendChild(fragment);
    }

    /**
     * Find neighbors with same value and highlight cells
     * @param x cell index
     * @param y cell index
     */
    Matrix.prototype.findNeighbors = function (x, y) {
        var x = parseInt(x, 10),
            y = parseInt(y, 10),
            item = this.array[x][y];

        var startX = (x - this.limit) > 0 ? x - this.limit : 0,
            startY = (y - this.limit) > 0 ? y - this.limit : 0,
            stopX = (x + this.limit) < (this.dimentions - 1) ? x + this.limit : (this.dimentions - 1),
            stopY = (y + this.limit) < (this.dimentions - 1) ? y + this.limit : (this.dimentions - 1);


        for (var i = startX; i <= stopX; i++) {
            for (var j = startY; j <= stopY; j++) {
                if (this.array[i][j] === item) {

                    //Math.abs() != 1 means that nearest diagonal neighbour cell is ok
                    if (Math.abs(i - x) === Math.abs(j - y) && Math.abs(i - x) != 1 && Math.abs(j - y) != 1) {
                        continue;
                    }
                    document.querySelector('[data-index="' + i + ',' + j + '"]').style.background = '#fff2cc';
                }
            }
        }

    }

    /**
     * Generate and display new matrix
     */
    Matrix.prototype.reload = function () {
        this.createArr();
        this.displayMatrix();
    }

    /**
     * Init
     */
    Matrix.prototype.init = function () {
        var idxArr;
        var self = this;
        self.createArr();
        self.displayMatrix();

        document.getElementById(this.wrapId).addEventListener('click', function(e) {
            if (e.target && e.target.matches('span')) {
                e.target.style.background = '#ffd966';
                idxArr = e.target.getAttribute('data-index').split(',');
                self.findNeighbors(idxArr[0], idxArr[1]);
            }
        }, false);

        document.getElementById(this.btnId).addEventListener('click', function () {
            self.reload();
        }, false);
    }

    var matrix = new Matrix();

    matrix.init();

})();