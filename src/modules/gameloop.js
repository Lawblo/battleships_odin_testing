import { Player } from "./player"
import { Gameboard } from "./gameboard"

const SHIPS = [
  { type: 'Carrier', size: 5 },
  { type: 'Battleship', size: 4 },
  { type: 'Destroyer', size: 3 },
  { type: 'Submarine', size: 3 },
  { type: 'PatrolBoat', size: 2 },
]


function handle_gameloop() {
}

function place_ships(player) {

}

const update_info = message => {
  const info = document.querySelector('#info-message')
  info.textContent = message
}

const create_player = name => {
  return { player: Player(name), gameboard: Gameboard() }
}

export { handle_gameloop }
