(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tamagotchi = function () {
  function Tamagotchi(name) {
    _classCallCheck(this, Tamagotchi);

    var foodTypes = ['fruit', 'vegetable', 'meat'];
    var playTypes = ['fetch', 'rugby', 'tug-of-war'];

    this.name = name;
    this.foodLevel = 10;
    this.happinessLevel = 10;
    this.restLevel = 10;
    this.age = 0;
    this.counter = 0;
    this.isDead = false;
    this.favoriteFood = 'meat'; //foodTypes[Math.floor(Math.random() * (foodTypes.length))];
    this.favoritePlay = 'tug-of-war'; //playTypes[Math.floor(Math.random() * (playTypes.length))];
  }

  _createClass(Tamagotchi, [{
    key: 'startTimer',
    value: function startTimer() {
      var _this = this;

      setInterval(function () {
        _this.foodLevel--;
        _this.happinessLevel--;
        _this.restLevel--;
        _this.counter++;
        if (_this.counter % 10 === 0) {
          _this.age++;
        }
        if (_this.foodLevel < 0 || _this.happinessLevel < 0 || _this.restLevel < 0) {
          _this.isDead = true;
        }
      }, 1000);
    }
  }, {
    key: 'feed',
    value: function feed(food) {
      if (food === this.favoriteFood) {
        this.foodLevel += 5;
        this.happinessLevel += 1;
        return this.name + ' LOVED ' + food + '! Its happiness level increased 1 and its food level increased 5';
      } else if (this.favoriteFood === 'vegetable' && food === 'meat') {
        this.foodLevel -= 1;
        this.happinessLevel -= 1;
        return this.name + ' HATED ' + food + '! Its happiness level decreased 1 and its food level decreased 1';
      } else if (this.favoriteFood === 'meat' && food === 'vegetable') {
        this.foodLevel -= 1;
        this.happinessLevel -= 1;
        return this.name + ' HATED ' + food + '! Its happiness level decreased 1 and its food level decreased 1';
      } else {
        this.foodLevel += 1;
        return this.name + ' ate ' + food + ' and its food level increased 1';
      }
    }
  }, {
    key: 'play',
    value: function play(_play) {
      if (_play === this.favoritePlay) {
        this.happinessLevel += 5;
        return this.name + ' LOVED ' + _play + '! Its happiness level increased 5.';
      } else if (this.favoritePlay === 'fetch' && _play === 'tug-of-war') {
        this.happinessLevel -= 5;
        return this.name + ' HATED ' + _play + '! Its happiness level decreased 5.';
      } else if (this.favoritePlay === 'tug-of-war' && _play === 'fetch') {
        this.happinessLevel -= 5;
        return this.name + ' HATED ' + _play + '! Its happiness level decreased 5.';
      } else {
        this.happinessLevel += 1;
        return this.name + ' played ' + _play + '! Its happiness level increased 1.';
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(hours) {
      var _this2 = this;

      setTimeout(function () {
        _this2.restLevel += hours;
        _this2.foodLevel -= Math.floor(hours / 2);
        return _this2.name + ' slept for ' + hours + ' ';
      }, hours * 1000);
    }
  }]);

  return Tamagotchi;
}();

exports.Tamagotchi = Tamagotchi;

},{}],2:[function(require,module,exports){
'use strict';

var _tamagotchi = require('./../js/tamagotchi.js');

},{"./../js/tamagotchi.js":1}]},{},[2]);
