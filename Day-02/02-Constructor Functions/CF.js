var Employee = (function(){
    function display(){
        console.log(this.id, this.name, this.salary);
    }

    function getId(){
        return this._id;
    }
    function Employee(id, name, salary){
       if (!(this instanceof Employee))
          return new Employee(id, name, salary);
        
       this._id = id;
       this.name = name;
       this.salary = salary;
       this.display = display;
    }
    return Employee;
})();


function Employee(id, name, salary){
   if (!(this instanceof Employee))
      return new Employee(id, name, salary);

   this.__id = id;
   this.name = name;
   this.salary = salary;
}
Employee.prototype.getId = function(){
    return this.__id;
};
Employee.prototype.display = function display(){
    console.log(this.id, this.name, this.salary);
}

