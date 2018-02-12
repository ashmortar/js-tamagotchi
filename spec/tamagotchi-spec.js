import {Tamagotchi} from './../js/tamagotchi.js';

describe('Tamagotchi', function() {
  let testTamagotchi = new Tamagotchi("Ollie");

  beforeEach(function() {
    jasmine.clock().install();
    testTamagotchi.startTimer();
  })

  afterEach(function() {
    jasmine.clock().uninstall();
  })

  it('should have properties', function () {
    expect(testTamagotchi.name).toEqual("Ollie");
    expect(testTamagotchi.foodLevel).toEqual(10);
    expect(testTamagotchi.happinessLevel).toEqual(10);
    expect(testTamagotchi.restLevel).toEqual(10);
    expect(testTamagotchi.age).toEqual(0);
    expect(testTamagotchi.isDead).toEqual(false);
  })

  it('should decrease levels over time with setTimer', function() {
    jasmine.clock().tick(5001);
    expect(testTamagotchi.foodLevel).toEqual(5);
    expect(testTamagotchi.happinessLevel).toEqual(5);
    expect(testTamagotchi.restLevel).toEqual(5);
    expect(testTamagotchi.age).toEqual(0);
    })

    it('should change foodLevel when fed', function() {
      expect(testTamagotchi.feed("vegetable")).toEqual("Ollie HATED vegetable! Its health decreased 1 and its food level decreased 1");
      expect(testTamagotchi.foodLevel).toEqual(4);
      expect(testTamagotchi.currentHP).toEqual(9);
      expect(testTamagotchi.feed('fruit')).toEqual("Ollie ate fruit and its food level increased 1");
      expect(testTamagotchi.foodLevel).toEqual(5);
      expect(testTamagotchi.feed('meat')).toEqual("Ollie LOVED meat! Its health increased 1 and its food level increased 5");
      expect(testTamagotchi.foodLevel).toEqual(10);
      expect(testTamagotchi.currentHP).toEqual(10);
    })

    it('should change happinessLevel when play happens', function() {
      expect(testTamagotchi.play('fetch')).toEqual("Ollie HATED fetch! Its happiness level decreased 5.");
      expect(testTamagotchi.happinessLevel).toEqual(0);
      expect(testTamagotchi.play('tug-of-war')).toEqual("Ollie LOVED tug-of-war! Its happiness level increased 5.");
      expect(testTamagotchi.happinessLevel).toEqual(5);
      expect(testTamagotchi.play('checkers')).toEqual("Ollie played checkers! Its happiness level increased 1.");
      expect(testTamagotchi.happinessLevel).toEqual(6);
    })

    it('should change restLevel when sleep happens', function() {
      expect(testTamagotchi.sleep(5)).toEqual("Ollie slept for 5 hours");
      expect(testTamagotchi.foodLevel).toEqual(8);
      expect(testTamagotchi.restLevel).toEqual(10);
      expect(testTamagotchi.currentHP).toEqual(10);
    })

    it('should lose hp when food/rest/play are >10', function() {
      testTamagotchi.feed('fruit');
      testTamagotchi.feed('fruit');
      expect(testTamagotchi.foodLevel).toEqual(10);
      expect(testTamagotchi.restLevel).toEqual(10);
      expect(testTamagotchi.currentHP).toEqual(10);
      testTamagotchi.sleep(5);
      expect(testTamagotchi.restLevel).toEqual(15);
      expect(testTamagotchi.currentHP).toEqual(10);
      jasmine.clock().tick(4001);
      expect(testTamagotchi.currentHP).toEqual(6);
      testTamagotchi.feed('meat');
      testTamagotchi.feed('meat');
      expect(testTamagotchi.foodLevel).toEqual(14);
      expect(testTamagotchi.currentHP).toEqual(8);
      jasmine.clock().tick(1001);
      expect(testTamagotchi.currentHP).toEqual(7);
      expect(testTamagotchi.happinessLevel).toEqual(1);
      testTamagotchi.play('tug-of-war');
      testTamagotchi.play('tug-of-war');
      testTamagotchi.play('tug-of-war');
      testTamagotchi.play('tug-of-war');
      testTamagotchi.play('tug-of-war');
      jasmine.clock().tick(5001);
      expect(testTamagotchi.currentHP).toEqual(0);
      expect(testTamagotchi.isDead).toEqual(true);
      expect(testTamagotchi.feed('fruit')).toEqual("Ollie has died due to your inability to care for it :(");
      expect(testTamagotchi.play('checkers')).toEqual("Ollie has died due to your inability to care for it :(");
      expect(testTamagotchi.sleep(5)).toEqual("Ollie has died due to your inability to care for it :(");
    })

})
