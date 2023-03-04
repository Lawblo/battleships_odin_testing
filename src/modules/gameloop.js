import { Player } from "./player"
import { Gameboard } from "./gameboard"


const update_info = message => {
  const info = document.querySelector('#info-message')
  info.textContent = message
}

export const Gameloop_helpers = (() => {
  const SHIPS = [
    { type: 'Carrier', size: 5 },
    { type: 'Battleship', size: 4 },
    { type: 'Destroyer', size: 3 },
    { type: 'Submarine', size: 3 },
    { type: 'PatrolBoat', size: 2 },
  ]

  function initialize_player(name) {
    return { player: Player(name), gameboard: Gameboard() }
  }

  function attack(attacker = initialize_player(), receiver = initialize_player(), location) {
    attacker.player.perform_attack(location)
    const connection = receiver.gameboard.receive_attack(location)
    return connection
  }

  function get_boardstate(player = initialize_player()) {
    return player.gameboard.board_content
  }

  return { initialize_player, update_info, attack, get_boardstate }
})






