// eine Function muss keine Argumente deklarieren

function aFunc() {
  console.log(arguments[0]);
}

var object = {name: 'Peter'};
aFunc(object);  // { name: 'Peter' }

// die Signatur einer Funktion wird nur durch ihren Namen festgelegt. Pro Kontext kann es nur eine Definition geben.
// entfernen des Kontexts

function neuerKontext() {
  function aFunc(theObject) {
    console.log('NEU! - ' + JSON.stringify(theObject));
  }

  aFunc(object);  // NEU! - {"name":"Peter"}
}

neuerKontext();
