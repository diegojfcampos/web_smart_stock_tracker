
console.log("Hellos World");
//variables
let example = "let declaration example";
console.log(example);

const pi = 3.14;
console.log("PI " + pi);

//object

let person = {
    name: "Stock",
    age: 30
};

console.log(person);

//changing atributes

person.age = 36;

console.log(person);

//bracket notation
person["name"] = "Diego";
console.log(person);

//Arrays

let selectedColors =["RED", "BLUE"];
console.log(selectedColors);
console.log(selectedColors[0]);

//Adding element
selectedColors[2] = "GRAY";
console.log(selectedColors);
console.log(selectedColors.length);

//functions

function greet(person){
    console.log(person);
}
greet(person);

let number = 213123;
function square(num){
    return num * num;
}

console.log(square(number));

//OBJECT

let employee = {
    baseSalary: 30000,
    overtime: 10,
    rate: 20,

    getWage: function(){
        return this.baseSalary + (this.overtime * this.rate);
    }
};

console.log(employee.getWage());
console.log(typeof(employee));

//Another away to creat an object

function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drwan");
    }
}

const anotherObject = new Circle(1);
console.log(anotherObject);
console.log(anotherObject.draw());

//alert("CHECKING ALERT");
