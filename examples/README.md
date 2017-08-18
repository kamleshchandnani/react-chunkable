<p align="center">
  <img src="https://github.com/kamleshchandnani/react-chunkable/blob/master/examples/src/logo/react-chunkable.png" />
  <br>
</p>

# Example of using react-chunkable
## Installation
Download or clone the project and run the following command from the root directory
```
cd examples

yarn

yarn start
```
## Folder Structure

The project structure will look like this:

```
examples
  ├──config       (Webpack Configs)
  └──public       (Exposed Folder)
    ├──build      (Production ready)
    └──index.html
  └──src      
    ├──api        (All the API's)
    ├──components (Presentational components)
    ├──containers (Connected/redux components)
    ├──pages      (Top level routes)
    ├──store      (Redux config)
    ├──index.js   (Entry point of app)
    ├──routes.js  (Routes definitions async chunks)
    └──routes1.js (Routes definitions without async)
  
```


## Usage
Open routes.js and type
```jsx
import ComponentChunk from "react-chunkable";
```

```jsx
<ComponentChunk
  componentProps={props}
  loadChunk={import(/*  webpackMode: "lazy" webpackChunkName: "home" */ "./pages/home")}
  />
```
### Props  
`componentProps` : Route props or any other props which needs to be accessible at that route.  
`loadChunk` : Name of the module/component which needs to be loaded asynchronously.

## Dev Mode

```
yarn start

> Running on http://localhost:3001
```

## Production
This will compile, optimize the app for production and output in `build` folder
```
yarn build
```
