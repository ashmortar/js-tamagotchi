import {Tamagotchi} from './../js/tamagotchi.js';

$(document).ready(function() {
  //game start function
  $('#start-play').submit(function(event) {
    event.preventDefault();
    let name = $('#name').val();
    let newTamagotchi = new Tamagotchi(name);
    $('#play-button').hide();
    $('#play-area').fadeIn();
    newTamagotchi.startTimer();
    let timer = setInterval(() => {
      $('#petName').text(newTamagotchi.name);
      $('#age').text(newTamagotchi.age);
      $('#currentHP').prop("style", `width: ${(newTamagotchi.currentHP / newTamagotchi.maxHP)*100}%`);
      $('#foodLevel').prop("style", `width: ${(newTamagotchi.foodLevel / 10)*100}%`);
      $('#happinessLevel').prop("style", `width: ${(newTamagotchi.happinessLevel / 10)*100}%`);
      $('#restLevel').prop("style", `width: ${(newTamagotchi.restLevel / 10)*100}%`);
    }, 500);
  });

  //feed click function

  //play click function

  //sleep click function

});
