// Part 1: Stack Overflow
let counter = 0;
function incrementForever() {
    counter++;
    incrementForever();
}
try {
     //incrementForever();

}catch (err) {
    console.log(err);
    console.log(counter);
}

//Part 2: Trampolines:

const flatten = (arr) => {
    const flattened = [];
  
    const flattenRecursive = (arr) => {
      arr.forEach((element) => {
        if (Array.isArray(element)) {
          flattenRecursive(element);
        } else {
          flattened.push(element);
        }
      });
    };
  
    flattenRecursive(arr);
    return flattened;
  };
  
  const trampoline = (f, ...args) => {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
  
  const trampolineFlatten = (arr) => {
    const flattened = [];
    
    const flattenRecursive = (arr, index = 0) => {
      if (index === arr.length) {
        return flattened;
      }
  
      const element = arr[index];
      if (Array.isArray(element)) {
        return () => flattenRecursive(element.concat(arr.slice(index + 1)), 0);
      } else {
        flattened.push(element);
        return () => flattenRecursive(arr, index + 1);
      }
    };
  
    return trampoline(flattenRecursive, arr);
  };
  
  const nestedArray = [1, [2, [3, 4], 5], [6, 7]];
  console.log(trampolineFlatten(nestedArray));

  //Part 3: Deferred Execution

  const primeListElement = document.getElementById('primeList');

  function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }

  function addPrimeNumbers(n, current = 2) {
    if (current <= n) {
      if (isPrime(current)) {
        primeListElement.innerHTML += current + ', ';
      }
      setTimeout(() => addPrimeNumbers(n, current + 1), 0);
    } else {
      alert('Calculation finished!');
    }
  }

  addPrimeNumbers(10000);

