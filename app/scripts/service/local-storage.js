'use strict';

angular.module('crowdFundingApp')
  .factory('LocalStorage', function ($window ,$cookieStore) {
    function localStoreSupported() {
      try {
        if('localStorage' in $window && $window['localStorage'] !== null) {
          $window.localStorage.setItem('___test___', 1);
          $window.localStorage.removeItem('___test___');
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    function set(name, value) {
      if(localStoreSupported()) {
        $window.localStorage.setItem(name, value);
      }
      else {
        $cookieStore.put(name, value);
      }
    }
    function get(name) {
      if(localStoreSupported()) {
        return $window.localStorage.getItem(name);
      } else {
        return $cookieStore.get(name);
      }
    }
    function remove(name) {
      if(localStoreSupported()) {
        $window.localStorage.removeItem(name);
      }
      else {
        $cookieStore.remove(name);
      }
    }

    // Public API here
    return {
      setItem: set,
      getItem: get,
      removeItem: remove
    };
  });
