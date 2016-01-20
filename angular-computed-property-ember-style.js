'use strict';
if (window.angular) {
    (function(angular) {
        angular.module('angularComputedPropertyEmberStyle', [])
            .service('ngEmberComputed', function() {
                return function($rootScope) {
                    $rootScope.computedMixin = function(child) {
                        var _this = this;
                        angular.extend(this, child);
                        angular.forEach(_this, function(val, key) {
                            if (val instanceof AngularComputedProperty) {
                                $rootScope._computed(_this, key, val.dependentProperties, val.callback);
                            }
                        });
                    };
                    $rootScope.set = function(key, value) {
                        if (this instanceof Object) {
                            this[key] = value;
                        }

                    };
                    $rootScope.get = function(key) {
                        if (this instanceof Object) {
                            return key in this && this[key] || '';
                        }
                        return '';

                    };


                    $rootScope.$computed = function() {
                        var srcArgs = arguments;
                        var args = Object.keys(srcArgs).map(function(key) {
                            return srcArgs[key];
                        });
                        var dependentProperties = args.slice(0, args.length - 1);
                        var callback = args.slice(-1)[0];

                        return new AngularComputedProperty(dependentProperties, callback, this);
                    };
                    $rootScope._computed = function _computed($scope, computedPropertyName, dependentProperties, f) {
                        function assignF(newVal, oldVal, $scope) {
                            var computedVal = f(newVal, oldVal);
                            $scope[computedPropertyName] = computedVal;
                        }

                        $scope.$watchGroup(dependentProperties, function(newVal, oldVal, $scope) {

                            assignF(newVal, oldVal, $scope);
                        });
                        assignF(null, null, $scope);

                    };
                };

                function AngularComputedProperty(dependentProperties, callback, scope) {
                    this.dependentProperties = dependentProperties;
                    this.callback = callback.bind(scope);
                }

            });
    }(window.angular));

} else {
    throw new Error('angular not found');
}
