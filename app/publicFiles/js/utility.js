(function(){
	angular.module('App', [
		'ngResource',
		'ngRoute',
		'ui.router',
		'ngMaterial',
	])
	.run(['$rootScope', '$state', '$stateParams','$location',
		function ($rootScope ,$state ,$stateParams, $location) {
			
		}
	])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,	 $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider
			.state("site", {
				url: "",
				templateUrl: 'html/Header.html',
				controller: 'general'
			})
			.state("site.main", {
				url: "/",
				templateUrl: 'html/Main.html',
				controller: '',
			})
			.state("site.signup", {
				url: "/signup",
				templateUrl: 'html/SignUp.html',
				controller: '',
			})
			.state("site.schedule", {
				url: "/schedule",
				templateUrl: 'html/Schedule.html',
				controller: '',
			})
			.state("site.information", {
				url: "/information",
				templateUrl: 'html/Information.html',
				controller: '',
			})
			.state("site.about", {
				url: "/about",
				templateUrl: 'html/About.html',
				controller: '',
			})
			.state("site.coaches", {
				url: "/coaches",
				templateUrl: 'html/Coaches.html',
				controller: '',
			})
		.state("site.login", {
				url: "/login",
				templateUrl: 'html/Login.html',
				controller: 'login',
				resolve: {
					auth: function($http, $state){
						$http.post('/api/user/auth')
						.then(
							function(result){
								if(result.data.auth) {
									$state.transitionTo('site.admin')
								}
							},
							function(err){console.log(err)});
					}
				}
			})
		.state("site.admin", {
				url: "/admin",
				templateUrl: 'html/Admin.html',
				controller: 'admin',
			})
			.state("site.404", {
				url: "/*",
				templateUrl: 'html/404.html',
				controller: '',
			});
			$urlRouterProvider.otherwise('/');
	}]);
	angular.module('App').factory('routes', [ '$resourceProvider', function($re){
		return {
			createLogin: $re('/login/create'),
			login: $re('/login/create')
		}
	}]);
	angular.module('App').controller('login',['$scope', '$http', '$state', function($scope, $http, $state) {
		$scope.login = function() {
			if ($scope.user && $scope.pass) {
				$http.post('/api/user/login', {user: $scope.user, pass: $scope.pass}).then(
					function(ret){
						if(ret.data.auth)
							$state.transitionTo('site.admin')
						else{
							$scope.user = "";
							$scope.pass = "";
						}
					},
					function(ret){console.log(ret)})
			}
		}
	}]);
	angular.module('App').controller('admin',['$scope', '$http', '$state', function($scope, $http) {
		$http.post('/api/user/auth').then(function(a){console.log(a)},function(a){console.log(a)});
	}]);
	angular.module('App').controller('general',['$scope', '$state', function($scope, $state) {
		$scope.coaches = function() {$state.transitionTo('site.coaches')}
		$scope.about = function() {$state.transitionTo('site.about')}
		$scope.information = function() {$state.transitionTo('site.information')}
		$scope.schedule = function() {$state.transitionTo('site.schedule')}
		$scope.signup = function() {$state.transitionTo('site.signup')}
		$scope.main = function() {$state.transitionTo('site.main')}
		$scope.images=['slide_a.jpg', 'slide_c.jpg', 'slide_b.jpg', 'slide_d.jpg']
		$scope.coaches_people = [
			{
				'name':'Elly Joarden',
				'roll':'President/Distance Coach'
			},
			{
				'name':'Alex Boyle',
				'roll':'Tresurer'
			},
			{
				'name':'Karah Osterberg',
				'roll':'FACULTY/STAFF ADVISOR'
			},
			{
				'name':'Whalen Good',
				'roll':'Vice President'
			},
			{
				'name':'Melissa Schwartz',
				'roll':'Head Recruter'
			},
			{
				'name':'Laura Kucik',
				'roll':'Cordinator of Competitive Sports'
			},
			{
				'name':'Cara Caspersen',
				'roll':'Graduate Assistant of Competitive Sports'
			},
			{
				'name':'Daniel Eiland',
				'roll':'Sprints Coach'
			},
			{
				'name':'Mike Assefa',
				'roll':'Jumps Coach'
			},
			{
				'name':'Charles Ralston',
				'roll':'Hurdles Coach'
			},
			{
				'name':'Dema Govalla',
				'roll':'Throwers Coach'
			},
		]
		$scope.questions = [
			{
				'q':'How much will this club cost me?',
				'a':'It is currently free to join the club. (We do fundraise to cover costs we incure)'
			},
			{
				'q':'When do you meet?',
				'a':'We meet Monday through Friday durring the spring and fall semester.'
			},
			{
				'q':'Is attendance manditory?',
				'a':'We would love for everyone to come to every practice, but we understand that school and other obligations comes first.'
			},
			{
				'q':'Do you compete?',
				'a':'We are apart of NIRCA (National Intercollegiate Running Club Association) and are planing to compete in furure events.'
			},
		];
		$scope.schedule_contnet= [
		{
			'day':'Monday',
			'sprinters':'No content available',
			'distance':'No content available'
		},
		{
			'day':'Tuesday',
			'sprinters':'No content available',
			'distance':'No content available'
		},
		{
			'day':'Wendsday',
			'sprinters':'No content available',
			'distance':'No content available'
		},
		{
			'day':'Thursday',
			'sprinters':'No content available',
			'distance':'No content available'
		},
		{
			'day':'Friday',
			'sprinters':'No content available',
			'distance':'No content available'
		},
		{
			'day':'Saturday',
			'sprinters':'No Practice',
			'distance':'No Practice'
		},
		{
			'day':'Sunday',
			'sprinters':'No Practice',
			'distance':'No Practice'
		}
		];
	}]);
})();
