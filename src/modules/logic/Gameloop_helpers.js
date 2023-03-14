import { Player } from "./player"
import { Gameboard } from "./gameboard"

export const GameloopHelpers = (() => {
  const SHIPS = [
    { type: 'Carrier', size: 5 },
    { type: 'Battleship', size: 4 },
    { type: 'Destroyer', size: 3 },
    { type: 'Submarine', size: 3 },
    { type: 'PatrolBoat', size: 2 },
  ]

  function initialize_player(name, board_id) {
    return { player: Player(name), gameboard: Gameboard(), board_id: board_id }
  }

  function attack(attacker = initialize_player(), receiver = initialize_player(), location) {
    attacker.player.perform_attack(location)
    const connection = receiver.gameboard.receive_attack(location)
    return connection
  }

  function get_boardstate(player) {
    return player.gameboard.board_content
  }


  return {
    initialize_player,
    attack,
    get_boardstate,
    SHIPS
  }
})()
