# nodets-scaffolding #

Basic node typescript scaffoling.  Will evolve over time.

## Install ##

System uses gulp, typings and bunyan.  You'll need to have those installed globally.

    npm install gulp-cli -g
    npm install typings -g
    npm install bunyan -g

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

- Typescript MEAN stack
- Gulp build
- Example routing system
- Configuration capability with overrides
- Bunyan based simple logging system
- Attribute injection system
- Sample Mongo DAO call
- Sample node-rest-client call to simulator

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
dev.json should 

