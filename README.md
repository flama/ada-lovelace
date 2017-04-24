# Wikimina

> A portal to inspire women to achieve new heights

## Dependencies

This project requires you to have `yarn` and `git` installed in your workspace.

## Install
This should install everything you need under the `node_modules` folder.
Be patient. It might take a while.

```bash
yarn install
```

## Run local webserver
This will run the livereload server under `localhost:3000`.
Don't bother refreshing the page or even opening your browser, this script will do it for you.

```bash
yarn start
```

## Run tests
This runs the livereload test server locally.
Everything you need to know in order to control the server will be onscreen.

```bash
yarn test
```

### With coverage data
Slower than its vanilla counterpart, but prints a coverage table at the end.

```bash
yarn test -- --coverage
```
Don't forget the floating `--`. 

## Create the build folder
Creates locally the build folder. Usually, you won't need to use this.

```bash
yarn build
```

## Deploy current branch do production
This will build and commit the current branch to the `gh-pages` branch.
Try to always use this within the `master` branch.

```bash
yarn deploy
```
