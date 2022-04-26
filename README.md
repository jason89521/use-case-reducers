# Vite React Library Template

Use this template to quickly set up the next react package.

## Files structure

This project assumes the development files are placed in the `dev` directory and the library files are placed in the `src` directory. If you want to use different directory, change the `include` field in `tsconfig.json` and the path of script in `index.html` for development files, and change the `include` field in `tsconfig.lib.json` for library files.

## Commands

### `yarn dev`

Run the development server.

### `yarn build`

Build the package files using lib mode. The generated files will be placed in the `dist` directory and the type declaration files will be placed in the `types` directory.

### `yarn build:demo`

This command will build a web app which is the same as the one you run with `yarn dev`.
