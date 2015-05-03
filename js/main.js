$(function() {
  
  var windowwidth = $(window).width();

  // If the window width is that of the "laptop" value established by Jekyll, the 
  // following JavaScript should be executed, otherwise it should be ignored.
  if (windowwidth > 800) {

    // An array listing all the games which the sidebar can choose from.
    // Games are represented here by their SteamID.
    var games = [29160,95300,207650,208750,216290,222730,228960,236090,238630,239800,241600,251210,251370,251470,255340,270210,288020,307430,312200,312720,332200,334560,342490];

    // GAMES:
    // 29160  - Blueberry Garden
    // 95300  - Capsized
    // 207650 - A Virus Named TOM
    // 208750 - Apotheon
    // 216290 - Gateways
    // 222730 - Reus
    // 228960 - Skulls of the Shogun
    // 236090 - Dust: An Elysian Tail
    // 238630 - Fist Puncher
    // 239800 - Bleed
    // 241600 - Rogue Legacy
    // 251210 - Hive
    // 251370 - Escape Goat
    // 251470 - TowerFall Ascension
    // 255340 - Escape Goat 2
    // 270210 - Melody's Escape
    // 288020 - Rex Rocket
    // 307430 - Reversi
    // 312200 - Chasm
    // 312720 - Khet 2.0
    // 332200 - Axiom Verge
    // 334560 - Square Heroes
    // 342490 - Shipwreck

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
  }
});
