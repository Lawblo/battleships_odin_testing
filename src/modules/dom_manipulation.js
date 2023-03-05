import { Gameloop_helpers } from "./gameloop"

const DomManipulation = (() => {
  const update_info = message => {
    const info = document.querySelector('#info-message')
    info.textContent = message
  }

  const update_gameboard = (player) => {
  }

  return {
    update_info,
    update_gameboard
  }
})()
