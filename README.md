# meteor-webpack-react-kickstart

Kickstart your project with the perfect Web App setup: Meteor + Webpack + React

You can see a demo at [http://ReactKickstarter.meteor.com](http://ReactKickstarter.meteor.com/).

Nothing to setup, nothing to worry about. Replace the TodoApp (`react/todo`) by your own App, update the routes in `react/index.js` and you're good to go!

If you are new to React, you should learn the basics first. You can watch [those videos about React fundamentals](https://egghead.io/series/react-fundamentals) (little bit old but cover the basics very well).

If you are new to Meteor, you should go through the [Meteor Todo tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app).

Then, you can try the [TodoApp example](https://github.com/thereactivestack/meteor-webpack-react-kickstart/tree/master/react/todo) this project comes with.

COMING SOON - A serie of videos is in process of being made to learn from scratch how to use Meteor with React. Watch this repo or [follow me on Twitter](https://twitter.com/benoit_tremblay) to stay tuned!

# What's so wonderful about this project?
- You have hot reload of your React component with no page refresh (10x faster than Meteor hot-reload, no jokes)
- You can use ES6 modules to organize your React components
- You can access any Meteor global variables like collections, ReactMeteorData, Meteor.call(), Meteor.user(), ...
- You can require CSS inside `componentWillMount` of your React components (read the section to learn more)
- You can require images so they get bundled automatically (`<img src={require('./img/check.png')} alt="" />`)
- You can use Blaze templates with [BlazeToReact](https://atmospherejs.com/thereactivestack/blazetoreact)

# Folder structure
You might be confused because the folder structure is not how it used to be with Meteor. Here is what you need to know about each folder:

- `react`: This is where all your React components, assets and CSS is going. The only purpose of this folder is to be able to change files without having Meteor restart. It has to be outside of Meteor. Their is no other way (at least for now). The package `webpack:hot-reload` will take care of updating the javascript on the client without refreshing the page.
- `meteor`: This is a regular Meteor project. Everything that you know about how files work within Meteor applies here.
- `meteor/collections`: This is the recommended folder to store your database collections. Because they are global variables, they will be accessible within the react folder.
- `meteor/public/assets`: This folder is reserved for Webpack public files. They are the assets Webpack bundled with your javascript. In dev mode, they are not written on the disk.
- `meteor/client`: Anything you need to setup on the client that is Meteor specific. If you want to use the Meteor CSS bundle, you can put them in this folder.
- `meteor/server`: The code you want to only run on the server (subscriptions, ...).

# Get started
1. `git clone https://github.com/thereactivestack/meteor-webpack-react-kickstart.git`
1. `npm install` in the root
1. `./scripts/run-dev.sh` to run in development mode (with hot-reload)
1. `./scripts/run-dev.sh` to run in production mode (with server-rendering, need to be restarted if you change anything inside the react folder)
1. `./scripts/build.sh` to build the compressed bundle
1. You can use `./meteor.sh` as a shortcut for executing `meteor` in the meteor folder

*.bat scripts will be soon available for Windows*

# How do I communicate with Meteor?
You can use the [ReactMeteorData mixin](https://atmospherejs.com/meteor/react-meteor-data) from the Meteor team. You have to use React.createClass with them because mixins are deprecated with ES6 classes.

You can see a great example by reading the [TodoApp.jsx code](https://github.com/thereactivestack/meteor-webpack-react-kickstart/blob/master/react/todo/TodoApp.jsx).

# CSS in your React components
This project allows you to require CSS (or SCSS/LESS) inside `componentWillMount` of your React components. This allows you to bundle your CSS with your React components. You will never miss a CSS file in your project again.

When your component is mounted for the first time, the CSS will be injected in the page. This is how the css-loader of Webpack is working.

```javascript
class MyComponent extends React.Component {
  componentWillMount() {
    require('./MyComponent.css');
  }

  render() {
    // ...
  }
}
```

In development, hot-reload will update your CSS with no page refresh.

In production, the server will collect the CSS your client needs while doing the server-rendering. Then, the CSS will be served to the client with the HTML. As soon as the React application is started on the client, the CSS we collected while server-rendering will be removed and the client will take control.

## SASS is crashing!

If you have this error:

```
Error: The `libsass` binding was not found in .../node_modules/node-sass/vendor/linux-x64-11/binding.node
W20150925-15:43:08.319(-4)? (STDERR) This usually happens because your node version has changed.
W20150925-15:43:08.319(-4)? (STDERR) Run `npm rebuild node-sass` to build the binding for your current node version.
```

It is because Meteor is running on a different Node.js version than your local version. You can fix it easily:

1. Open `scripts/fix-sass.sh` with your favorite editor
1. Set the correct `SASS_BINARY_NAME` value based on the directory between vendor and binding.node in the error message: .../vendor/**linux-x64-11**/binding.node
1. Run the script and the error should disappear

# How the build process is working?
The idea behind using Webpack with Meteor is to be able to use awesome tools React people are already using. The gain in productivity is large.

## Development
While we are developing, Meteor is started with a webpack dev server. This means the file created by Webpack are only in memory and we can hot-reload them on the client. The advantage of that is Meteor will not restart unless it is really necessary.

## Production
In production, we are bundling a server and a client version with Webpack and drop them in the Meteor project. Then, we put the assets in the correct folder (meteor/public/assets). Those files are generated by webpack and are determined by your require of CSS and images (if you have any). Then, we start Meteor or we bundle the project.

## Config
- externals: You can access Meteor global variables by using import. By default, `react` and `react-router` are there. You can add your own.
