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

export function Gameloop() {

  const player1 = GameloopHelpers.initialize_player('player1', 'player1')
  const player2 = GameloopHelpers.initialize_player('player2', 'player2')
  let players = [player1, player2]

  //TODO: Wait for player input
  player1.gameboard.place_ship(5, [2, 0])
  player1.gameboard.place_ship(4, [3, 0])
  player1.gameboard.place_ship(3, [4, 0])
  player1.gameboard.place_ship(3, [5, 0])
  player1.gameboard.place_ship(2, [6, 0])

  //TODO: Create gameboard function to generate random placements
  player2.gameboard.place_ship(5, [2, 0])
  player2.gameboard.place_ship(4, [3, 0])
  player2.gameboard.place_ship(3, [4, 0])
  player2.gameboard.place_ship(3, [5, 0])
  player2.gameboard.place_ship(2, [6, 0])

  while (!player1.gameboard.check_defeat() && !player2.gameboard.check_defeat()) {
    player_turn(players[0], players[1])
    players = [players[1], players[0]]
  }

  //TODO: Display winner
  if (player1.gameboard.check_defeat()) {
    console.log('player2 wins')
  }
  else {
    console.log('player1 wins')
  }
}

function choose_attack(attacker = GameloopHelpers.initialize_player()) {
  let coords = []
  if (attacker.board_id === 'player2') {
    coords = attacker.player.generate_random_attack()
  }
  else {
    //TODO: wait for player input 
    coords = attacker.player.generate_random_attack()
  }
  console.log('Attacking', coords)
  return coords
}

export function player_turn(attacker = GameloopHelpers.initialize_player(), defender = GameloopHelpers.initialize_player()) {
  let attack = choose_attack(attacker)
  let hit = defender.gameboard.receive_attack(attack)
  if (hit) {
    console.log('hit')
  } else {
    console.log('miss')
  }
}


