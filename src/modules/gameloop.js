import { Player } from "./player"
import { Gameboard } from "./gameboard"

function handle_gameloop() {
  const create_player = name => {
    return { player: Player(name), gameboard: Gameboard() }
  }
}
