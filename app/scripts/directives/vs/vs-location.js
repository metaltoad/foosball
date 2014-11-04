'use strict';

/*******************************************************************************************************
 * LOCATION DIRECTIVE
 * The text under the vs that shows the location for this battle
 *******************************************************************************************************
 */
app.directive('vslocation', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/vs/templates/vs-location.html',
    controller: function($scope, $element, $attrs) {

    }
  }
})


