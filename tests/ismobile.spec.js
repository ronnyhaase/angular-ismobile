'use strict';

// Disable JSHint: "Expected an assignment or function call and instead saw an expression."
// Otherwise JSHint dislikes ChaiJS
/*jshint -W030 */

var expect = chai.expect;

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