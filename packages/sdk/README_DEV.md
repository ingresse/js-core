# Local development

## 1. Clone
First, you should clone the `js-core` mono-repo at __the same folder level__ of your application folder, example:

> SDK mono-repo: `~/projects/js-core`

> Your application: `~/projects/my-app`

__Clone Command__
```shell
cd ~/projects && git clone https://github.com/ingresse/js-core
```

## 2. Install SDK as local dependency
Well, in here, we just need to run the `install` command referencing to the mono-repo folder path:

```shell
cd ~/projects/my-app
```
```shell
npm i file:../js-core/packages/sdk
```

## 3. Development mode
Will run the watch-mode builder:
```shell
npm run dev
```

### Why `npm` and not other package manager?

With __NPM__, react applications can do the hot reload at development mode, when you modify some file of SDK project.

With __Yarn__, the `node_modules` files are not watched from react development server.

# Publish and Distribution steps

## NPM login
You must be a member of Ingresse organization in NPM panel, then:
```shell
npm login
```
Will ask for your NPM Username and Password.

## Features under development to be validated first
At Ingresse, the development team works with agile methods.
It's generally normal to have more than one interaction with Quality Assurance's team.

So, in cases of features under development, the team agrees to use the convention of `release candidate` versions.

## Release Candidate versions
When you finish your modifications in the SDK, you can modify the `package` version as the next release candidate.

Use the [semver.org](https://semver.org/) pattern to set a new version, but with the postfix `-rc1` or `-rc2` in the numeric sequence.

Every `-rc` version to be sended to QA tests, must be publish on `npm`:

```shell
cd ~/projects/js-core/packages/sdk
```

```shell
npm run deploy
```

## Final version: publishing / distributing
When the release candidate version or your consume-project is accepted by the Quality Assurance's team, just need to remove from `package.json` the `-rc` postfix, commit, merge, create the git release and publish to NPM:

```shell
cd ~/projects/js-core/packages/sdk
```
```shell
npm run deploy
```
