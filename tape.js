const Nanoguard = require('./')
const tape = require('tape')

tape('basic', function (t) {
  const g = new Nanoguard()

  g.ready(function () {
    t.pass('is ready')
    t.end()
  })
})

tape('wait and then resume', function (t) {
  const g = new Nanoguard()
  let ready = false

  g.wait()
  g.ready(function () {
    ready = true
    t.pass('is ready')
  })

  t.notOk(ready)
  g.continue()
  t.ok(ready)
  t.end()
})

tape('multiple ready and wait and then resume', function (t) {
  const g = new Nanoguard()
  let ready = 0

  g.ready(function () {
    t.same(++ready, 1)
    t.pass('is ready')
  })

  t.same(ready, 1)
  g.wait()
  g.wait()

  g.ready(function () {
    t.same(++ready, 2)
    t.pass('is ready again')
  })

  t.same(ready, 1)
  g.continue()
  t.same(ready, 1)
  g.continue()
  t.same(ready, 2)
  t.end()
})
