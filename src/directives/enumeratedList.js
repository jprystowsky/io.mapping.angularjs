'use strict';

angular.module('io.mapping.angularjs.directives', [])
	.directive('enumeratedList', function () {
		return {
			replace: true,
			template: '<span ng-bind="enumeratedList"></span>',
			scope: {
				list: "=",
				property: "@",
				separator: "@",
				finalSeparator: "@"
			},
			link: function (scope, element, attrs) {
				scope.$watch('list', function () {
					if (scope.list && angular.isArray(scope.list)) {
						var mEvaluated = [];

						angular.forEach(scope.list, function (item) {
							mapValue.call(this, item, mEvaluated);
						});

						scope.enumeratedList = reduceValues(mEvaluated);
					}
				});

				function mapValue(item, array) {
					if (angular.isDefined(item) && item != null) {
						if (angular.isString(item)
							|| angular.isNumber(item)) {
							/**
							 * Primitives are tested first as the most likely case.
							 */
							array.push(item);
						} else if (angular.isArray(item)) {
							/**
							 * Recursively iterate.
							 */
							angular.forEach(item, function (subItem) {
								mapValue.call(this, subItem, array);
							});
						} else if (angular.isObject(item)
							&& angular.isDefined(attrs.property)
							&& angular.isString(attrs.property)
							&& item.hasOwnProperty(attrs.property)) {
							/**
							 * Rather than push the property value directly we recursively call it -- it might
							 * evaluate to an object, array, etc. instead of a scalar.
							 */
							mapValue.call(this, item[attrs.property], array);
						} else if (angular.isFunction(item)) {
							/**
							 * Recursively handle the result of the function call as with object evaluations.
							 */
							mapValue.call(this, item.call(this), array);
						}
					}
				}

				function reduceValues(array) {
					var concatenation = '';

					var separator = ', ';
					var finalSeparator = ' and ';

					if (angular.isDefined(attrs.separator) && angular.isString(attrs.separator)) {
						separator = [attrs.separator, ' '].join('');
					}

					if (angular.isDefined(attrs.finalSeparator) && angular.isString(attrs.finalSeparator)) {
						finalSeparator = [' ', attrs.finalSeparator, ' '].join('');
					}

					// Corner cases
					if (array.length < 1) {
						return '';
					} else if (array.length === 1) {
						// 'One'
						return array[0];
					} else if (array.length === 2) {
						// 'One and Two'
						return array.join(finalSeparator);
					}

					// Initial concatenation
					concatenation = array.slice(0, array.length - 1).join(separator);

					// Final concatenation -- broken out for readability
					concatenation = [concatenation, array[array.length - 1]].join(separator + finalSeparator);

					return concatenation;
				}
			}
		}
	});