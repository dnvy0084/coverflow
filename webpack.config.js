/**
 * webpack is fed via a configuration object. 
 * It is passed in one of two ways depending on how you are using webpack: through the terminal or via Node.js. 
 * All the available configuration options are specified below.
 * @ https://webpack.js.org/configuration/
 */

const path = require( 'path' );

module.exports = {

  // The point or points to enter the application. 
  // At this point the application starts executing. 
  // If an array is passed all items will be executed.
  // @ https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    index: './src/index.js',
    test: './test/test.js'
  },

  // The top-level output key contains set of options instructing 
  // webpack on how and where it should output your bundles, 
  // assets and anything else you bundle or load with webpack.
  // @ https://webpack.js.org/configuration/output/
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' )
  },

  // These options determine how the different types of modules 
  // within a project will be treated.
  // @ https://webpack.js.org/configuration/module/
  module: {

    // An array of Rules which are matched to requests when modules are created. 
    // These rules can modify how the module is created. 
    // They can apply loaders to the module, or modify the parser.
    // @ https://webpack.js.org/configuration/module/#module-rules 
    rules: [
      {
        // A RegExp Condition: It's tested with the input.
        test: /\.js$/,
        //  The Condition must match. The convention is the provide 
        //  a string or array of strings here, but it's not enforced.
        include: [
          path.resolve( __dirname, 'src' ),
          path.resolve( __dirname, 'test' ),
        ],
        //  The Condition must NOT match. The convention is the provide 
        //  a string or array of strings here, but it's not enforced.
        exclude: [
          path.resolve( __dirname, 'node_modules' ),
        ],
        // A list of UseEntries which are applied to modules. 
        // Each entry specifies a loader to be used.
        // @ https://webpack.js.org/configuration/module/#rule-use
        use: [
          {
            loader: 'babel-loader'
          },
        ]
      }
    ]
  },

  // These options change how modules are resolved. 
  // webpack provides reasonable defaults, 
  // but it is possible to change the resolving in detail. 
  // Have a look at Module Resolution for more explanation of how the resolver works.
  // @ https://webpack.js.org/configuration/resolve/
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./src'),
    ]
  },

  // This option controls if and how Source Maps are generated.
  // @ https://webpack.js.org/configuration/devtool/
  devtool: 'source-map', // or 'eval' for development

  // webpack can compile for multiple environments or targets.
  // @ https://webpack.js.org/configuration/target/
  target: 'web',

  // This set of options is picked up by webpack-dev-server 
  // and can be used to change its behavior in various ways. 
  // @ https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: path.join( __dirname, 'dist' ), // boolean | string | array, static file location
    compress: true, // boolean | string | array, static file location
    // It is possible to configure advanced options for serving static files from contentBase.
    // @ http://expressjs.com/en/4x/api.html#express.static
    staticOptions: {
      redirect: true
    },
    // Control options related to watching the files.
    watchOptions: {
      poll: true
    }
  }
} 
