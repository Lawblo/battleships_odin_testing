import './style.css'
import { create_gameboard } from './game_ui_elements/gameboard_ui'
import { Gameloop_helpers } from './modules/gameloop'

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  main.appendChild(create_gameboard())
  const info_message = document.createElement('div')
  info_message.id = 'info-message'
  main.appendChild(info_message)

  Gameloop_helpers()
})
