import { Ship } from '../../src/modules/ship'
import { Gameboard } from '../../src/modules/gameboard.js'


describe('test ship', () => {
  const ship = Ship(5)
  it('is not sunk on initialization', () => {
    expect(ship.is_sunk()).toBe(false)
  })
  test('that ship is created with correct length', () => {
    expect(ship.length).toBe(5)
  })
  test('that ship is sunk if hits == length', () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.is_sunk()).toBe(false)
    ship.hit()
    expect(ship.is_sunk()).toBe(true)
  })
})

describe('test gameboard', () => {
  test('place ship puts ship in ships', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0])
    expect(gameboard.ships.length).toBe(1)
    expect(gameboard.ships[0].length).toBe(3)
  })
  test('adding 3 length h ship at 0.0, 0.1, 0.2', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0], true)
    const ship = gameboard.ships[0]
    expect(gameboard.board_content[0][0]).toBe(ship)
    expect(gameboard.board_content[0][1]).toBe(ship)
    expect(gameboard.board_content[0][2]).toBe(ship)
  })
  test('adding 3 length v ship at 0.0, 0.1, 0.2', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0], false)
    const ship = gameboard.ships[0]
    expect(gameboard.board_content[0][0]).toBe(ship)
    expect(gameboard.board_content[1][0]).toBe(ship)
    expect(gameboard.board_content[2][0]).toBe(ship)
  })
  test('return false if ship is placed on occupied spot', () => {
    const gameboard = Gameboard()
    expect(gameboard.place_ship(3, [0, 0], true)).toBe(true)
    expect(gameboard.place_ship(2, [1, 0], true)).toBe(false)
  })
  test('ship is not allowed to be placed off the board', () => {
    const gameboard = Gameboard()
    expect(gameboard.place_ship(3, [6, 6], true)).toBe(false)
    expect(gameboard.place_ship(3, [0, 0], true)).toBe(true)
  })
  test('receive missed attack', () => {
    const gameboard = Gameboard()
    expect(gameboard.receive_attack([0, 0])).toBe(false)
    expect(gameboard.missed_attacks[0]).toEqual([0, 0])
  })
  test('receive hit', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0])
    gameboard.receive_attack([0, 0])
    expect(gameboard.hits[0]).toEqual([0, 0])
    expect(gameboard.board_content[0][0].get_hits()).toEqual(1)
    expect(gameboard.board_content[1][0].get_hits()).toEqual(1)
    expect(gameboard.board_content[2][0].get_hits()).toEqual(1)
    expect(gameboard.ships[0].get_hits()).toEqual(1)
    expect(gameboard.board_content[3][0].get_hits()).toEqual(0)
  })
})
