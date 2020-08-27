## Local development and publish steps

### 1. Clone
First, you should clone the `js-core` mono-repo at __the same folder level__ of your application folder.

__Examples__

> SDK mono-repo: `~/projects/js-core`

> Your application: `~/projects/my-app`

__Command__
```shell
$ cd ~/projects && git clone https://github.com/ingresse/js-core
```

### 2. Modify the `main` package prop temporarily
At `package.json`, in the `main` prop, modify the path value to `src/index.js`.
But this modification shouldn't be versionated.

### 3. Install SDK as local dependency
Well, in here, we just need to run the `install` command referencing to the mono-repo folder path:

```shell
$ cd go/to/your/project/root/folder
$ npm i file:../js-core/packages/sdk
```

## Why `npm` and not other package manager?

With __NPM__, react applications can do the hot reload at development mode, when you modify some file of SDK project.

With __Yarn__, the `node_modules` files are not watched from react development server.
