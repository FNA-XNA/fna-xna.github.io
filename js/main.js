$(function() {
  
  var windowwidth = $(window).width();

  // If the window width is that of the "laptop" value established by Jekyll, the 
  // following JavaScript should be executed, otherwise it should be ignored.
  if (windowwidth > 800) {

    // An array listing all the games which the sidebar can choose from.
    // Games are represented here by their SteamID.
    var games = [
      29160,  // Blueberry Garden
      55000,  // Flotilla
      95300,  // Capsized
      105600, // Terraria
      107100, // Bastion
      115800, // Owlboy
      200910, // Before the Echo
      207140, // SpeedRunners
      207420, // Wizorb
      207650, // A Virus Named TOM
      208750, // Apotheon
      211440, // The Adventures of Shuggy
      216290, // Gateways
      218820, // Mercenary Kings
      222730, // Reus
      224500, // Gnomoria
      224760, // FEZ
      228960, // Skulls of the Shogun
      236090, // Dust: An Elysian Tail
      238630, // Fist Puncher
      239800, // Bleed
      240440, // Quadrilateral Cowboy Art Book
      241000, // Jon Shafer's At the Gates
      241600, // Rogue Legacy
      251210, // Hive
      251370, // Escape Goat
      251470, // TowerFall Ascension
      252390, // DwarfCorp
      255340, // Escape Goat 2
      259000, // Dead Pixels II
      262690, // Little Racers STREET
      263960, // Wyv and Keep
      268990, // The Dishwasher: Vampire Smile
      270210, // Melody's Escape
      274900, // Murder Miners
      283640, // Salt and Sanctuary
      286000, // Tooth and Tail
      288020, // Rex Rocket
      291610, // Growing Pains
      297660, // Super Rad Raygun
      303590, // Hidden in Plain Sight
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
      364060, // Capsule Force
      365120, // Curse of the Crescent Isle DX
      365450, // Hacknet
      368620, // Timespinner
      383190, // SUMICO - The Numbers Game
      396350, // Bleed 2
      401710, // Flinthook
      402330, // Press X to Not Die
      405290, // Charlie Murder
      405710, // Staxel
      416600, // Full Metal Furies
      422810, // River City Ransom: Underground
      427830, // Hybrid Beasts
      434820, // Brushwood Buddies
      445070, // Tatsu
      449320, // Dino Eggs: Rebirth
      460970, // Soulcaster I/II
      462860, // Crawlers and Brawlers
      466350, // Fossil Echo
      495680, // Overdriven Reloaded
      504230, // Celeste
      506870, // Unexplored
      520680, // Lost Cities
      548220, // Paladin
      548110, // Star-Twine
      561740, // MidBoss
      602080, // Solaroids: Prologue
      628830, // Ultra Hat Dimension
      701040, // CometStriker
      732810, // Slipstream
      // 778700, // Amorous (NSFW)
      915720, // Session Seven
      975510, // Panzer Paladin
      985890, // Streets of Rage 4
      1016920, // Unrailed!
      1170300, // Glitchangels
      1258040, // Super Bernie World
      1280300, // Steel Assault
      1300650, // Rodent & Plan: Secret Origin
      1325260, // Kitsune Tails
      1361510, // TMNT: Shredder's Revenge
      1503430, // Groov
      1637730, // Crystal Project
      1747830, // Blossom Tales 2
      1765980, // Miasma 2: Freedom Uprising
      1771340, // Miasma: Citizens of Free Thought
      1800730, // I MAED A GAM3 W1TH Z0MB1ES 1N IT!!!1
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
