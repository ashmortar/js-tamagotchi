import {Tamagotchi} from './../js/tamagotchi.js';
import apiKey from './../.env';


$(document).ready(function() {
  let ageCheck = -1;
  $('#starter').show();
  $('#play-area').hide();
  //game start function
  $('#start-play').submit(function(event) {
    event.preventDefault();
    let name = $('#name').val();
    let newTamagotchi = new Tamagotchi(name);

    let portrait = setInterval(() => {
      let lifeStage;
      switch (newTamagotchi.age) {
        case 0:
          lifeStage = "hatching";
          break;

        case 1:
          lifeStage = "growing";
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
        let promise = new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey.apiKey}&q=${lifeStage}&limit=25&offset=0&rating=G&lang=en`;
          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          };
          request.open("GET", url, true);
          request.send();
        });

        promise.then(function(response) {
          let body = JSON.parse(response);
          $('#representation').prop("src", body.data[Math.floor(Math.random() * 24)].images.fixed_height.url);
          alert("Your pet has grown!")
        }, function(error) {
          console.log(error.message);
        });
        ageCheck = newTamagotchi.age;
      }
    }, 1000);



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
        alert("your pet has died");
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
