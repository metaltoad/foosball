app.service('themeManager', ['$http', '$rootScope', function($http, $rootScope) {

  this.currentThemeId = 0;

  this.themeList = [];
  this.themeData = {};

  this.cycleTheme = function() {
    var scope = this;

    this.currentThemeId++;

    if(this.currentThemeId >= this.themeList.length) {
      this.currentThemeId = 0;
    }

    $rootScope.currentThemePath = this.themeList[this.currentThemeId];

    $http.get('/app/themes/' + this.themeList[this.currentThemeId] + '/settings.json').
      success(function(data, status, headers, config) {
        scope.themeData = data;
      });
  }

  this.getCurrentThemePath = function() {
    return this.themeList[this.currentThemeId];
  }

  this.loadTheme = function(themeID) {
    var scope = this;

    $http.get('/app/themes/' + this.themeList[0] + '/settings.json').
      success(function(data, status, headers, config) {
        scope.themeData = data;
      });
  }

  this.loadThemes = function() {
    var scope = this;

    $http.get('/app/themes/themes.json').
      success(function(data, status, headers, config) {
        scope.themeList = data;

        scope.loadTheme(scope.themeList[0]);
      });
  }
}]);