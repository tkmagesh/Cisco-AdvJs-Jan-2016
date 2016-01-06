(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var idSymbol = Symbol();

var Employee = exports.Employee = (function () {
    function Employee(id, name, salary) {
        _classCallCheck(this, Employee);

        this[idSymbol] = id;
        this.name = name;
        this.salary = salary;
    }

    _createClass(Employee, [{
        key: "getId",
        value: function getId() {
            return this[idSymbol];
        }
    }, {
        key: "display",
        value: function display() {
            console.log(this[idSymbol], this.name, this.salary);
        }
    }], [{
        key: "create",
        value: function create(id, name, salary) {
            return new Employee(id, name, salary);
        }
    }]);

    return Employee;
})();

},{}],2:[function(require,module,exports){
"use strict";

var _Employee = require("./Employee");

var emp = _Employee.Employee.create(100, "magesh", 10000);
emp.display();

},{"./Employee":1}]},{},[2]);
