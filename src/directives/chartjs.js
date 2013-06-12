'use strict';

angular.module('io.mapping.angularjs.directives.chartjs', [])
	.directive('chartjs', function () {
		return {
			scope: {
				chartjs: "@",
				chartContext: "@",
				chartData: "=",
				chartOptions: "="
			},
			link: function (scope, element) {
				var context, chart;

				scope.$watch('chartContext', function () {
					if (scope.chartContext) {
						context = element.getContext(scope.chartContext);
						chart = new Chart(context);
					}
				});

				scope.$watch('chartjs', function () {
					if (scope.chartjs) {
						scope.$watch('chartData', function () {
							chart[scope.chartjs].call(this, scope.chartData, scope.chartOptions || null);
						})
					}
				});
			}
		}
	});