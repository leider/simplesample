var expect = require('must');

var chado = require('chado');

var createDouble = chado.createDouble;
var assume = chado.assume;
var verify = chado.verify;


describe('wrong stub (chado)', function () {
  var collaborator = createDouble('aCollaborator');
  var blacklist = ['a', 'b'];

  var sut = {
    isOK: function (urlValidator, urlToTest) {
      return urlValidator.isValidUrl(urlToTest, blacklist);
    }
  };

  after(function () {
    chado.consoleReporter.logReport();
  });

  it('looks good for true', function () {
    assume(collaborator).canHandle('isValidUrl').withArgs('c', blacklist).andReturns(true);
    expect(sut.isOK(collaborator, 'c')).to.be(true);
  });

  it('looks good for false', function () {
    assume(collaborator).canHandle('isValidUrl').withArgs('a', blacklist).andReturns(false);
    expect(sut.isOK(collaborator, 'a')).to.be(false);
  });

  it('checksTheUrl', function () {
    var urlValidator = {
      isValidUrl: function (urlToTest, blacklist) {
        return blacklist.indexOf(urlToTest) < 0;
      }
    };
    verify('aCollaborator').canHandle('isValidUrl').withArgs('c', blacklist).andReturns(true).on(urlValidator);
    verify('aCollaborator').canHandle('isValidUrl').withArgs('a', blacklist).andReturns(false).on(urlValidator);
    
    expect(sut.isOK(urlValidator, 'a')).to.be(false); // integrated
  });

  it('checksTheUrl with swapped arguments', function () {
    var modifiedValidator = {
      isValidUrl: function (blacklist, urlToTest) {
        return blacklist.indexOf(urlToTest) < 0;
      }
    };
    verify('aCollaborator').canHandle('isValidUrl').withArgs(blacklist, 'c').andReturns(true).on(modifiedValidator);
    verify('aCollaborator').canHandle('isValidUrl').withArgs(blacklist, 'a').andReturns(false).on(modifiedValidator);
    
    //expect(sut.isOK(modifiedValidator, 'a')).to.be(false); // broken! integrated
  })
});

