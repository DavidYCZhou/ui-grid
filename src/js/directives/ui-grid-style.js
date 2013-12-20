(function(){
// 'use strict';

/**
 * @ngdoc directive
 * @name ui.grid.style.directive:uiGridStyle
 * @element style
 * @restrict A
 *
 * @description
 * Allows us to interpolate expressions in `<style>` elements. Angular doesn't do this by default as it can/will/might? break in IE8.
 *
 * @example
   <doc:example module="app">
    <doc:source>
      <script>
        var app = angular.module('app', ['ui.grid']);
       
        app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.myStyle = '.blah { border: 1px solid }';
        }]);
      </script>
     
      <div ng-controller="MainCtrl">
        <style ui-grid-style>{{ myStyle }}</style>
        <span class="blah">I am in a box.</span>
      </div>
    </doc:source>
    <doc:scenario>
      it('should apply the right class to the element', function () {
        element(by.css('.blah')).getCssValue('border')
          .then(function(c) {
            expect(c).toContain('1px solid');
          });
      });
    </doc:scenario>
   </doc:example>
 */

var app = angular.module('ui.grid.style', []);

app.directive('uiGridStyle', ['$interpolate', '$sce', function($interpolate, $sce) {
  return {
    // restrict: 'A',
    priority: 1000,
    link: function(scope, element) {
      var interpolateFn = $interpolate(element.text(), true);

      if (interpolateFn) {
        scope.$watch(interpolateFn, function(value) {
          element.text(value);
        });
      }
    }
  };
}]);

})();