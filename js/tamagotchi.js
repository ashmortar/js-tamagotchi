
export class Tamagotchi {


  constructor(name) {
    const foodTypes = ['fruit', 'vegetable', 'meat'];
    const playTypes = ['fetch', 'rugby', 'tug-of-war'];

    this.name = name;
    this.foodLevel = 10;
    this.happinessLevel = 10;
    this.restLevel = 10;
    this.age = 0;
    this.counter = 0;
    this.isDead = false;
    this.maxHP = 10;
    this.currentHP = 10;
    this.favoriteFood = 'meat';  //foodTypes[Math.floor(Math.random() * (foodTypes.length))];
    this.favoritePlay = 'tug-of-war';  //playTypes[Math.floor(Math.random() * (playTypes.length))];
  }

  startTimer() {
    setInterval(() => {
      this.foodLevel --;
      this.happinessLevel --;
      this.restLevel --;
      this.counter ++;
      if (this.counter % 10 === 0) {
        this.age ++;
        this.maxHP = 10 + (10 * this.age);
      }
      if (this.happinessLevel < 0 || this.happinessLevel > 10) {
        this.currentHP -= 1;
      }
      if (this.restLevel < 0 || this.restLevel > 10) {
        this.currentHP -= 1;
      }
      if (this.foodLevel < 0 || this.foodLevel > 10) {
        this.currentHP -= 1;
      }
      if (this.currentHP <= 0) {
        this.isDead = true;
      }
    }, 1000);
  }

  runChecks() {
    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP;
    }
  }

  feed(food) {
    if (this.isDead) {
      return `${this.name} has died due to your inability to care for it :(`;
    }
    if(food === this.favoriteFood) {
      this.foodLevel += 5;
      this.currentHP += 1;
      this.runChecks();
      return `${this.name} LOVED ${food}! Its health increased 1 and its food level increased 5`;
    } else if (this.favoriteFood === 'vegetable' && food === 'meat') {
      this.foodLevel -= 1;
      this.currentHP -= 1;
      this.runChecks();
      return `${this.name} HATED ${food}! Its health decreased 1 and its food level decreased 1`;
    } else if (this.favoriteFood === 'meat' && food === 'vegetable') {
      this.foodLevel -= 1;
      this.currentHP -= 1;
      this.runChecks();
      return `${this.name} HATED ${food}! Its health decreased 1 and its food level decreased 1`;
    } else {
      this.foodLevel += 1;
      this.runChecks();
      return `${this.name} ate ${food} and its food level increased 1`;
    }
  }

  play(play){
    if (this.isDead) {
      return `${this.name} has died due to your inability to care for it :(`;
    }
    if(play === this.favoritePlay) {
      this.happinessLevel += 5;
      this.runChecks();
      return `${this.name} LOVED ${play}! Its happiness level increased 5.`;
    } else if ( this.favoritePlay === 'fetch' && play === 'tug-of-war' ){
      this.happinessLevel -= 5;
      this.runChecks();
      return `${this.name} HATED ${play}! Its happiness level decreased 5.`;
    } else if ( this.favoritePlay === 'tug-of-war' && play === 'fetch' ) {
      this.happinessLevel -= 5;
      this.runChecks();
      return `${this.name} HATED ${play}! Its happiness level decreased 5.`;
    } else {
      this.happinessLevel += 1;
      this.runChecks();
      return `${this.name} played ${play}! Its happiness level increased 1.`;
    }
  }

  sleep(hours) {
    if (this.isDead) {
      return `${this.name} has died due to your inability to care for it :(`;
    }
    this.restLevel += hours;
    this.currentHP += Math.ceil(hours/2);
    this.foodLevel -= Math.floor(hours/2);
    this.runChecks();
    console.log(this.currentHP);
    return `${this.name} slept for ${hours} hours`;
  }

}
