# nanoguard

Small module that allows you to guard a call to a function.

```
npm install nanoguard
```

## Usage

``` js
const Nanoguard = require('nanoguard')
const guard = new Nanoguard()

guard.wait()

// When the amount of wait() calls reflect continue() calls ready is called
guard.ready(function () {
  console.log('Ready to continue!')
})

guard.continue()
```

## API

#### `const guard = new Nanoguard()`

Make a new guard instance

#### `guard.wait()`

Increment the wait counter

#### `guard.continue()`

Decrement the wait counter. If the counter is `0` it calls all pending
ready functions.

#### `guard.ready(fn)`

Pass a function that is called when the wait counter is `0`.

#### `guard.destroy()`

Force sets the wait counter to `0` forever.

#### `const bool = guard.waiting`

Boolean indicating if the wait counter is `> 0`.

## License

MIT
