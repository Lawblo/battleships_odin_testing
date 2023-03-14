
function Ship(length) {
  let hits = 0

  function hit() {
    if (hits === length) {
      return
    }
    hits = hits + 1
  }

  function is_sunk() {
    return hits >= length ? true : false
  }

  function get_hits() {
    return hits
  }

  return { hit, is_sunk, length, get_hits, }
}

export { Ship }
