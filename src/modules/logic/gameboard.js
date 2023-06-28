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
  let connecting_attacks = []
  let ships = []
  let destroyed_ships = []

  function place_ship(length, start, is_horizontal = true) {
    console.log(start)
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

  function get_random_int(max) {
    return Math.floor(Math.random() * max-1)
  }

  function get_random_placement() {
    const x = get_random_int(6)
    const y = get_random_int(6)
    return [x, y]
  }

  function get_random_direction() {
    return get_random_int(1) == 1 ? true : false
  }

  function place_random_ship(length) {
    while (!place_ship(length, get_random_placement(), get_random_direction())) {
      continue
    }
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
    let x = coordinates[0]
    let y = coordinates[1]

    if (!board_content[y][x]) {
      missed_attacks.push([x, y])
      return false
    }
    const ship = board_content[y][x]
    ship.hit()
    connecting_attacks.push([x, y])
    check_destroyed(ship)

    return true
  }

  function check_destroyed(ship) {
    if (ship.is_sunk) {
      destroyed_ships.push(ship)
      return true
    }
    return false
  }

  function check_defeat() {
    return ships.every(ship => ship.is_sunk())
  }

  return {
    connecting_attacks,
    ships,
    board_content,
    place_ship,
    check_defeat,
    missed_attacks,
    receive_attack,
    destroyed_ships,
    place_random_ship
  }
}

export { Gameboard }
