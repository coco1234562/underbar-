(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };






  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === 0){
      return [];
    }
    return n === undefined ? array[array.length-1] : array.slice(-n); 
  };






  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // If collection is an ARRAY...
    if(Array.isArray(collection)){
      for(var i = 0, length = collection.length; i < length; i++){
        iterator(collection[i], i, collection);
      }
    }
    // If collection is an OBJECT...
    else {
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
    
  };




  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    
    return result;
  };




  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {  // _.filter(array, function(a){return a % 2 === 0});
    
    var arr = [];
    var obj = {};
    // USING _.EACH
    if(Array.isArray(collection)){
      _.each(collection, function(element){
        if(test(element) === true){
          arr.push(element); // Populate empty array for return.
        }
      }
        
      )
      return arr;
    }
    
    else {
      _.each(collection, function(value, key, collection){
        if(test(value) === true){
          obj[key] = value; // Populate empty object for return.
        }
      }
      )
      return obj;
    }
  };
  
  
  

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var noPassCollection = _.filter(collection, function(a){return !test(a)});
    return noPassCollection;
  };





  // Produce a duplicate-free version of the array.
  /*
  should not mutate the input array
  should return all unique values contained in an unsorted array
  should produce a brand new array instead of modifying the input array
  */
  
  
  
  _.uniq = function(array, isSorted, iterator) {
    var uniqueArray = [];
    var seen = {};
    
    if (!iterator) {
      iterator = _.identity;
    }
    
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      var transformed = iterator(value);
      
      // Check if the transformed value has been seen before
      if (!seen[transformed]) {
        uniqueArray.push(value);
        seen[transformed] = true;
      }
    }
    
    return uniqueArray;
  };
  




  // Return the results of applying an iterator to each element.
  _.map = function(collection, func) {
    var result = [];
    
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        result.push(func(collection[i], i, collection));
      }
    } else if (typeof collection === 'object' && collection !== null) {
      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          result.push(func(collection[key], key, collection));
        }
      }
    }
    
    return result;
  }


  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => {
      return item[key];
    });
  };






  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, (total, number) => {
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   const identity = _.reduce([5], (total, number) => {
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(array, func, seed) {
    //Start by declaring variables startIndex and accumulator, 
    var startIndex = 0;
    var accumulator = seed;
    
    //Check if seed is undefined.
    if (seed === undefined) {
      // If no seed is provided, use the first element as the seed and start from the second element
      accumulator = array[0];
      startIndex = 1;
    }
    
    //Use a loop to iterate through the array starting from the startIndex.
    for (var i = startIndex; i < array.length; i++) {
      //Update accumulator with the return value of the func function.
      accumulator = func(accumulator, array[i], i);
    }
    
    //After iterating through all the elements of the array, return the final value of accumulator.
    return accumulator;
  }  // Determine if the array or object contains a given value (using `===`).
  
  
  

  _.contains = function(collection, target) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          return true;
        }
      }
    } else if (typeof collection === 'object' && collection !== null) {
      for (var key in collection) {
        if (collection.hasOwnProperty(key) && collection[key] === target) {
          return true;
        }
      }
    }
    return false;
  };






  // Determine whether all of the elements match a truth test.
  _.every = function(collection, func) {
    if (typeof func !== 'function') {
      // If no function is provided, check if every element is truthy
      return collection.every(Boolean);
    }
    
    if (Array.isArray(collection)) {
      // If the collection is an array
      for (var i = 0; i < collection.length; i++) {
        if (!func(collection[i], i, collection)) {
          return false;
        }
      }
    } else if (typeof collection === 'object' && collection !== null) {
      // If the collection is an object
      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          if (!func(collection[key], key, collection)) {
            return false;
          }
        }
      }
    }
    
    return true;
  }








  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, func) {
    if (typeof func !== 'function') {
      // If no function is provided, check if at least one element is truthy
      return collection.some(Boolean);
    }
    
    // If the collection is an array
    if (Array.isArray(collection)) {
      // iterate around the array 
      for (var i = 0; i < collection.length; i++) {
        
        //Call <function> for every element of <collection> with the paramaters:
        //current element, it's index, <collection>
        if (func(collection[i], i, collection)) {
          return true;
        }
      }
      // // If the collection is an object
    } else if (typeof collection === 'object' && collection !== null) {
      
      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          
          //Call <function> for every element of <collection> with the paramaters:
          //current value, current key, <collection>
          if (func(collection[key], key, collection)) {
            return true;
          }
        }
      }
    }
    //If it is false for all elements, return false
    return false;
  }



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   const obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(targetObj, ...sourceObjs) {
    for (var i = 0; i < sourceObjs.length; i++) {
      var sourceObj = sourceObjs[i];
      for (var key in sourceObj) {
        if (sourceObj.hasOwnProperty(key)) {
          targetObj[key] = sourceObj[key];
        }
      }
    }
    return targetObj;
  }




  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(item, index){
      var objectToInclude = item;
      _.each(objectToInclude, function(value, key){
        if(obj[key] === undefined){ // If key not already existent, even if it's "falsy"
          obj[key] = value;
        }
      })
    })
    return obj;
  };





  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };








  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    
    var map = {};
    
    return function(){
      
      var str = ''; 
      // Stringify the arguments so they can be used as object keys
      
      _.each(arguments, function(element){
        str = str + element + " ";
      });
      
      /*
      for(var i = 0; i < arguments.length; i++){
      str = str + arguments[i] + " ";
      }*/
      
      if(map[str] == undefined){ // If map does not contain the passed-in args
        map[str] = func.apply(this, arguments); // "Args": result is inputted to map
      }
      
      return map[str]; // Return stored result if it exists in map
    };
    
  };









  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    
    var argsAfterFuncAndWait = [];
    
    for (var i = 2, length = arguments.length; i < length; i++) {
      argsAfterFuncAndWait.push(arguments[i]);
    };
    
    setTimeout(function(){
      func.apply(this, argsAfterFuncAndWait)
    }, wait)
    
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    
    var arrayCopy = array.slice(0); 
    
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
      
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      
      // And swap it with the current element.
      t = arrayCopy[m];
      arrayCopy[m] = array[i];
      arrayCopy[i] = t;
    }
    
    return arrayCopy;
    
  };














  /**
   * ADVANCED
   * =================
   *
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var results = [];
    
    // Iterate through the collection
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      
      // Determine if functionOrKey is a method name or a function reference
      var method = typeof functionOrKey === 'function'
      ? functionOrKey
      : item[functionOrKey];
      
      // Ensure the method is callable
      if (typeof method === 'function') {
        // Call the method on the current item with provided arguments
        var result = args ? method.apply(item, args) : method.call(item);
        results.push(result);
      }
    }
    
    return results;
  };








  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'string') {
      // Sort objects by the property specified by the iterator string
      collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      });
    } else if (typeof iterator === 'function') {
      // Sort objects using the iterator function
      collection.sort(function(a, b) {
        var valueA = iterator(a);
        var valueB = iterator(b);
        return valueA - valueB;
      });
    }
    return collection;
  };




  // Zip together two or more arrays with elements of the same index
  // going together.
  //should not use the native version of any underbar methods in its implementation 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arrays = arguments;
    var maxLength = 0;
    
    // Find the maximum length among the input arrays
    for (var i = 0; i < arrays.length; i++) {
      if (arrays[i].length > maxLength) {
        maxLength = arrays[i].length;
      }
    }
    
    var result = [];
    
    // Zip the arrays together
    for (var i = 0; i < maxLength; i++) {
      var zipItem = [];
      
      for (var j = 0; j < arrays.length; j++) {
        zipItem.push(arrays[j][i]);
      }
      
      result.push(zipItem);
    }
    
    return result;
  };


  
  
  
  

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (!Array.isArray(result)) {
      result = [];
    }
    
    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        _.flatten(nestedArray[i], result);
      } else {
        result.push(nestedArray[i]);
      }
    }
    
    return result;
  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = arguments;
    var result = [];
    
    for (var i = 0; i < arrays[0].length; i++) {
      var element = arrays[0][i];
      var isShared = true;
      
      for (var j = 1; j < arrays.length; j++) {
        var found = false;
        
        for (var k = 0; k < arrays[j].length; k++) {
          if (arrays[j][k] === element) {
            found = true;
            break;
          }
        }
        
        if (!found) {
          isShared = false;
          break;
        }
      }
      
      if (isShared) {
        result.push(element);
      }
    }
    
    return result;
  };



  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  /*
  -should not use the native version of any underbar methods in its implementation 
  
  -should return the difference between two arrays
  
  -should return the difference between three arrays
  
  */
  _.difference = function(array) {
    var otherArrays = [].slice.call(arguments, 1); // Convert arguments to an array
    
    var result = [];
    
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      var foundInOtherArrays = false;
      
      for (var j = 0; j < otherArrays.length; j++) {
        for (var k = 0; k < otherArrays[j].length; k++) {
          if (otherArrays[j][k] === element) {
            foundInOtherArrays = true;
            break;
          }
        }
        
        if (foundInOtherArrays) {
          break;
        }
      }
      
      if (!foundInOtherArrays) {
        result.push(element);
      }
    }
    
    return result;
  };






  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //should return a function callable twice in the first 200ms 
  // Note: This is difficult! It may take a while to implement.
  
  
  /*
  
  Arguments passed to the throttled function should be passed to the original
  function.
  The throttled function should always return the most recently returned value of
  the original function.
  If the wait period is 100ms and the function was last called 30ms ago,
  another call to the throttled function should schedule a call for 0ms after the wait period is over.
  */
  
  _.throttle = function(func, wait) {
    var lastCalled = 0;
    var timeoutId;
    var result;
    
    // The throttled function
    var throttled = function() {
      var now = Date.now();
      var remainingTime = wait - (now - lastCalled);
      
      if (remainingTime <= 0) {
        // If the wait period has passed, call the original function
        lastCalled = now;
        result = func.apply(this, arguments);
        clearTimeout(timeoutId);
      } else if (!timeoutId) {
        // If within the wait period and a timeout is not already scheduled
        timeoutId = setTimeout(function() {
          lastCalled = Date.now();
          timeoutId = null;
          result = func.apply(this, arguments);
        }, remainingTime);
      }
      
      return result;
    };
    
    return throttled;
  };

}());
  