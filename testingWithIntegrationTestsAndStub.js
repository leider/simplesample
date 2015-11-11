var sinon = require('sinon').sandbox.create();
var expect = require('must');

describe('a printer', function () {
  var calculator = {calc: function () {}};
  var printer = Printer(calculator);

  afterEach(function () {sinon.restore();});

  it('works when price and discount is set', function () {
    sinon.stub(calculator, 'calc', function () {return 45});
    expect(printer.print(50,10)).to.be("45 EUR");
  });

  it('should work when discount is not set', function () {
    sinon.stub(calculator, 'calc', function () {return 50});
    expect(printer.print(50)).to.be("50 EUR");
  });
});
describe('a calculator', function () {
  var calculator = Calculator();

  it('works when price and discount is set', function () {
    expect(calculator.calc(50, 10)).to.be(45);
  });

  it.skip('should return given price, when discount is not set', function () {
    expect(calculator.calc(50, undefined)).to.be(50);
  });
});
describe('functional test', function () {
  var printer = Printer(Calculator());

  it('both units should work together', function () {
    expect(printer.print(120, 10)).to.be("108 EUR");
  });
});

function Printer(calculator) {

  function print(price, discount) {
    return calculator.calc(price, discount) + " EUR";
  }

  return {
    print: print
  }
}

function Calculator() {

  function calc(price, discount) {
//    discount = discount || 0;
    discount = discount;
    return price / 100 * (100 - discount);
  }

  return {
    calc: calc
  }
}