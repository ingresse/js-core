# `@ingresse/sdk` local development and publish steps

## Clone
First, you should clone the `js-core` mono-repo at the same folder level of your application folder.

### Example
SDK mono-repo: `~/projects/js-core`
Your application: `~/projects/my-app`

### Command
```
cd ~/projects && git clone https://github.com/ingresse/js-core
```

## Modify the `main` package prop temporarily
At `package.json`, in the `main` prop, modify the path value to `src/index.js`.
But this modification shouldn't be versionated.

## Install SDK as local dependency
Well, in here, we just need to run the `install` command referencing to the mono-repo folder path:

```shell
you@computer:~/projects/my-app$ npm i file:../js-core/packages/sdk
```

### Why `npm` and not other package manager?
With NPM, react applications can do the hot reload at development mode, when you modify some file of SDK project.
With Yarn, the node_modules files are not watched from react development server.
