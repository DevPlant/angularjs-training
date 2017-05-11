# 1-directives-and-data-binding
A primitive angularJS to illustrate 2-way databinding

### Explanation
`<html ng-app>`

ng-app directive applied to the <html> element - this tells Angular to bootstrap an application 

`<input type="text" ng-model="name" />`

ng-model directive binds a property called name to the current scope ( in this case, root scope )


`{{name}}`

Data Interpolation using {{ }} syntax - this will render the value of the property name from within the current scope