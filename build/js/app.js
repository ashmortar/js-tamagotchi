(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
exports.apiKey = "ZPWr6qfQIxAqp54JHs2XuRCn2QEWlMSa";

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tamagotchi = exports.Tamagotchi = function () {
  function Tamagotchi(name) {
    _classCallCheck(this, Tamagotchi);

    var foodTypes = ['fruit', 'vegetable', 'meat'];
    var playTypes = ['fetch', 'checkers', 'tug-of-war'];

    this.name = name;
    this.foodLevel = 10;
    this.happinessLevel = 10;
    this.restLevel = 10;
    this.age = 0;
    this.counter = 0;
    this.isDead = false;
    this.maxHP = 10;
    this.currentHP = 10;
    this.favoriteFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    this.favoritePlay = playTypes[Math.floor(Math.random() * playTypes.length)];
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
        if (_this.counter % 20 === 0) {
          _this.age++;
          _this.maxHP += 10;
          _this.currentHP += 10;
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
      } else if (this.favoriteFood === 'vegetable' && food === 'meat' || this.favoriteFood === 'meat' && food === 'vegetable') {
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
    value: function play(game) {
      if (this.isDead) {
        return this.name + ' has died due to your inability to care for it :(';
      }
      if (game === this.favoritePlay) {
        this.happinessLevel += 5;
        this.runChecks();
        return this.name + ' LOVED ' + game + '! Its happiness level increased 5.';
      } else if (this.favoritePlay === 'fetch' && game === 'tug-of-war') {
        this.happinessLevel -= 5;
        this.runChecks();
        return this.name + ' HATED ' + game + '! Its happiness level decreased 5.';
      } else if (this.favoritePlay === 'tug-of-war' && game === 'fetch') {
        this.happinessLevel -= 5;
        this.runChecks();
        return this.name + ' HATED ' + game + '! Its happiness level decreased 5.';
      } else {
        this.happinessLevel += 1;
        this.runChecks();
        return this.name + ' played ' + game + '! Its happiness level increased 1.';
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

},{}],3:[function(require,module,exports){
'use strict';

var _tamagotchi = require('./../js/tamagotchi.js');

var _env = require('./../.env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  var ageCheck = -1;
  $('#starter').show();
  $('#play-area').hide();
  //game start function
  $('#start-play').submit(function (event) {
    event.preventDefault();
    var name = $('#name').val();
    var newTamagotchi = new _tamagotchi.Tamagotchi(name);

    var portrait = setInterval(function () {
      var lifeStage = void 0;
      switch (newTamagotchi.age) {
        case 0:
          lifeStage = "zygote";
          break;

        case 1:
          lifeStage = "baby animal";
          break;

        case 2:
          lifeStage = "pokemon";
          break;

        case 3:
          lifeStage = "evolved pokemon";
          break;
        case 4:
          lifeStage = "legendary pokemon";
          break;
        default:
          lifeStage = "skeleton";
          break;
      }
      if (ageCheck < newTamagotchi.age) {
        var promise = new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + _env2.default.apiKey + '&q=' + lifeStage + '&limit=25&offset=0&rating=G&lang=en';
          request.onload = function () {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          };
          request.open("GET", url, true);
          request.send();
        });

        promise.then(function (response) {
          var body = JSON.parse(response);
          $('#representation').prop("src", body.data[Math.floor(Math.random() * 24)].images.fixed_height.url);
          alert("Your pet has grown!");
        }, function (error) {
          console.log(error.message);
        });
        ageCheck = newTamagotchi.age;
      }
    }, 1000);

    $('#starter').hide();
    $('#play-area').fadeIn();
    newTamagotchi.startTimer();
    var timer = setInterval(function () {
      $('#petName').text(newTamagotchi.name);
      $('#age').text(newTamagotchi.age);
      $('#currentHP').prop("style", 'width: ' + newTamagotchi.currentHP / newTamagotchi.maxHP * 100 + '%');
      $('#foodLevel').prop("style", 'width: ' + newTamagotchi.foodLevel / 10 * 100 + '%');
      $('#happinessLevel').prop("style", 'width: ' + newTamagotchi.happinessLevel / 10 * 100 + '%');
      $('#restLevel').prop("style", 'width: ' + newTamagotchi.restLevel / 10 * 100 + '%');
      if (newTamagotchi.isDead) {
        window.location.reload(true);
        alert("your pet has died");
      }
    }, 1000);
    var clear = setInterval(function () {
      if (newTamagotchi.isDead) {
        clearInterval(timer);
      }
    }, 1000);
    //feed click function
    $('#feed-button').click(function () {
      console.log("feed");
      var food = $('#food').val();
      $('#log').prepend("<li>" + newTamagotchi.feed(food) + "</li>");
    });
    //play click function
    $('#play-button').click(function () {
      var game = $('#game').val();
      $('#log').prepend("<li>" + newTamagotchi.play(game) + "</li>");
    });

    //sleep click function
    $('#sleep-button').click(function () {
      var hours = parseInt($('#hours').val());
      $('#log').prepend("<li>" + newTamagotchi.sleep(hours) + "</li>");
    });
  });
});

},{"./../.env":1,"./../js/tamagotchi.js":2}]},{},[3]);
