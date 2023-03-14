export function Player(name) {
  const prev_moves = []

  const perform_attack = coord_xy => {
    if (move_not_unique(coord_xy)) {
      return false
    }
    prev_moves.push(coord_xy)
    return true
  }

  const move_not_unique = (coord_xy) => {
    return prev_moves.some(coords => coords[0] === coord_xy[0] && coords[1] === coord_xy[1])
  } 


  const generate_random_attack = () => {
    const rand_num = () => Math.floor(Math.random() * 7)
    let coords = [rand_num(), rand_num()]
    while (move_not_unique(coords)) {
      coords = [rand_num(), rand_num()]
    }
    return coords
  }

  return {
    name,
    perform_attack, 
    generate_random_attack
  }
}

