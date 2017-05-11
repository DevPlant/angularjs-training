# 2-directives-and-data-binding
A primitive angularJS to illustrate directives and loops 

### Explanation
`<html ng-app>`

ng-app directive applied to the <html> element - this tells Angular to bootstrap an application 

`<body ng-init="participants=['Timo','Anna','Andrei','Radu','Razvan']>"`

ng-init will add an array called participants to the root scope of this application


`<input type="text" ng-model="participantName"/>`

ng-model directive binds a property called participantName to the current scope ( in this case, root scope )


`<li ng-repeat="participant in participants | filter:participantName | orderBy:'-toString()' ">`

ng-repeat directive will loop trough the participants defined, filtering using participantName model, 
sorting descending ( because we used minus ) - toString is called since we need a property of the object "participant"
so toString() invoked on a string returns that string - you'll see in further examples we'll use properties of a given object
for example "age"

`Hello: {{name}}`

Data Interpolation using {{ }} syntax - we are applying an filter "uppercase" in order to uppercase the value