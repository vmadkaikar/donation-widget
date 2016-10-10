'use strict';

angular.module('crowdFundingApp')
  .controller('MainCtrl', function ($scope, LocalStorage, ngDialog) {

    $scope.requiredDonation = 2000;
    $scope.donationCollectionDeadline = new Date('10-20-2016 11:59 PM');
    $scope.donationAmount = 50;

    function init () {
      var now = new Date().getTime();
      var endTime = $scope.donationCollectionDeadline.getTime();
      $scope.donationExpired = now > endTime;
      var receivedDonation = $scope.getReceivedDonation();
      $scope.donationComplete = receivedDonation >= $scope.requiredDonation;
    }

    $scope.getReceivedDonation = function() {
      return parseInt(LocalStorage.getItem('DONATION_RECEIVED')) || 0;
    };

    $scope.getDonorsCount = function() {
      return parseInt(LocalStorage.getItem('DONORS_COUNT')) || 0;
    };

    $scope.getPendingAmount = function() {
      return $scope.requiredDonation - $scope.getReceivedDonation();
    };

    $scope.submitDonation = function(donationAmount) {
      LocalStorage.setItem('DONATION_RECEIVED', $scope.getReceivedDonation() + parseInt(donationAmount));
      LocalStorage.setItem('DONORS_COUNT', $scope.getDonorsCount() + 1);
    };

    $scope.shareOnSocialMedia = function() {
      ngDialog.open({
        template: 'views/share-dialog.html',
        controller: 'ShareCtrl'
      })
    };

    $scope.daysLeftForDonationEnd = function() {
      var now = new Date().getTime();
      var endTime = $scope.donationCollectionDeadline.getTime();
      var oneDayInMills = 24*60*60*1000;
      if(!$scope.donationExpired) {
        var daysLeft = Math.ceil((endTime-now)/oneDayInMills);
      }
      return daysLeft || 0;
    };

    $scope.whyDonate = function() {
      ngDialog.open({
        template: 'views/why-donate.html'
      })
    };

    $scope.saveForLater = function() {
      ngDialog.open({
        template: '<div class="popup-message">Saved</div>',
        plain: true,
        showClose: false,
        controller: ['$scope', '$timeout', function($scope, $timeout) {
          $timeout(function() {
            $scope.closeThisDialog();
          }, 1000);
        }]
      })
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    init();
  });
