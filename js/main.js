$(function() {
  
  var windowwidth = $(window).width();

  // If the window width is that of the "laptop" value established by Jekyll, the 
  // following JavaScript should be executed, otherwise it should be ignored.
  if (windowwidth > 800) {

    // An array listing all the games which the sidebar can choose from.
    // Games are represented here by their SteamID.
    var games = [
      29160,  // Blueberry Garden
      95300,  // Capsized
      105600, // Terraria
      200910, // Before the Echo
      207140, // SpeedRunners
      207420, // Wizorb
      207650, // A Virus Named TOM
      208750, // Apotheon
      211440, // The Adventures of Shuggy
      216290, // Gateways
      222730, // Reus
      224500, // Gnomoria
      228960, // Skulls of the Shogun
      236090, // Dust: An Elysian Tail
      238630, // Fist Puncher
      239800, // Bleed
      240440, // Quadrilateral Cowboy Art Book
      241600, // Rogue Legacy
      251210, // Hive
      251370, // Escape Goat
      251470, // TowerFall Ascension
      255340, // Escape Goat 2
      263960, // Wyv and Keep
      270210, // Melody's Escape
      274900, // Murder Miners
      283640, // Salt and Sanctuary
      288020, // Rex Rocket
      307430, // Reversi
      312200, // Chasm
      312280, // Simply Chess
      312720, // Khet 2.0
      332200, // Axiom Verge
      334560, // Square Heroes
      342490, // Shipwreck
      344740, // Cryptark
      346510, // Hyphen
      354560, // We Are Legion
      356420, // Interloper
      365120, // Curse of the Crescent Isle DX
      365450, // Hacknet
      434820, // Brushwood Buddies
      460970, // Soulcaster I/II
    ];

    // Initializes the variable "i".
    var i;

    // "For loop" that loops four times.
    for (i = 1; i <= 4; i++) {

      (function(index) {

        // Chooses a random whole number between 0 and the number of games listed in the above array.
        // Then it sets chosenGame equivalent to "games[x]" where x is the randomly generated number.
        // "games[x]" is used to represent the value in the array located at "x" relative to the beginning of the array.
        // So now chosenGame is a variable representing a randomly chosen game from the above array.
        var randomNumber = Math.floor(Math.random() * games.length);
        var chosenGame = games[randomNumber];

        // Sets variables for the game's Steam URL and Steam banner image.
        var chosenGameURL = '//store.steampowered.com/app/' + chosenGame + '/';
        var chosenGameImage = '//steamcdn-a.akamaihd.net/steam/apps/' + chosenGame + '/header.jpg';

        // Adds the Chosen Game's image and URL to the respective HTML elements.
        $('#sidebar-game-' + i).attr('href',chosenGameURL);
        $('#sidebar-game-image-' + i).attr('src',chosenGameImage);

        // Removes the game we used above from the array so we'll never have duplicates.
        games.splice(randomNumber, 1);
      })(i);
    }
  }
});
