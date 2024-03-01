

# Prayer Times App

## Description
this is a simple app that shows the prayer times for the current day, it also shows the current time and the time remaining for the next prayer.

## features
- shows the prayer times for the current day.
- shows the current time.
- shows the time remaining for the next prayer.
- the app is responsive and works on all devices.
- get the prayer times for any city.

## API
the app uses the [Aladhan API](https://aladhan.com/prayer-times-api) to get the prayer times. 

## Technologies
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

## How to run
- clone the repo
- run `npm install`
- run `npm run dev`
- in the terminal you will see the local server address, open it in your browser and you will see the app running.

## To Do
- [ ] Add the ability to select a city and get the prayer times for it. 
- [ ] Add the ability to get the prayer times for a specific date.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list