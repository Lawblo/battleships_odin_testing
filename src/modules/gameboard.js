// Ship types: 
// Carrier[5]
// Battleship[4]
// Destroyer[3]
// Submarine[3]
// Patrol Boat[2]

import { Ship } from './ship.js'

function Gameboard() {
  let missed_attacks = []
  let ships = []
  let destroyed_ships = []

  function place_ship() {}

  function receive_attack(coordinates) {
    //determine whether the attack hit
    //if hit -> call hit() on correct ship
    //if miss -> add coord to missed attacks
  }

  function all_ships_sunk() {
    if (ships.length === 0) {
      return true
    }
    return false
  }

  return {place_ship, all_ships_sunk, missed_attacks}
}

export { Gameboard }
