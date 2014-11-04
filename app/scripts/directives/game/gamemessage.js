'use strict';

/*******************************************************************************************************
 * GAME MESSAGE DIRECTIVE
 * The text on the front and center on the game screen. such as FINSIH THEM
 *******************************************************************************************************
 */
app.directive('gamemessage', function() {
  return {
    restrict: 'EA',
    scope:true,
    templateUrl:  'scripts/directives/game/templates/gamemessage.html',
    controller: function($scope, $element, $attrs, $rootScope) {

    }
  }
})


