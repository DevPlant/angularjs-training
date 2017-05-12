# 9-deployments

So now our app looks quite decent, adn with the knowledge gathered so far we could actually create a semi-decent application.
So now the question arises, how do we deploy this ?

### Docker to the rescue

Docker is a container platform that's used for both development and production usecases: https://www.docker.com/what-docker

**So, how does this help me?**

Well, in an traditional app you'd have your application server, or a tomcat, in which you run either both frontend and backend code
or just the frontend while the backend, like in our usecase is some REST Api.

This is counter-intuitive for development, we develop on our local machine using some mock http-server ( because its often 
very complicated to have a production like setup ) and then deploy our app, tested locally under different circumstances
onto some server where everything goes wrong. 

Its the developer paradigm of **"works on my machine"**.

So, what does docker do:

- You start from a predefined image ( or you can craft your own, but that's another story )
- You add things, I.E. your application code to that image
- You run it as a container, this means you don't need to have anything like tomcat installed on your local machine
- Containers do not interfere with your local setup
- This way you can use the same image on both localhost as well as production ( sometime minor adaptations )
- This is very similar to modern approaches to testing, where your test environment should be equal to your production environment
 
### Deploying your application

You'll need docker for this step: https://www.docker.com/get-docker

Depending on your OS this might be somewhat different.




Material Design is a UI/UX paradigm developed by google. It basically tells you how web & mobile apps should look and feel.
AngularJS adopted this design philosophy withing the Angular Material Design Library: https://material.angularjs.org/latest/

For the spec defined by google, have a look at: https://material.io/guidelines/

For Agnular, its a predefined set of Directives & Services as well as CSS which help us build quite pretty apps with little effort 
and no previous design or UX experience.

##### Adding material design

Material Design depeneds on some other angular core modules, aria, messages and animate. These together can be installed
either using `npm install --save angular-animate angular-aria angular-messages angular-material`

This project is already setup with these dependencies and the only thing that we had to change is the HTML. That's the beauty of it.

Our index file changed a little to accommodate the new dependencies

```
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="node_modules/angular-animate/angular-animate.min.js"></script>
<script src="node_modules/angular-aria/angular-aria.min.js"></script>
<script src="node_modules/angular-messages/angular-messages.min.js"></script>
<script src="node_modules/angular-material/angular-material.min.js"></script>

```

We also change the <section> and <div> tags we used for structuring with angular-material directives

```
<md-content>
    <md-toolbar class="md-accent">
        <div class="md-toolbar-tools">
            <h2>Sample Data Application</h2>
        </div>
    </md-toolbar>
    <md-content ng-view class="view-container"></md-content>
</md-content>
```

the `md-content` directive is used to structure views, its a container for other elements.
the 'md-toolbar' directive will provide a toolbar outside our `ng-view` - this will be shared across all views

### The User, Posts and Comments views


```
<md-card class="md-padding">
    <md-list>
        <md-subheader>All Users</md-subheader>
        <md-list-item class="md-3-line" ng-repeat="user in vm.users">
            <div class="md-list-item-text" layout="column">
                <h3>{{user.name}}</h3>
                <h4>{{user.email}}</h4>
                <p>{{user.address.street}}, {{user.address.suite}}, {{user.address.city}}, {{user.address.zipcode}}</p>
            </div>
            <md-button ng-href="/users/{{user.id}}/posts">Posts</md-button>
        </md-list-item>
    </md-list>
</md-card>
```

We're using a card (https://material.io/guidelines/components/cards.html) to structure our content.
Inside we use an md-list to show one user at a time with the same `ng-repeat` we had before.
`layout=column` tells angular-material to show the nested elements one beneath the other, try to change it to "row"

Finally we changed the anchor-tag to an `md-button`.

The other HTML files are similar to this one, except for the fact that we display different data

