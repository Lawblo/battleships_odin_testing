const create_gameboard = () => {
  const gameboard = document.createElement('div')
  gameboard.classList.add('game-container')
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      gameboard.appendChild(create_square(x, y))
    }
  }
  return gameboard
}

const create_square = (x, y) => {
  const square = document.createElement('div')
  square.id = `${x},${y}`
  square.classList.add('square')
  return square
}

const place_ships = (ships) => {

}

export {create_gameboard}
