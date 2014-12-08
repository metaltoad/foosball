<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css({.tmp,app}) styles/main.css -->
    <!--<link rel="stylesheet" href="styles/main.css"> -->
    <!-- endbuild -->
    <link type="text/css" href="stylesheet/bootstrap.css" rel="stylesheet">
    <link type="text/css" href="stylesheet/style.css" rel="stylesheet">
    <meta charset=utf-8 />
    </head>
    <body ng-app="FoozKombat" ng-keypress="$broadcast('keypress', $event)">
        <div id="angular-view-wrapper" ng-view></div>

        <!-- Angular Core -->
        <script src="bower_components/angular/angular.js"></script>
        <script src="bower_components/jquery/jquery.js"></script>

        <!-- Angular Modules -->
        <script src="bower_components/angular-resource/angular-resource.js"></script>
        <script src="bower_components/angular-cookies/angular-cookies.js"></script>
        <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
        <script src="bower_components/angular-route/angular-route.js"></script>

        <script src="scripts/contrib/angular-timer.js"></script>

        <!---App files-->
        <script src="scripts/app.js"></script>
        <script src="scripts/services/gamemessages.js"></script>
        <script src="scripts/services/playersManager.js"></script>
        <script src="scripts/services/sessionManager.js"></script>
        <script src="scripts/services/themeManager.js"></script>
        <script src="scripts/controllers/InputCtrl.js"></script>
        <script src="scripts/controllers/IntroCtrl.js"></script>
        <script src="scripts/controllers/MainCtrl.js"></script>
        <script src="scripts/controllers/VSCtrl.js"></script>
        <script src="scripts/directives/game/gamemessage.js"></script>
        <script src="scripts/directives/game/healthbar.js"></script>
        <script src="scripts/directives/game/score.js"></script>
        <script src="scripts/directives/game/player.js"></script>
        <script src="scripts/directives/game/wins.js"></script>
        <script src="scripts/directives/vs/vs-avatar.js"></script>
        <script src="scripts/directives/vs/vs-location.js"></script>
        <script src="scripts/directives/game/taunt.js"></script>

        <?php
        if($_SESSION['remote_addr']) {
        ?>
        <input type="hidden" id="viewonly" value="true">

        <?php
        }
        ?>

    </body>
</html>

