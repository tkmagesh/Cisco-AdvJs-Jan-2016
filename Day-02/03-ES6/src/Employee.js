
const idSymbol = Symbol();
    
 export class Employee{
    constructor (id, name, salary){
        this[idSymbol] = id;
        this.name = name;
        this.salary = salary;
    }
    getId(){
        return this[idSymbol];
    }
    display(){
        console.log(this[idSymbol], this.name, this.salary);
    }
    static create(id, name, salary){
        return new Employee(id, name, salary);
    }
}

