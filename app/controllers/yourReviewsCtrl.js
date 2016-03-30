"use strict";

BoardGameReview.controller("yourReviewsCtrl", [

  "$scope",
  "$location",
  "$http",
  "reviewFactory",
  "authFactory",

  function ($scope, $location, $http, reviewFactory, authFactory) {

  	let user = authFactory.getUser();
  	$scope.yourReviews = [];



		reviewFactory.getReviews()
		.then(function (reviewCollection) {
			Object.keys(reviewCollection).forEach(function (key) {
				reviewCollection[key].id = key;
				if( reviewCollection[key].userID === user.uid ){
					$scope.yourReviews.push(reviewCollection[key]);
				}
			});
		});
  

  	$scope.deleteReview = function (review){
  		console.log("hopefully delete", review);
  		reviewFactory.deleteReview(review);
  	};


  }


]);