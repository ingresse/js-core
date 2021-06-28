# `@ingresse/tools`

#### Ingresse's Utilities, builded to simplify platform shared rules, assets and helpers usage.


## Usage

#### Browser

##### Latelly needed:

The `defer` attribute means:<br />
Load the script after everything and don't hold the render process.

```html
<!-- your HTML page -->
<html>
  <head>
    <script>
      /**
       * Need to be present before the remote "script" declaration
       */
      function onToolsLoad() {
        console.log(
          'Ingresse\'s Tools JS reference',
          ingresse
        )
      }
    </script>
    <script defer onload="onToolsLoad()" src="https://cdn.ingresse.com/tools/tools.umd.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

##### Immediatily needed:
```html
<!-- your HTML page -->
<html>
  <head>
    <script src="https://cdn.ingresse.com/tools/tools.umd.js"></script>
    <script>
      /**
       * Will be executed normally,
       * because the remote "script" regular declaration
       * forces the entire page wait to it's load
       */
      console.log(
        'Ingresse\'s Tools JS reference',
        ingresse
      )
    </script>
  </head>
  <body>
    ...
  </body>
</html>
```

#####

#### NPM Package

We prefer to use as browser script, but it's possible to use as npm package

##### Install
```
npm i -D @ingresse/tools`
```

##### ES module usage
```
import ingresse from '@ingresse/tools'

console.log(
  'Ingresse\'s Tools JS reference',
  ingresse
)
```

## Development

#### Recommended NodeJS version

Use `nvm` to switch NodeJS version without modify your default environment.

```
14.x
```
