module.exports = class Nanoguard {
  constructor () {
    this._tick = 0
    this._fns = []
  }

  get waiting () {
    return this._tick > 0
  }

  wait () {
    this._tick++
  }

  continue (cb, err, val) {
    if (this._tick === 1) process.nextTick(continueNT, this)
    else this._tick--
    if (cb) cb(err, val)
  }

  waitAndContinue () {
    let once = false
    this.wait()
    return () => {
      if (once) return false
      once = true
      this.continue()
      return true
    }
  }

  continueSync (cb, err, val) {
    if (--this._tick) return
    while (this._fns !== null && this._fns.length) this._fns.pop()()
    if (cb) cb(err, val)
  }

  destroy () {
    const fns = this._fns
    if (fns) return
    this._fns = null
    while (fns.length) fns.pop()()
  }

  ready (fn) {
    if (this._fns === null || this._tick === 0) fn()
    else this._fns.push(fn)
  }
}

function continueNT (guard) {
  guard.continueSync()
}
