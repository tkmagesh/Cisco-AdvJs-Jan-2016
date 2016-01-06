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
