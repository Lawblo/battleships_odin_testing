// Ship types: 
// Carrier[5]
// Battleship[4]
// Destroyer[3]
// Submarine[3]
// Patrol Boat[2]

import { Ship } from './ship.js'

function Gameboard() {
  let board_content = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  let missed_attacks = []
  let hits = []
  let ships = []
  let destroyed_ships = []

  function place_ship(length, start, is_horizontal = true) {
    let ship = Ship(length)
    let place_coords = is_horizontal
      ? get_horizontal(length, start)
      : get_vertical(length, start)

    if (place_coords.some(ship_off_board) || place_coords.some(ship_overlaps)) {
      return false
    }
    for (let i = 0; i < place_coords.length; i++) {
      let coord = place_coords[i]
      add_to_board(coord, ship)
    }
    ships.push(ship)
    return true
  }

  function add_to_board(coord, ship) {
    let x = coord[0]
    let y = coord[1]
    board_content[y][x] = ship
  }

  function get_horizontal(length, start) {
    let coords = []
    for (let x = start[0]; x < start[0] + length; x++) {
      let y = start[1]
      coords.push([x, y])
    }
    return coords
  }

  function get_vertical(length, start) {
    let coords = []
    for (let y = start[1]; y < start[1] + length; y++) {
      let x = start[0]
      coords.push([x, y])
    }
    return coords
  }

  function ship_off_board(coordinates) {
    return coordinates.some(coord => coord > 6 || coord < 0)
  }


  function ship_overlaps(coordinates) {
    const x = coordinates[0]
    const y = coordinates[1]

    if (board_content[y][x]) {
      return true
    }
    return false
  }

  function receive_attack(coordinates) {
    //determine whether the attack hit
    //if hit -> call hit() on correct ship
    //if miss -> add coord to missed attacks
    let x = coordinates[0]
    let y = coordinates[1]

    if (!board_content[y][x]) {
      missed_attacks.push([x, y])
      return false
    }
    board_content[y][x].hit()
    hits.push([x, y])
    return true
  }

  function all_ships_sunk() {
    if (ships.length === 0) {
      return true
    }
    return false
  }

  return {
    hits,
    ships,
    board_content,
    place_ship,
    all_ships_sunk,
    missed_attacks,
    receive_attack,
    get_horizontal,
    get_vertical
  }
}

export { Gameboard }
