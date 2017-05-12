# Running this example

Since we are now using multiple views - we'll need to use a server to serve our files
So first you'll need to make sure you have node & npm installed.
#### Download Link
https://nodejs.org/en/download/

After successful installation run

`npm install`

After packages ( pushstate-server ) have been installed you can run your pushstate-server using following commands

`npm run modern' - will run the modern ecma6 version on port 9200

`npm run vanilla' - will run the vanilla version on port 9201

Now visit: http://localhost:9200 or http://localhost:9201 depending on which you ran.
You can obviously run both at the same time.

### So what is this node thing ...
Its a javascript runtime - initially built for server-side JavaScript development 
( writing a server in Javascript... I know, right? ). 

npm is a package manager for node, its somewhat similar to java's maven or gradle. Its a way to download an install libraries 
from the NPM repository. We'll be using this for future examples, because, obviously, you shouldn't reinvent the wheel.
There are other package managers available, but we'll stick to node for now. Some examples for other package managers are
 **bower** and **yarn**. Bower will soon be deprecated and yarn is the new kid on the block. Its more efficient than node.
 
# Lets have a look at package.json

Our current package.json file looks like this. To create a package.json file just run `npm ini` in an empty folder.
 
```
{
  "name": "7-material-design",
  "version": "1.0.0",
  "description": "DevPlant AngularJS Traning - Multiple Views",
  "dependencies": {
    "angular": "^1.6.4"
  },
  "devDependencies": {
    "pushstate-server": "^3.0.0"
  },
  "scripts": {
    "modern": "node node_modules/.bin/pushstate-server ./app 9200",
    "vanilla": "node node_modules/.bin/pushstate-server ./app-vanilla 9201"
  },
  "author": "Timo Bejan",
  "license": "MIT"
}


``` 

So first, lets 

This file basically contains some information about our project. 
- A userdefined name,verison & description. Author and License information. These are all optional
- A list of dependencies, also optional, but hey, why else would we use it
- A list of scripts, these can be anything, from bash to node, docker command, etc.


In our case we defined a devDependency - "pushstate-server" this is done using `npm install --save-dev <PACKAGE_NAME>`
We also defined a normal dependency - "angular" this is done using `npm install --save <PACKAGE_NAME`

So whats the difference? Well put it simply:

- devDependencies are used for development, eg. testing frameworks, or this http-server
- dependencies are used for running the application

