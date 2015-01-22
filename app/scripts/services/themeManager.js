app.service('themeManager', ['$http', '$rootScope', function($http, $rootScope) {

  this.currentThemeId = 0;
  this.currentThemeName = "";

  this.themeList = [];
  this.themeData = {};

  this.cycleTheme = function() {
    var scope = this;

    this.currentThemeId++;

    if(this.currentThemeId >= this.themeList.length) {
      this.currentThemeId = 0;
    }

    $rootScope.currentThemePath = this.themeList[this.currentThemeId];

    this.loadTheme(this.currentThemeId);

  }

  this.getCurrentThemePath = function() {
    if(this.currentThemeName != "") {
      return this.currentThemeName;
    }
    return this.themeList[this.currentThemeId];
  }

  this.loadTheme = function(themeID) {
    var scope = this;

    $http.get('/app/themes/' + this.themeList[themeID] + '/settings.json').
      success(function(data, status, headers, config) {
        scope.themeData = data;
      });
  }

  this.loadThemeByName = function(theme) {
    var scope = this;

    this.currentThemeName = theme;

    $http.get('/app/themes/' + theme + '/settings.json').
      success(function(data, status, headers, config) {
        scope.themeData = data;
      });
  }

  this.loadThemes = function() {
    var scope = this;

    $http.get('/app/themes/themes.json').
      success(function(data, status, headers, config) {
        scope.themeList = data;

        scope.loadTheme(0);
      });
  }
}]);