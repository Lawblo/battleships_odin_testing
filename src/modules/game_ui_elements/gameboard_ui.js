const create_gameboard = () => {
  const gameboard = document.createElement('div')
  gameboard.classList.add('gameboard')
  gameboard.appendChild(create_gamebpard_coords()).classList.add('gameboard-left')
  gameboard.appendChild(create_gameboard_inner())
  gameboard.appendChild(document.createElement('div')).classList.add('gameboard-corner')
  gameboard.appendChild(create_gamebpard_coords()).classList.add('gameboard-bottom')
  return gameboard
}
const create_gamebpard_coords = () => {
  const coords = document.createElement('div')
  coords.classList.add('coord-section')
  for (let i = 1; i < 8; i++) {
    const num = i
    const coord_container = document.createElement('div')
    coord_container.classList.add('coord-container')
    coord_container.textContent = num;
    coords.appendChild(coord_container)
  }
  return coords
}


const create_gameboard_inner = () => {
  const gameboard_inner = document.createElement('div')
  gameboard_inner.classList.add('game-container')
  for (let y = 6; y > -1; y--) {
    for (let x = 0; x < 7; x++) {
      gameboard_inner.appendChild(create_square(x, y))
    }
  }
  return gameboard_inner
}

const create_square = (x, y) => {
  const square = document.createElement('div')
  square.id = `c${x}${y}`
  square.classList.add('square')
  get_square_location(x, y).forEach(location => square.classList.add(location))
  return square
}

const get_square_location = (x, y) => {
  let location = []
  if (x == 0) {
    location.push('square-left')
  }
  else if (x == 6) {
    location.push('square-right')
  }
  if (y === 0) {
    location.push('square-bottom')
  }
  else if (y === 6) {
    location.push('square-top')
  }
  return location
}

export { create_gameboard }
