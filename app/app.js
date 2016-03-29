"use strict";

let BoardGameReview = angular.module("BoardGameApp", ["ngRoute", "firebase"])
	.constant("firebaseURL", "https://board-game-review.firebaseio.com");

let isAuth =(authFactory) => new Promise((resolve, reject) => {
	if (authFactory.isAuthenticated()) {
		console.log("User is authenticated, resolve route promise");
		resolve();
	} else {
		console.log("User is not authenticated, reject route promise");
		reject();
	}
});

//This is where we set up the routes

BoardGameReview.config(["$routeProvider",
	function ($routeProvider) {
		$routeProvider.
			when("/", {
				templateUrl: "partials/search.html",
				controller: "searchCtrl",
				resolve: {isAuth}
			}).
			when("/login", {
        templateUrl: "partials/login.html",
        controller: "loginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "loginCtrl"
      }).
      when("/newgame", {
      	templateUrl: "partials/createGame.html",
      	controller: "createGameCtrl",
      	resolve: {isAuth}
      }).
      when("/reviews", {
      	templateUrl: "partials/yourReviews.html",
      	controller: "yourReviewsCtrl",
      	resolve: {isAuth}
      }).
      // when("/editgame", {
      // 	templateUrl: "partials/editGame.html",
      // 	controller: "searchCtrl",
      // 	resolve: {isAuth}
      // }).
      otherwise({
      	redirectTo: "/"
      });
	}]);

//redirect the user to the login form if there in no authentication

BoardGameReview.run([
	"$location",

	($location) => {
		let boardGameRef = new Firebase("https://board-game-review.firebaseio.com");

		boardGameRef.onAuth(authData => {
			if (!authData) {
				$location.path("/login");
			}
		});
	}
]);