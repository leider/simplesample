// a function needs not declare arguments; they are always available be the special "arguments"

function aFunc() {
  console.log(arguments[0]);
}

var object = {name: 'Peter'};
aFunc(object);  // { name: 'Peter' }

// a function's signature consists only of the functions's name. This means: per context you can declare a function only once! 

function newContext() { // What will happen, if we remove the context?
  function aFunc(theObject) {
    console.log('NEW! - ' + JSON.stringify(theObject));
  }

  aFunc(object);  // NEW! - {"name":"Peter"}
}

newContext();
