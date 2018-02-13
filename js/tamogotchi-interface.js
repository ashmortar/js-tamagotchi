import {Tamagotchi} from './../js/tamagotchi.js';

$(document).ready(function() {
  //game start function
  $('#start-play').submit(function(event) {
    event.preventDefault();
    let name = $('#name').val();
    let newTamagotchi = new Tamagotchi(name);
    $('#starter').hide();
    $('#play-area').fadeIn();
    newTamagotchi.startTimer();
    let timer = setInterval(() => {
      $('#petName').text(newTamagotchi.name);
      $('#age').text(newTamagotchi.age);
      $('#currentHP').prop("style", `width: ${(newTamagotchi.currentHP / newTamagotchi.maxHP)*100}%`);
      $('#foodLevel').prop("style", `width: ${(newTamagotchi.foodLevel / 10)*100}%`);
      $('#happinessLevel').prop("style", `width: ${(newTamagotchi.happinessLevel / 10)*100}%`);
      $('#restLevel').prop("style", `width: ${(newTamagotchi.restLevel / 10)*100}%`);
      if(newTamagotchi.isDead) {
        window.location.reload(true);
        alert("your pet has died")
      }
    }, 1000);
    let clear = setInterval(() => {
      if (newTamagotchi.isDead) {
        clearInterval(timer);
      }
    }, 1000);
    //feed click function
    $('#feed-button').click(function() {
      console.log("feed");
      let food = $('#food').val();
      $('#log').prepend("<li>" + newTamagotchi.feed(food) + "</li>");
    });
    //play click function
    $('#play-button').click(function() {
      let game = $('#game').val();
      $('#log').prepend("<li>" + newTamagotchi.play(game) + "</li>");
    });

    //sleep click function
    $('#sleep-button').click(function() {
      let hours = parseInt($('#hours').val());
      $('#log').prepend("<li>" + newTamagotchi.sleep(hours) + "</li>");
    });
  });
});
