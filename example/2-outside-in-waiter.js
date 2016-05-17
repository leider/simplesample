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
      assume(waiter).canHandle('order').withArgs('pizza tonno').andReturns('pizza tonno'); // will never be called here
      waiter.order('pizza tonno');
    });
  });

  describe('the waiter', function () {
    var chef = createDouble('chef');
    var waiter = createWaiter(chef);

    it('passes the translated order to the chef', function () {
      assume(chef).canHandle('make').withArgs('143').andReturns('pizza tonno');

      verify('waiter').canHandle('order').withArgs('pizza tonno').andReturns('pizza tonno').on(waiter);
    });
  });

});

//====== "PRODUCTION" CODDE BELOW

function createWaiter(chef) {
  var internalmenu = {'pizza tonno': '143'};

  function order(meal) {
    return chef.make(internalmenu[meal]);
  }

  return {
    order: order
  };
}

