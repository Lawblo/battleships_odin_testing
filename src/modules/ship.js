// Ship types: 
// Carrier[5]
// Battleship[4]
// Destroyer[3]
// Submarine[3]
// Patrol Boat[2]

function Ship(len) {
  let length = len
  let hits = 0

  function hit() {
    if(hits === length) {
      return 
    }
    hits += 1
  }

  function isSunk() {
    return hits >= length ? true : false
  }

  return {hit, isSunk, length}
}

export { Ship }
