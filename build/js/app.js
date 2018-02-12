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
    this.maxHP = 10;
    this.currentHP = 10;
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
          _this.maxHP = 10 + 10 * _this.age;
        }
        if (_this.happinessLevel < 0 || _this.happinessLevel > 10) {
          _this.currentHP -= 1;
        }
        if (_this.restLevel < 0 || _this.restLevel > 10) {
          _this.currentHP -= 1;
        }
        if (_this.foodLevel < 0 || _this.foodLevel > 10) {
          _this.currentHP -= 1;
        }
        if (_this.currentHP <= 0) {
          _this.isDead = true;
        }
      }, 1000);
    }
  }, {
    key: 'runChecks',
    value: function runChecks() {
      if (this.currentHP > this.maxHP) {
        this.currentHP = this.maxHP;
      }
    }
  }, {
    key: 'feed',
    value: function feed(food) {
      if (this.isDead) {
        return this.name + ' has died due to your inability to care for it :(';
      }
      if (food === this.favoriteFood) {
        this.foodLevel += 5;
        this.currentHP += 1;
        this.runChecks();
        return this.name + ' LOVED ' + food + '! Its health increased 1 and its food level increased 5';
      } else if (this.favoriteFood === 'vegetable' && food === 'meat') {
        this.foodLevel -= 1;
        this.currentHP -= 1;
        this.runChecks();
        return this.name + ' HATED ' + food + '! Its health decreased 1 and its food level decreased 1';
      } else if (this.favoriteFood === 'meat' && food === 'vegetable') {
        this.foodLevel -= 1;
        this.currentHP -= 1;
        this.runChecks();
        return this.name + ' HATED ' + food + '! Its health decreased 1 and its food level decreased 1';
      } else {
        this.foodLevel += 1;
        this.runChecks();
        return this.name + ' ate ' + food + ' and its food level increased 1';
      }
    }
  }, {
    key: 'play',
    value: function play(_play) {
      if (this.isDead) {
        return this.name + ' has died due to your inability to care for it :(';
      }
      if (_play === this.favoritePlay) {
        this.happinessLevel += 5;
        this.runChecks();
        return this.name + ' LOVED ' + _play + '! Its happiness level increased 5.';
      } else if (this.favoritePlay === 'fetch' && _play === 'tug-of-war') {
        this.happinessLevel -= 5;
        this.runChecks();
        return this.name + ' HATED ' + _play + '! Its happiness level decreased 5.';
      } else if (this.favoritePlay === 'tug-of-war' && _play === 'fetch') {
        this.happinessLevel -= 5;
        this.runChecks();
        return this.name + ' HATED ' + _play + '! Its happiness level decreased 5.';
      } else {
        this.happinessLevel += 1;
        this.runChecks();
        return this.name + ' played ' + _play + '! Its happiness level increased 1.';
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(hours) {
      if (this.isDead) {
        return this.name + ' has died due to your inability to care for it :(';
      }
      this.restLevel += hours;
      this.currentHP += Math.ceil(hours / 2);
      this.foodLevel -= Math.floor(hours / 2);
      this.runChecks();
      console.log(this.currentHP);
      return this.name + ' slept for ' + hours + ' hours';
    }
  }]);

  return Tamagotchi;
}();

exports.Tamagotchi = Tamagotchi;

},{}],2:[function(require,module,exports){
'use strict';

var _tamagotchi = require('./../js/tamagotchi.js');

$(document).ready(function () {
  //game start function
  $('#start-play').submit(function (event) {
    event.preventDefault();
    var name = $('#name').val();
    var newTamagotchi = new _tamagotchi.Tamagotchi(name);
    $('#play-button').hide();
    $('#play-area').fadeIn();
    newTamagotchi.startTimer();
    var timer = setInterval(function () {
      $('#petName').text(newTamagotchi.name);
      $('#age').text(newTamagotchi.age);
      $('#currentHP').prop("style", 'width: ' + newTamagotchi.currentHP / newTamagotchi.maxHP * 100 + '%');
      $('#foodLevel').prop("style", 'width: ' + newTamagotchi.foodLevel / 10 * 100 + '%');
      $('#happinessLevel').prop("style", 'width: ' + newTamagotchi.happinessLevel / 10 * 100 + '%');
      $('#restLevel').prop("style", 'width: ' + newTamagotchi.restLevel / 10 * 100 + '%');
    }, 500);
  });

  //feed click function

  //play click function

  //sleep click function
});

},{"./../js/tamagotchi.js":1}]},{},[2]);
