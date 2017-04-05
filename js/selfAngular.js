//angular数据绑定
$(function(){
	var myApp=angular.module('myApp',[]);
	myApp.controller('myCtrl',['$scope',function($scope){
		$scope.runSpeed=1000;

	}]);
})