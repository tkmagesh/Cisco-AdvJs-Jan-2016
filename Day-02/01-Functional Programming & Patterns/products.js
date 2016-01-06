var products = [
    {id :4, name : "Pen", cost : 10, units : 60, category : 1},
    {id :7, name : "Hen", cost : 30, units : 80, category : 2},
    {id :2, name : "Ten", cost : 90, units : 40, category : 1},
    {id :9, name : "Den", cost : 50, units : 50, category : 2},
    {id :5, name : "Zen", cost : 80, units : 20, category : 1}
];

/*
1. Sort
2. Filter
3. Any
4. All
5. Sum
6. Min
7. Max
8. Average
9. Aggregate
10. GroupBy
*/

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

describe("Default List", function(){
    console.table(products);
});


describe("Sort", function(){
    describe("Products by id", function(){
        function sortProducts(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sortProducts();
        console.table(products);
    });
    describe("Any list by any attribute", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        describe("Products by cost", function(){
            sort(products, "cost");
            console.table(products);
        });
        describe("Products by units", function(){
            sort(products, "units");
            console.table(products);
        });
    });
    describe("Any list by anything", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0 ){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        describe("Products by value [cost * units]", function(){
            //sort
            var productComparerByCost = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByCost);
            console.table(products);
        });
    });
});

describe("Filter", function(){
   describe("Category - 1 products", function(){
       function filterCategory1Products(){
           var result = [];
           for(var i=0; i<products.length; i++)
               if (products[i].category === 1)
                   result.push(products[i]);
           return result;
       }
       var category1Products = filterCategory1Products();
       console.table(category1Products);
   });
   describe("Costly products", function(){
       function filterCostlyProducts(){
           var result = [];
           for(var i=0; i<products.length; i++)
               if (products[i].cost > 50)
                   result.push(products[i]);
           return result;
       }
       var costlyProducts = filterCostlyProducts();
       console.table(costlyProducts);
   });
   describe("Filter Any List by any criteria", function(){
       function filter(list, criteriaFn){
           var result = [];
           for(var i=0; i<list.length; i++)
               if (criteriaFn(list[i]))
                   result.push(list[i]);
           return result;
       }
       var category1ProductCriteriaFn = function(product){
           return product.category === 1;
       };
       var costlyProductCriteriaFn = function(product){
           return product.cost > 50;
       };

       describe("Category - 1 Products", function(){
           var category1Products = filter(products, category1ProductCriteriaFn);
           console.table(category1Products);
       });
       describe("Costly Products [cost > 50]", function(){
           var costlyProducts = filter(products, costlyProductCriteriaFn);
           console.table(costlyProducts);
       });
       function negate(criteriaFn){
           return function(){
               return !criteriaFn.apply(this,arguments);
           }
       }
       /*var nonCategory1ProductCriteriaFn = function(product){
           return !(category1ProductCriteriaFn(product));
       };*/
       var nonCategory1ProductCriteriaFn = negate(category1ProductCriteriaFn);

       describe("Non category - 1 products", function(){
           var nonCategory1Products = filter(products, nonCategory1ProductCriteriaFn);
           console.table(nonCategory1Products);
       })
       /*var affordableProductCriteriaFn = function(product){
           return !costlyProductCriteriaFn(product);
       };*/
       var affordableProductCriteriaFn = negate(costlyProductCriteriaFn);

       describe("Affordable products [!costly products]", function(){
           var affordableProducts = filter(products, affordableProductCriteriaFn);
           console.table(affordableProducts);
       });
   });
});

describe("All", function(){
    function all(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (!criteriaFn(list[i])) return false;
        return true;
    }
    describe("Are all products costly?", function(){
        var costlyProductCriteriaFn = function(product){
           return product.cost > 50;
       };
        console.log(all(products, costlyProductCriteriaFn));
    });
});
describe("Any", function(){
    function any(list, criteriaFn){
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i])) return true;
        return false;
    }
    describe("Are there any costly products?", function(){
        var costlyProductCriteriaFn = function(product){
           return product.cost > 50;
       };
        console.log(any(products, costlyProductCriteriaFn));
    });
});

describe("Sum", function(){
    function sum(list, valueSelector){
        var result = 0;
        for(var i=0; i<list.length; i++)
            result += valueSelector(list[i]);
        return result;
    }
    describe("Sum of all units ", function(){
        var sumOfAllUnits =sum(products, function(product){return product.units;});
        console.log(sumOfAllUnits);
    })
});
describe("Max", function(){
    function max(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i=1; i<list.length; i++){
            var itemValue = valueSelector(list[i]);
            result = result < itemValue ? itemValue : result;
        }
        return result;
    }
    describe("Max of Cost ", function(){
        var maxOfCost =max(products, function(product){return product.cost;});
        console.log(maxOfCost);
    })
});

describe("Aggregate", function(){
    function aggregate(list, iterator, seed){
        var start = 0;
        if (typeof seed === 'undefined'){
            start = 1;
            seed = list[0];
        }
        var result = seed;
        for(var i=start; i<list.length; i++){
            result = iterator(result, list[i]);
        }
        return result;
    }
    var sumOfUnits = aggregate(products, function(result, product){
        return result + product.units;
    }, 0);
    console.log("Sum of product units = ", sumOfUnits);

    var sumOfNumbers = aggregate([10,20,30,40], function(result, no){
        return result + no;
    });
    console.log("Sum of numbers = ", sumOfNumbers);

    var aggregateCost = aggregate(products, function(result, product){
        return {
            totalCost : result.totalCost + product.cost,
            productCount : ++result.productCount
        }
    }, { totalCost : 0, productCount : 0});
    console.log("Average product cost = ", aggregateCost.totalCost / aggregateCost.productCount);
});

describe("GroupBy", function(){
   function groupBy(list, keySelectorFn){
       var result = {};
       for(var i=0; i<list.length; i++){
           var key = keySelectorFn(list[i]);
           result[key] = result[key] || [];
           result[key].push(list[i]);
       }
       return result;
   };
   function describeGroup(group){
       for(var key in group){
           describe("Key - " + key, function(){
               console.table(group[key]);
           });
       }
   }
   describe("Products by category", function(){
       var productsByCategory = groupBy(products, function(product){
           return product.category;
       });
       describeGroup(productsByCategory);
   });
   describe("Products by cost ", function(){
       var productsByCost = groupBy(products, function(product){
           return product.cost > 50 ? "costly" : "affordable";
       });
       describeGroup(productsByCost);
   });
});

describe("map", function(){
    function map(list, transformFn){
        var result = [];
        for(var i=0; i<list.length; i++){
            result.push(transformFn(list[i]));
        }
        return result;
    }
    console.table(map(products, function(p){
        return {name : p.name, value : p.cost * p.units}
    }));
});


function bind(fn, obj, args){
   return function(){
      return fn.apply(obj, args);
   }
}
