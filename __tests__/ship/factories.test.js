import { Ship } from '../../src/modules/ship'
import {Gameboard} from '../../src/modules/gameboard.js'

describe('test ship', () => {

  it('is not sunk on initialization', () => {
    const ship = Ship(1)
    expect(ship.isSunk()).toBe(false)
  })

  test('that ship is sunk if hits == length', () => {
    const ship = Ship(1)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })

  test('that ship is created with correct length', () => {
    const ship = Ship(5)
    expect(ship.length).toBe(5)
  })
})


describe('test gameboard', () => {
  test('place ships with the ship factory', () => {
    const gameboard = Gameboard()
  })
  test('gather missed attacks', () => {})
  test('gather successful attacks on correct ship', () => {})
  test('correct placement of ship', () => {})
  test('wether all ships of player has been sunk', () => {})
  test('correct placement of ship', () => {})
})
