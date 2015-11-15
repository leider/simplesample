// eine Funktion muss keine Argumente deklarieren; diese sind implizit durch "arguments" immer verfügbar

function aFunc() {
  console.log(arguments[0]);
}

var object = {name: 'Peter'};
aFunc(object);  // { name: 'Peter' }

// die Signatur einer Funktion wird nur durch ihren Namen festgelegt. Pro Kontext kann es nur eine Definition geben.

function neuerKontext() {// Was passiert, wenn wir den des Kontexts entfernen?
  function aFunc(theObject) {
    console.log('NEU! - ' + JSON.stringify(theObject));
  }

  aFunc(object);  // NEU! - {"name":"Peter"}
}

neuerKontext();
