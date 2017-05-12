# Running this example

Since we are now using multiple views - we'll need to use a server to serve our files
So first you'll need to make sure you have node & npm installed.
#### Download Link
https://nodejs.org/en/download/

After successful installation run

`npm install`

After packages ( pushstate-server ) have been installed you can run your pushstate-server using following commands

`npm run modern' - will run the modern ecma6 version on port 9200

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
    "angular": "^1.6.4",
    "angular-route": "^1.6.4"
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
- A list of scripts, these can be anything, from bash to node, docker commands, etc.


In our case we defined a devDependency - "pushstate-server" this is done using `npm install --save-dev <PACKAGE_NAME>`
We also defined 2 normal dependency - "angular" and "angular-route" this is done using `npm install --save <PACKAGE_NAME`

So whats the difference? Well put it simply:

- devDependencies are used for development, eg. testing frameworks, or this http-server
- dependencies are used for running the application

### Lets have a look at the application

First thing you'll notice is that we stopped using a CDN, instead we are using the libraries downloaded by node.

```
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
```

Since we are talking about multiple views now, we are using an entry-point for our views
```
<section ng-view>

</section>
```

The ng-view directive is used to tell angular where to put our views. Based on our URL it will know which view to insert.
We'll get to routing in a moment.

# App structure
We now structured the app in multiple files within the app folder. 

## app.js

```
(function () {
    'use strict';

    angular.module('DevPlantApp', ['ngRoute']).config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix("*");

     
        $routeProvider
            .when('/users', {
                templateUrl: 'app/users/users.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .when('/users/:userId/posts', {
                templateUrl: 'app/posts/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm',
                resolve: {
                    user: function (DataService, $route, $location, $q) {
                        return DataService.getUser($route.current.params.userId).catch(() => {
                            $location.url('/users');
                            return $q.reject('User not available');
                        });
                    }
                }
            })
            .when('/users/:userId/posts/:postId/comments', {
                templateUrl: 'app/comments/comments.html',
                controller: 'CommentsController',
                controllerAs: 'vm',
                resolve: {
                    user: function (DataService, $route, $location, $q) {
                        return DataService.getUser($route.current.params.userId).catch(() => {
                            $location.url('/users');
                            return $q.reject('User not available');
                        });
                    },
                    post: function (DataService, $route, $location, $q) {
                        return DataService.getPost($route.current.params.postId).catch(() => {
                            $location.url('/users');
                            return $q.reject('Post not available');
                        });
                    }
                }

            }).otherwise({redirectTo: '/users'});
    });

})();

```

This is our application entry point. Just like before we're defining an app called **DevPlantApp** and we are also using
ngRoute. This is an angular module used for routing & view management.

Next we go on and invoke config on our application, this method takes a function as a parameter in which we inject
the routeProvider and locationProvider. These 2 are used to manage routing and locations.
We are enabling HTML5 mode, this will enable HTML5 pushstate. It means our Single Page app will use standard URL's instead 
of the browser hash-syntax.

#### Defining routes

We are using the $routeProvider to define routs in our application. The first route defines the user-view we already know
from previous examples. It simply states: 

_"When the browser URL is equal to /users show the template 'users.html' using the Controller 'UserController' with the 
alias 'vm "_

The next route is a bit more complicated. Remember the api we used so far: https://jsonplaceholder.typicode.com

Well it can also provide posts for a specific user. So we defined a path '/users/:userId/posts'

- :userId is called a PathVariable. This means that its dynamic, its a placeholder.

The rest of the route reads the same:

_"When the browser URL is equal to /users/<ANYTHING>/posts show the template 'posts.html' using the Controller 'PostsController' with the 
alias 'vm "_

The last entry is something called **resolve** - this is very important in angularJS applications. It's used for 
pre-fetching data **before** we transition to a view. 

So why is this useful? Well, the pathVariable :userId, could be a anything, so before we transition to a view showing 
user posts we'd first want to make sure that we have something to show.

```
    resolve: {
        user: function (DataService, $route, $location, $q) {
            return DataService.getUser($route.current.params.userId).catch(() => {
                $location.url('/users');
                return $q.reject('User not available');
            });
        }
    }

```
The resolve property is an object which should contain 1..n functions returning a promise.
In our case we user the routeParameter userId to fetch a user. If there is an error, we'll redirect to '/users' and
reject the promise. By rejecting the promise, angular knows not to transition to this view.