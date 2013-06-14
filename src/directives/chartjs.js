'use strict';

angular.module('io.mapping.angularjs.directives.chartjs', [])
	.directive('chartjs', function () {
		return {
			scope: {
				chartjs: "@",
				chartContext: "@",
				chartData: "=",
				chartOptions: "=",
				chartDebug: "@"
			},
			link: function (scope, element) {
				var context, chart;

				scope.$watch('chartContext', function () {
					if (scope.chartContext) {
						if (scope.chartDebug) {
							console.log('creating chart');
						}

						context = element.getContext(scope.chartContext);
						chart = new Chart(context);
					}
				});

				scope.$watch('chartjs', function () {
					if (scope.chartjs) {
						scope.$watch('chartData', function () {
							if (scope.chartDebug) {
								console.log('chart data updated:');
								console.log(scope.chartData);
							}

							chart[scope.chartjs].call(this, scope.chartData, scope.chartOptions || null);
						})
					}
				});
			}
		}
	});