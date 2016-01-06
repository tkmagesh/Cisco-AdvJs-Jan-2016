'use strict';
function fn(){
    let emp = {id : 100, name : "Magesh"};
    let {id, name} = emp;
    console.log(id, name);
}
fn();


function add(x,y,...values){
    console.dir(values);
    return x + y;
    
}


console.log(add());
console.log(add(100));
add(10,20,90,80,70,60);



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

var x = 10, y = 20;
[x,y] = [y,x];
console.log(x,y);


function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

const print = (product) => {
    console.log(`id - ${product.id}, name - ${product.name}`);
}

describe("Default List", () => {
    products.forEach((p) => {
        print(p);
    });
});

describe("Sort", () => {
    describe("Products by id", () => {
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
    describe("Any list by any attribute", () => {
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                       [list[i], list[j]] = [list[j], list[i]];
                    }
        }
        describe("Products by cost", () => {
            sort(products, "cost");
            console.table(products);
        });
        describe("Products by units", () => {
            sort(products, "units");
            console.table(products);
        });
    });
    describe("Any list by anything", () => {
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0 ){
                         [list[i], list[j]] = [list[j], list[i]];
                    }
        }
        describe("Products by value [cost * units]", () =>{
            //sort
            var productComparerByCost = (p1, p2) => {
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

let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
          console.log("inside iterator.next")
        return { done: false, value: cur }
      }
    }
  }
}

let natural = {
    [Symbol.iterator](){
        let cur = -1;
        return {
            next(){
                return {done : false, value : ++cur};
            }
        }
    }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
    console.log("inside for of");
  if (n > 10)
    break;
    
  console.log(n);
}