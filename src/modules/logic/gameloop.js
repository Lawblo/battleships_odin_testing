import { GameloopHelpers } from "./Gameloop_helpers"
import { create_gameboard } from "../game_ui_elements/gameboard_ui"
import { place_ship_event } from "../game_ui_elements/event_listeners"

export function Gameloop() {
  const players = game_setup()
  const player1 = players[0]

  //TODO: Wait for player input
  place_ships(player1)
  // place_ships(player2)

  //while (!player1.gameboard.check_defeat() && !player2.gameboard.check_defeat()) {
  //  player_turn(players[0], players[1])
  //  players = [players[1], players[0]]
  //}

  ////TODO: Display winner
  //if (player1.gameboard.check_defeat()) {
  //  console.log('player2 wins')
  //}
  //else {
  //  console.log('player1 wins')
  //}
}

function game_setup() {
  const player1 = GameloopHelpers.initialize_player('player1', 'player1')
  const player2 = GameloopHelpers.initialize_player('player2', 'player2')
  const p1_div = document.querySelector(`#${player1.board_id}`)
  const p2_div = document.querySelector(`#${player2.board_id}`)
  p1_div.appendChild(create_gameboard())
  p2_div.appendChild(create_gameboard())
  return [player1, player2]
}

function place_ships(player) {
  let ships = GameloopHelpers.SHIPS
  select_ship_location(ships[0], player)
  select_ship_location(ships[0], player)
}

function select_ship_location(ship, player, computer = false) {
  console.log('Player', player.player.name, 'placing ship', ship.type, 'of size', ship.size)
  place_ship_event(ship, player)
}

function choose_attack(attacker) {
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

export function player_turn(attacker, defender) {
  let attack = choose_attack(attacker)
  let hit = defender.gameboard.receive_attack(attack)
  if (hit) {
    console.log('hit')
  } else {
    console.log('miss')
  }
}

