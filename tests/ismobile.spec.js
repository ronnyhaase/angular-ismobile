'use strict';

// Disable JSHint: "Expected an assignment or function call and instead saw an expression."
// Otherwise JSHint dislikes ChaiJS
/*jshint -W030 */

var expect = chai.expect;

// PhantomJS < 2.0.0 requires Function.prototype.bind polyfill!
/*jshint freeze: false */
Function.prototype.bind = Function.prototype.bind || function bind(obj) {
	var args = Array.prototype.slice.call(arguments, 1),
		self = this,
		nop = function() {
		},
		bound = function() {
			return self.apply(
				this instanceof nop ? this : (obj || {}), args.concat(
					Array.prototype.slice.call(arguments)
				)
			);
		};
	nop.prototype = this.prototype || {};
	bound.prototype = new nop();
	return bound;
};
/*jshint freeze: true */

describe('angular-ismobile', function () {
	describe('Midway: Module ismobile', function () {});
	describe('Unit: isMobile', function () {
		describe('Run phase', function () {
			var service;

			beforeEach(function () {
				module('ismobile');
			});
			beforeEach(inject(function (isMobile) {
				service = isMobile;
			}));

			it('should be injected and deep equal the "official" isMobile', function () {
				expect(service).to.not.be.undefined;
				expect(service).to.deep.equal(window.isMobile);
			});
		});

		describe('Configuration phase', function () {
			var provider;

			beforeEach(function () {
				angular.module('test.ismobile', ['ismobile'])
					.config(function (isMobileProvider) {
						provider = isMobileProvider;
					});

				module('test.ismobile', 'ismobile');
				inject();
			});

			it('should be injected and deep equal the "official" isMobile', function () {
				var pclone;

				expect(provider).to.not.be.undefined;

				pclone = angular.extend({}, provider);
				// Otherwise a provider won't equal
				delete pclone.$get;
				expect(pclone).to.deep.equal(window.isMobile);
			});
		});
	});
});