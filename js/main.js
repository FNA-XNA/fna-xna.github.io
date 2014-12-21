---
---

$(function() {
  // An array listing all the games which the sidebar can choose from.
  var games = [60,220,440,620,730,228960,241600,251470];

  // Initializes the variable "i".
  var i;

  // "For loop" that loops three times.
  for (i = 1; i <= 3; i++) {

    (function(index) {

      // Chooses a random whole number between 0 and the number of games listed in the above array.
      // Then it sets chosenGame equivalent to "games[x]" where x is the randomly generated number.
      // "games[x]" is used to represent the value in the array located at "x" relative to the beginning of the array.
      // So now chosenGame is a variable representing a randomly chosen game from the above array.
      var randomNumber = Math.floor(Math.random() * games.length);
      var chosenGame = games[randomNumber];

      // Sets variables for the game's Steam URL and Steam banner image.
      var chosenGameURL = 'http://store.steampowered.com/app/' + chosenGame + '/';
      var chosenGameImage = 'http://cdn.akamai.steamstatic.com/steam/apps/' + chosenGame + '/header.jpg';

      // Adds the Chosen Game's image and URL to the respective HTML elements.
      $('#sidebar-game-' + i).attr('href',chosenGameURL);
      $('#sidebar-game-image-' + i).attr('src',chosenGameImage);

      // Removes the game we used above from the array so we'll never have duplicates.
      games.splice(randomNumber, 1);
    })(i);
  }
});
