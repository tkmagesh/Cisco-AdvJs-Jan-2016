isPrime(100) => run the algo
isPrime(101) => run the algo
isPrime(102) => run the algo
isPrime(103) => run the algo

isPrime(100) => do not run the algo
isPrime(101) => do not run the algo
isPrime(102) => do not run the algo
isPrime(103) => do not run the algo

var isPrime = (function(){
    var cache = {};
    function checkPrime(n){
        console.log("processing ", n);
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    return function (n){
        if (typeof cache[n] === 'undefined')
            cache[n] = checkPrime(n);
        return cache[n];
    }
})();
