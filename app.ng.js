Parties = new Mongo.Collection('parties');
if (Meteor.isClient) {
  angular
    .module('socially', ['angular-meteor', 'ui.router']);

  angular.module('socially').config(
    function($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'parties-list.ng.html',
          controller: 'PartiesListCtrl'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'party-details.ng.html',
          controller: 'PartyDetailsCtrl'
        });

      $urlRouterProvider.otherwise('/parties');
    });

  angular
    .module('socially').controller('PartiesListCtrl',
      function($scope, $meteor) {

        $scope.parties = $meteor.collection(Parties);

        $scope.remove = function(party) {
          $scope.parties.remove(party);
        };
        $scope.removeAll = function() {
          $scope.parties.remove();
        };
      });
  angular.module('socially').controller('PartyDetailsCtrl',
        function($scope, $stateParams) {
          $scope.partyId = $stateParams.partyId;
        });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Parties.find().count() === 0) {

      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Can we please just for an evening not listen to dubstep.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];

      for (var i = 0; i < parties.length; i++) {
        Parties.insert(parties[i]);
      }
    }
  });
}