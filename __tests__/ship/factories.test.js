import { Ship } from '../../src/modules/ship'
import { Gameboard } from '../../src/modules/gameboard.js'
import { Player } from '../../src/modules/player.js'
import { GameloopHelpers } from '../../src/modules/gameloop'

describe('test ship', () => {

  test('is not sunk on initialization', () => {
    const ship = Ship(5)
    expect(ship.is_sunk()).toBe(false)
  })

  test('that ship is created with correct length', () => {
    const ship = Ship(5)
    expect(ship.length).toBe(5)
  })

  test('that ship is sunk if hits == length', () => {
    const ship = Ship(5)
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.is_sunk()).toBe(false)
    ship.hit()
    expect(ship.is_sunk()).toBe(true)
  })
})

describe('test ship placement on board', () => {

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
    expect(gameboard.board_content[1][0]).not.toBe(ship)
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
})

describe('test receiving attacks', () => {

  test('receive missed attack', () => {
    const gameboard = Gameboard()
    expect(gameboard.receive_attack([0, 0])).toBe(false)
    expect(gameboard.missed_attacks[0]).toEqual([0, 0])
  })
  test('successful hit recorded', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0])
    gameboard.receive_attack([0, 0])
    expect(gameboard.connecting_attacks[0]).toEqual([0, 0])
  })
  test('all coords with hit ship register', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0])
    gameboard.receive_attack([0, 0])
    expect(gameboard.board_content[0][0].get_hits()).toEqual(1)
    expect(gameboard.board_content[0][1].get_hits()).toEqual(1)
    expect(gameboard.board_content[0][2].get_hits()).toEqual(1)
  })
  test('ship in gameboard.ships record hit', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0])
    gameboard.receive_attack([0, 0])
    expect(gameboard.ships[0].get_hits()).toEqual(1)
  })
  test('2nd ship not hit not record any hits', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(3, [0, 0], true)
    gameboard.place_ship(3, [0, 1], true)
    gameboard.receive_attack([0, 0])
    expect(gameboard.board_content[1][0].get_hits()).toBe(0)
  })
  test('check if hit ship is destroyed', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(2, [0, 0])
    let ship = gameboard.ships[0]
    gameboard.receive_attack([0, 0])
    gameboard.receive_attack([1, 0])
    expect(ship.get_hits()).toBe(2)
    expect(gameboard.destroyed_ships).toContain(ship)
  })

  test('check wether all ships are destroyed', () => {
    const gameboard = Gameboard()
    gameboard.place_ship(2, [0, 0])
    gameboard.receive_attack([0, 0])
    expect(gameboard.check_defeat()).toBe(false)
    gameboard.receive_attack([1, 0])
    expect(gameboard.check_defeat()).toBe(true)
  })
})

describe('test computer', () => {
  test('computer can generate random valid moves', () => {
    const computer = Player()
    const valid_range = num => num < 7 && num >= 0
    const move = computer.generate_random_attack()
    expect(move.every(valid_range)).toBe(true)
  })

  test('perform move checks for discards previous moves', () => {
    const player = Player()
    player.perform_attack([0, 0])
    expect(player.perform_attack([0, 0])).toBe(false)
    expect(player.perform_attack([1, 0])).toBe(true)
  })
})

describe('GameloopHelpers tests', () => {
  const player1 = GameloopHelpers.initialize_player('p1')
  const player2 = GameloopHelpers.initialize_player('p2')
  player2.gameboard.place_ship(5, [0, 0])
  player2.gameboard.place_ship(5, [0, 1])

  test('player 1 attacks on player 2 returns success', () => {
    expect(GameloopHelpers.attack(player1, player2, [0, 0])).toBe(true)
    expect(GameloopHelpers.attack(player1, player2, [5, 0])).toBe(false)
  })
  test('player 1 attacks on player 2 is recorded on gameboard', () => {
    expect(player2.gameboard.ships[0].get_hits()).toBe(1)
    expect(player2.gameboard.ships[1].get_hits()).toBe(0)
  })
})
