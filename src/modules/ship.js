
function Ship(length) {
  let hits = 0

  function hit() {
    if (hits === length) {
      return
    }
    hits += 1
  }

  function is_sunk() {
    return hits >= length ? true : false
  }

  return { hit, is_sunk, length }
}

export { Ship }
