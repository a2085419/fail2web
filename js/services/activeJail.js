'use strict';

module.exports = 'fail2web.activeJail';

var angular = require('angular');

angular.module(module.exports, [require('./fail2webConfig')]).
  service('activeJail', ['$http', 'globalConfig', function($http, globalConfig) {
    var activeJail = {name: null,
                      data: {} };
    return {
      set: function(name) {
        globalConfig.then(function(config) {
          activeJail.name = name;
          $http({method: 'GET', url: config.fail2rest + 'jail/' + name}).
            success(function(data) {
              activeJail.data = data;
          });
        });
      },
      get: function() {
        return activeJail;
      }
    };
  }]);
