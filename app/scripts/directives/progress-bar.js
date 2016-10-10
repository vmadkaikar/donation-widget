'use strict';

angular.module('crowdFundingApp')
  .directive('progressBar', function() {
    return {
      restrict: 'E',
      scope: {
        maxValue: '@',
        currentValue:'@'
      },
      template: '<div class="progress-bar"><div class="progress"></div></div>',
      replace: true,
      link: function (scope, element) {
        var progressEl = element.find('.progress');
        var updatePercentComplete = function (newVal) {
          if(newVal>100) newVal = 100;
          progressEl.css({ width: newVal + '%'});
          if(newVal == 100) {
            progressEl.addClass('complete');
          }
        };
        var computePercentComplete = function (maxVal, curVal) {
          return (parseInt(curVal)/parseInt(maxVal))*100;
        };

        scope.$watch('currentValue', function(newVal, oldVal) {
          if(newVal != oldVal) {
            updatePercentComplete(computePercentComplete(scope.maxValue, newVal));
          }
        });

        updatePercentComplete(computePercentComplete(scope.maxValue, scope.currentValue));
      }
    };
  });
