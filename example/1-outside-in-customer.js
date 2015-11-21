'use strict';

var chado = require('chado');
var createDouble = chado.createDouble;
var assume = chado.assume; // with assume you describe your assumption
var verify = chado.verify; // with verify you can check your assumptions against a real object

describe('pizza restaurant', function () {

  after('log chado findings', function () {
    chado.consoleReporter.logReport();
  });

  describe('a customer', function () {
    var waiter = createDouble('waiter');

    it('can successfully order a pizza tonno', function customer() {
      // defining contract; will never be called here
      assume(waiter).canHandle('order').withArgs('pizza tonno').andReturns('pizza tonno');
    });
  });

});
