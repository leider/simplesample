var expect = require('must');
var chado = require('chado');

var createDouble = chado.createDouble;
var assume = chado.assume;
var verify = chado.verify;

describe('chado suite', function () {
  after(function () {
    chado.consoleReporter.logReport();
  });

  describe('a printer (with stubbed calculator)', function () {
    var calculator = createDouble('calculator');
    var printer = Printer(calculator);

    it('works when price and discount is set', function () {
      assume(calculator).canHandle('calc').withArgs(50, 10).andReturns(45);
      expect(printer.print(50, 10)).to.be('45 EUR');
    });

    it('should work when discount is not set', function () {
      assume(calculator).canHandle('calc').withArgs(50).andReturns(50);
      expect(printer.print(50)).to.be('50 EUR');
    });
  });

  describe('a calculator', function () {
    var calculator = Calculator();

    it('works when price and discount is set', function () {
      verify('calculator').canHandle('calc').withArgs(50, 10).andReturns(45).on(calculator);
    });

    it('should return given price, when discount is not set', function () {
      verify('calculator').canHandle('calc').withArgs(50).andReturns(50).on(calculator);
    });
  });

  describe('integrated test', function () {
    var printer = Printer(Calculator());

    it('both units should work together', function () {
      expect(printer.print(120, 10)).to.be('108 EUR');
    });
  });
});

function Printer(calculator) {

  return {
    print: function (price, discount) {
      return calculator.calc(price, discount) + ' EUR';
    }
  }
}

function Calculator() {

  return {
    calc: function (price, discount) {
      discount = discount || 0;
      return price / 100 * (100 - discount);
    }
  }
}
