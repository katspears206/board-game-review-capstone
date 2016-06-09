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
			when("board-game-review-capstone/", {
				templateUrl: "board-game-review-capstone/partials/search.html",
				controller: "searchCtrl",
				resolve: {isAuth}
			}).
			when("/login", {
        templateUrl: "board-game-review-capstone/partials/login.html",
        controller: "loginCtrl"
      }).
      when("/logout", {
        templateUrl: "board-game-review-capstone/partials/login.html",
        controller: "loginCtrl"
      }).
      when("/newgame", {
      	templateUrl: "board-game-review-capstone/partials/createGame.html",
      	controller: "createGameCtrl",
      	resolve: {isAuth}
      }).
      when("/reviews", {
      	templateUrl: "board-game-review-capstone/partials/yourReviews.html",
      	controller: "yourReviewsCtrl",
      	resolve: {isAuth}
      }).
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
