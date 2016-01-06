isPrime(100) => run the algo
isPrime(101) => run the algo
isPrime(102) => run the algo
isPrime(103) => run the algo

isPrime(100) => do not run the algo
isPrime(101) => do not run the algo
isPrime(102) => do not run the algo
isPrime(103) => do not run the algo

var isPrime = (function(){

    function checkPrime(n){
        console.log("processing ", n);
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }

    var cache = {};
    return function (n){
        if (typeof cache[n] === 'undefined')
            cache[n] = checkPrime(n);
        return cache[n];
    }
})();


var cachedAdd = (function(){

    function add(x,y){
        console.log("processing ", x , " and ", y);
        return x + y;
    }

    var cache = {};
    return function(x,y){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === 'undefined')
            cache[key] = add(x,y);
        return cache[key];
    }
})();

function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === 'undefined')
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}
