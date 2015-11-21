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

  describe('the chef', function () {
    it('can make pizzas, if the pantry has everything needed to produce an order', function () {
      var fullPantry = createPantry({
                                      dough: ['dough'],
                                      cheese: ['cheese'],
                                      'tomato sauce': ['tomato sauce'],
                                      tuna: ['tuna']
                                    });
      var chef = createChef(fullPantry);

      verify('chef').canHandle('make').withArgs('143').andReturns('pizza tonno').on(chef);
    });

    it('throws an error, when pantry is empty', function () {
      var emptyPantry = createPantry();
      var chef = createChef(emptyPantry);

      verify('chef').canHandle('make').withArgs('143').andThrowsError('Not available').on(chef);
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

function createChef(pantry) {
  var recipes = {'143': ['dough', 'cheese', 'tomato sauce', 'tuna']};
  var externalmenu = {'143': 'pizza tonno'};

  function make(order) {
    var ingredients = recipes[order];
    if (!pantry.has(ingredients)) {
      throw new Error('Not available');
    }
    ingredients.forEach(function (ingredient) {
      pantry.take(ingredient);
    });

    return externalmenu[order];
  }

  return {
    make: make
  };
}

function createPantry(initialFood) {
  var storedFood = initialFood || {};

  function has(foods) {
    return foods.every(function (food) {
      return storedFood[food] && storedFood[food].length > 0;
    });
  }

  function take(food) {
    return storedFood[food].pop();
  }

  return {
    has: has,
    take: take
  };
}
