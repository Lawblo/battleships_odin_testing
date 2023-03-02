import { Gameboard } from "./gameboard";

// Ship types: 
// Carrier[5]
// Battleship[4]
// Destroyer[3]
// Submarine[3]
// Patrol Boat[2]

function Player(name) {
  let gameboard = Gameboard()


  return {name, gameboard}
}

export {Player}
