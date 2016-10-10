'use strict';

angular.module('crowdFundingApp')
  .controller('ShareCtrl', ['$scope', 'LocalStorage', function ($scope, LocalStorage) {
    $scope.shareOnFB = function() {
      var fbPosts = parseInt(LocalStorage.getItem('FB_POSTS')) || 0;
      LocalStorage.setItem('FB_POSTS', ++fbPosts);
      $scope.closeThisDialog();
    };
    $scope.shareOnTweeter = function() {
      var twitterPosts = parseInt(LocalStorage.getItem('TWITTER_POSTS')) || 0;
      LocalStorage.setItem('TWITTER_POSTS', ++twitterPosts);
      $scope.closeThisDialog();
    };
  }]);
