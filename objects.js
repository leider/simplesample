// an object has an arbitrary amount of fields (slots)
// object creation can be done via the literal {}
// an object feels similar to a Map

console.log({}); // {}
console.log({a: 'Value'}); // { a: 'Value' }

var object = {name: 'Peter'};
console.log(object); // { name: 'Peter' }

object.slot1 = 22;
console.log(object); // { name: 'Peter', 
                     // slot1: 22 }

// keys need to be strings or will be coerced to a string vie "toString()"

object['key with blanks'] = 44;
object[new Date()] = 'a new Value';
console.log(object); // { name: 'Peter', 
                     // slot1: 22, 
                     // 'key with blanks': 44, 
                     // 'Fri Nov 20 2015 19:25:42 GMT+0100 (CET)': 'a new Value' }

// fields can be deleted and created at runtime
function bFunc(obj) {
  delete obj.slot1;
  obj.slot2 = 'someString';
}

bFunc(object);
console.log(object); // { name: 'Peter', 
                     // 'key with blanks': 44, 
                     // 'Fri Nov 20 2015 19:25:42 GMT+0100 (CET)': 'a new Value', 
                     // slot2: 'someString' }

