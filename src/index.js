import './style.css'
import { create_gameboard } from './game_ui_elements/gameboard_ui'

document.addEventListener('DOMContentLoaded', () => {
  const game_container = document.createElement('div')
  game_container.appendChild(create_gameboard())
  document.querySelector('main').appendChild(game_container)
  const game_container2 = document.createElement('div')
  game_container2.appendChild(create_gameboard())
  document.querySelector('main').appendChild(game_container2)
})
