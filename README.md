[![icky](https://github.com/phenomnomnominal/icky/blob/master/docs/logo.png)](https://github.com/phenomnomnominal/icky/)

[![npm version](https://img.shields.io/npm/v/icky.svg)](https://www.npmjs.com/package/icky)

**`ICKY`** is a super simple way to track ickiness in your codebase!

Just pick a string that you want to use to indicate ickiness (defaults to **`ICKY`**), and add it whenever you see something you don't like in your codebase, but can't fix it right now!

Add extra "!" for more ickiness!

## Set up:

```bash
npm install icky --save-dev
```

## Run:

```js
// src/add.js
function add(a, b) {
  // ICKY
  return a + b + 0;
}
```

```html
<!-- src/index.html -->
<html>
  <div>
    <!-- ICKY!!!! -->
    <div class="button"></div>
    <!-- ICKY!!!! -->
    <div class="button"></div>
  </div>
</html>
```

```bash
icky # Total ickiness: 11
```

### Options

| Name                  | Description                                  | Default      |
| --------------------- | -------------------------------------------- | ------------ |
| `--files="[value]"`   | Glob pattern for the files you want to check | `./src/**/*` |
| `--pattern="[value]"` | String that you use to indicate ickiness!    | `ICKY`       |
