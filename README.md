<p align="center">
  <img src="https://github.com/kamleshchandnani/react-chunkable/blob/master/examples/src/logo/react-chunkable.png" />
  <br>
</p>

# react-chunkable 🍕
Simplest way to code split and load async chunks

## Installation
Download or clone the project and run the following command from the root directory
```
yarn
```
or
```
npm install
```

## Usage
Load as you go. In a traditional SPA, Instead of downloading the entire bundle on the client side, split your code which makes your user to download the piece of code as and when required.
Code splitting is a Webpack feature that enables a JS bundle within a single build to be split up and loaded on-demand in smaller parts.
#### Without Code Splitting
The entire app is bundled in a single js file i.e HomePage and ProfilePage are loaded at the first start itself, though the ProfilePage is not required at the first start.
```jsx
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";

class Routes extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={props => <HomePage {...props} />} />
          <Route path="/profile/:username" component={props => <ProfilePage {...props} />} />
        </Switch>
      </Router>
    );
  }
}
```
#### With Code Splitting
With Code Splitting only the HomePage is loaded at the first load. When the user visits ProfilePage at that time the chunk for ProfilePage will be loaded.
```jsx
import ComponentChunk from "react-chunkable";

const HomePage = props =>
  (<ComponentChunk
    componentProps={props}
    loadChunk={import(/*  webpackMode: "lazy",webpackChunkName: "home" */ "./pages/home")}
  />);

const ProfilePage = props =>
  (<ComponentChunk
    componentProps={props}
    loadChunk={import(/*  webpackMode: "lazy",webpackChunkName: "profile" */ "./pages/profile")}
  />);

class Routes extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={props => <HomePage {...props} />} />
          <Route path="/profile/:username" component={props => <ProfilePage {...props} />} />
        </Switch>
      </Router>
    );
  }
}

```
### Magic Comments
Webpack 2.4.0 introduced one feature called "magic comments". Now you can name the chunks corresponding to the modules/components you import.  

`import(/*  webpackMode: "lazy",webpackChunkName: "profile" */ "./pages/profile")` this statement indicates webpack to consider this as a split point and load it in a separate bundle.  

`webpackMode: "lazy"` indicates webpack to lazily load this chunk.  

`webpackChunkName: "profile"` allows you to name your chunk.  

[More Info on other available options](https://webpack.js.org/api/module-methods/#import-)

## Production
In the project directory, you can run:
`yarn build`
Builds the library for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Example
Check out the [example applications](https://github.com/kamleshchandnani/react-chunkable/tree/master/examples) to see how simple this is.

## Support
Please [open an issue](https://github.com/kamleshchandnani/react-chunkable/issues/new) for support.

## Like it?
:star: this repo

## License
MIT © [Kamlesh Chandnani](https://github.com/kamleshchandnani)
