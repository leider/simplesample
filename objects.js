// ein Objekt hat eine variable Anzahl von Feldern (sog. Slots)
// Anlage eines Objekts duch das Literal {}
// ein Objekt ist fast wie eine Map

console.log({}); // {}
console.log({a: 'Wert'}); // { a: 'Wert' }

var object = {name: 'Peter'};
console.log(object); // { name: 'Peter' }

object.slot1 = 22;
console.log(object); // { name: 'Peter', slot1: 22 }

// Keys müssen Strings sein

object['key mit Leerzeichen'] = 44;
console.log(object); // { name: 'Peter', slot1: 22, 'key mit Leerzeichen': 44 }

// Felder können zur Laufzeit entfernt und neu angelegt werden
function bFunc(obj) {
  delete obj.slot1;
  obj.slot2 = 'someString';
}

bFunc(object);
console.log(object); // { name: 'Peter', 'key mit Leerzeichen': 44, slot2: 'someString' }

