// ein Objekt hat eine variable Anzahl von Feldern (sog. Slots)
// Anlage eines Objekts duch das Literal {}
// ein Objekt ist fast wie eine Map

console.log({}); // {}
console.log({a: 'Wert'}); // { a: 'Wert' }

var object = {name: 'Peter'};
console.log(object); // { name: 'Peter' }

object.slot1 = 22;
console.log(object); // { name: 'Peter', slot1: 22 }

// Keys müssen Strings sein, bzw. werden toString() gemacht

object['key mit Leerzeichen'] = 44;
object[new Date()] = 'ein neuer Wert';
console.log(object); // { name: 'Peter', slot1: 22, 'key mit Leerzeichen': 44, 
// 'Fri Nov 20 2015 19:25:42 GMT+0100 (CET)': 'ein neuer Wert' }

// Felder können zur Laufzeit entfernt und neu angelegt werden
function bFunc(obj) {
  delete obj.slot1;
  obj.slot2 = 'someString';
}

bFunc(object);
console.log(object); // { name: 'Peter', 'key mit Leerzeichen': 44, 
// 'Fri Nov 20 2015 19:25:42 GMT+0100 (CET)': 'ein neuer Wert', slot2: 'someString' }

