import './style.css'
import {create_gameboard } from './modules/game_ui_elements/gameboard_ui.js'
import { GameloopHelpers, Gameloop } from './modules/gameloop'

document.addEventListener('DOMContentLoaded', () => {
  const p1_div = document.querySelector('#player1')
  p1_div.appendChild(create_gameboard())
  const p2_div = document.querySelector('#player2')
  p2_div.appendChild(create_gameboard())

  Gameloop()
  
})
