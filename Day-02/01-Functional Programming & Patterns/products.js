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
        //Sort();
        console.table(products);
    });
    describe("Any list by any attribute", function(){
        describe("Products by cost", function(){
            //sort
            console.table(products);
        });
        describe("Products by units", function(){
            //sort
            console.table(products);
        });
    });
    describe("Any list by anything", function(){
        describe("Products by value [cost * units]", function(){
            //sort
            console.table(products);
        });
    });
});
