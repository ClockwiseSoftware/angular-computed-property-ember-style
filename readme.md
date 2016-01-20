#Angular Computed Property Service Ember Style

###Dependens

- angular 1.4.8~

##Install

```bash
bower install angular-computed-property-ember-style --save
```

###index.html

```html 
 <script type="text/javascript" src="bower_components/angular/angular.js"></script>
 <script type="text/javascript" src="bower_components/angular-computed-property-ember-style/angular-computed-property-ember-style.js"></script>
```

###app.js

```javascript
    angular.module('rootModule', ['angularComputedPropertyEmberStyle'])
        .run(['$rootScope', 'ngEmberComputed', function($rootScope, ngEmberComputed){
               ngEmberComputed($rootScope);
            }]);
```



###Examples - using

```javascript
angular('mymodule')
.controller('MyCtrl', [ '$scope', function($scope) {

    $scope.computedMixin({
        init: function() {
            //run some startup functions
            var fullname = this.get('fullname');
            console.log(fullname);
        }
        name: 'Oleg',
        lastname: 'Sudavnyy',
        fullname: $scope.$computed('name', 'lastname', function(oldValues, newValues){
            return this.get('name') + ' ' + this.get('lastname');
        })
    });
    
    //or traditional style
    $scope.mr = $scope.$computed('fullname', function(){
            return 'Mr. ' + this.get('fullname');
        });
    
    $scope.init();
}]);
```

### Template
```html

    <input type="text" ng-model="name"><br>
    <input type="text" ng-model="lastname"><br>
    {{fullname}}<br>
    {{mr}}

```

```
[Oleg]
[Sudavnyy]
Oleg Sudavnyy
Mr. Oleg Sudavnyy
```





