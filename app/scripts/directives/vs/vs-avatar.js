'use strict';

/*******************************************************************************************************
 * AVATAR DIRECTIVE
 * The player picture on the vs screen
 *******************************************************************************************************
 */
app.directive('vsavatar', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/vs/templates/vs-avatar.html',
    controller: function($scope, $element, $attrs, $rootScope) {
      $scope.player = $rootScope.players[$attrs.vsavatar];
    }
  }
})


