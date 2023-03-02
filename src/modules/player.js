import { Gameboard } from "./gameboard";

// Ship types: 
// Carrier[5]
// Battleship[4]
// Destroyer[3]
// Submarine[3]
// Patrol Boat[2]

function Player(name='computer') {
  const prev_moves = []

  const perform_move = coord_xy => {
    if (move_not_unique(coord_xy)) {
      return false
    }
    prev_moves.push(coord_xy)
    return true
  }

  const move_not_unique = (coord_xy) => {
    return prev_moves.some(coords => coords[0] === coord_xy[0] && coords[1] === coord_xy[1])
  } 


  const generate_random_move = () => {
    const rand_num = () => Math.floor(Math.random() * 7)
    let coords = [rand_num(), rand_num()]
    while (move_not_unique(coords)) {
      coords = [rand_num(), rand_num()]
    }
    return coords
  }

  return {
    name,
    perform_move, 
    generate_random_move
  }
}

export { Player }
