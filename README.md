# nodets-scaffolding #

Basic node typescript scaffoling.  Will evolve over time.

## Install ##

You'll want the node.js 6.x branche installed as well as the latest mongo database installed and running on a default port.  No database setup
is necessary although a couple of the unit tests will fail if an appropriate entry isn't already in mongo.

System uses gulp, typings and bunyan, plus mocha as a test framework (although while you can run the tests from the command line, you would normally
invoke "gulp test".  You'll need to have those installed globally.
    
    npm install gulp-cli -g
    npm install typings -g
    npm install bunyan -g
    npm install mocha -g

Clone the project

    git clone https://github.com/FranzZemen/nodets-scaffolding

rename project as desied.

cd into project folder and setup

    npm install
    typings install
    gulp

Then from project folder, type the following.  Note that we pipe to bunyan cli to convert the json output to a visually pleasant form.

    node simulator/app.js | bunyan
    node server/app/app.js | bunyan

To verify core REST simulator open a browser to:

    http://localhost:9090/something
    
You should see 
    
    {"message":"Hello World!!!"}

To verify server open a browser to:

    http://localhost:9000/api/something

You should see the same, except it routes through the server.

Another server test is to get an unauthenticated token:

    http://localhost:9000/api/security/tokens/someContext

You should see something like:

    {"token":"d8d8eacf-90dc-4489-8fff-4d01d24e46c8"}

## Features ##

- Typescript Node Express Mongo stack
- Gulp build
- Example routing system
- Configuration capability with overrides
- Bunyan based simple logging system
- Attribute injection system
- Sample node-rest-client call to simulator

## Node Express Mongo Stack ##
The basic express setup plus a mongo dao doing some simple things are provided.  You can also browse bsh-mongo-token's source to understand
more mongo examples.

## Routing ##
- Express delegates routing to topRouter
- topRouter delagates routing to context specific routers

### Security Router ###
Has integration for unauthenticated and authenticated tokens using the bsh-token and bsh-mongo-token plugins.   Shows the invocation path and examples.

### SometThing router ###
Example of routing to a rest client.  We use node-rest-client which has many options, see its own documentation

## Configuration ##
The server configuration capability is simple yet allows for environment overrides.

The base configuration is in the Config.env property in the app/config/config.ts source:

     env = {
         port: 9000,
         mongoURI : 'mongodb://localhost/dev',
         log: {
           defautLevel:'info',
           overrides: []
         },
         rest: {
           url:'http://localhost:9090',
         }
       }

If the environment parameter NODE_ENV is set to some value <i>node_environment</i> such as "dev", "test", "production" or whatever 
then the system will search for app/config/env/node_environment.json for example app/config/env/dev.json.  That json file should mirror
the structure of the base configuration for the properties desired to be overriden.   In no node_environment is set, it will look for dev.json.
dev.json should never be in git.  Instead, developers should copy and modify dev.sample.json to dev.json.  .gitignore settings will cause git to 
ignore dev.json itself.

You'll note that the starting dev.json as of this version simply contains bunyan log setting overrides for different loggers.  If these are not presesnt
bunyan logging will use the default log level in the base configuration.

## Bunyan ##
Bunyan is a great logging system.  It's encouraged to be used for the entire project, but node is so flexibile that you can use anyone you want.
However, because the log level is set in each file, a minimal bunyanl log manager is written into the config object and you should obtain
loggers from it rather than directly from bunyan.  This will allow you to set or override logging levels in the configuration rather than in each 
source file, which becomes important as the project grows.

Read up on the bunyan documentation.  The basic documentation is very straightforward.

## Attribute Based Injection ##
The project includes an attribute injector.  While technically you don't really need it for basic work, it allows us to easily inject the right
resource for test purposes.  A few examples are provided.  Later versions will include other types of injections.

The injection "logic" is contained in app/injection, but you'll never need to use that.  For an example of using attribute injection see

     app/services/login.service.ts, LoginService.userDao attribute
       
To setup the injection source see app/injection.ts and app/services/login.service.spec.ts.  Both files setup the injections, one the real thing
for the server, and the other a mock dao for testing the service independent of the database.

## REST client to core REST services ##
The services/someThing.service.ts file contains the most rudimentary node-rest-client implementation, an assumes the easiest interface to the simulator
which is an applicatoin/json content type.  As needed we'll add other content types and methods as examples.