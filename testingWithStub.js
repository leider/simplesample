var sinon = require('sinon').sandbox.create();
var expect = require('must');

describe('wrong stub', function () {
  var collaborator = {isValidUrl: function () {}};
  var blacklist = ['a', 'b'];

  var sut = {
    isOK: function (urlValidator, urlToTest) {
      return urlValidator.isValidUrl(urlToTest, blacklist);
    }
  };

  afterEach(function () {
    sinon.restore();
  });

  it('looks good for true', function () {
    sinon.stub(collaborator, 'isValidUrl', function () { return true });
    expect(sut.isOK(collaborator, 'c')).to.be(true);
  });

  it('looks good for false', function () {
    sinon.stub(collaborator, 'isValidUrl', function () { return false });
    expect(sut.isOK(collaborator, 'a')).to.be(false);
  });

  it('checksTheUrl', function () {
    var urlValidator = {
      isValidUrl: function (urlToTest, blacklist) {
        return blacklist.indexOf(urlToTest) < 0;
      }
    };
    expect(urlValidator.isValidUrl('c', blacklist)).to.be(true);
    expect(urlValidator.isValidUrl('a', blacklist)).to.be(false);
    expect(sut.isOK(urlValidator, 'a')).to.be(false);
  });

  it('checksTheUrl with swapped arguments', function () {
    var modifiedValidator = {
      isValidUrl: function (blacklist, urlToTest) {
        return blacklist.indexOf(urlToTest) < 0;
      }
    };
    expect(modifiedValidator.isValidUrl(blacklist, 'c')).to.be(true);
    expect(modifiedValidator.isValidUrl(blacklist, 'a')).to.be(false);
    //expect(sut.isOK(modifiedValidator, 'a')).to.be(false); // broken!
  })
});

