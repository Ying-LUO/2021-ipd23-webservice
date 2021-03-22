// Print something
console.log("Heyyy! Writing node.js")

// Conditions
let age = 17;

if(age > 18){
    console.log("You can drink")
}else if(age > 12){
    console.log("You can have juice")
}else{
    console.log("You can only have juice")
}

// Loops
for(let i=0; i<10; i++){
    console.log(i);
}

let i=0;
while (i<10) {
    console.log(i);
    i++;
}

let j=0
do{
    console.log(j);
    j++;
}while (j < 10)

//=======================Objects==============
// key : value pair
const student = {
    name: "flash",
    studentid: "1234",
    courses:["JS","JAVA", "PHP", ".NET"],
    program:{ // nested object: object inside an object
        name:"IPD",
        duration:"12 months",
        noOfCources: 10,
        campus:{
            name:"John Abbott",
            rating: "5/5",
            awesomeness: "Super Duper Awesome"
        }
    },
    sayHi:function(){
        console.log("Heeeeeyyyyy!!!");
    }
}

// access the property
student.name;
student.studentid;
student["studentid"];
student.program.noOfCources;
student.sayHi();  // access to the function
student.courses[0];  // access first element from array

// =================functions================
function adder(x,y){
    const sum = x+y;
    return sum;
}
adder(5, 10);

const adder2 = function(x,y){
    const sum = x+y;
    return sum;
}
adder2(5, 10);

// Using fat arrow operator
const adder3 = (x,y) => {
    const sum = x+y;
    return sum;
}
adder3(5, 10);

//========method by foreach==============
const numbers = [1,2,3,4,5,6,7,8,9];

numbers.forEach(function(number){
    console.log(number*3);
});

numbers.forEach((number)=>{
    console.log(number*3);
});

numbers.forEach(number=>{
    console.log(number*3);
});

//==========find and print all the numbers in array [5,7,45,435,656,2,546,45,784,243,6,87] that are greater than 50 using find method on arrays.
const array = [5,7,45,435,656,2,546,45,784,243,6,87];

array.find(number=>{
    if(number>50){
        console.log("Number greater than 50:" + number);
    }
});

function greaterThan(number) {
    //return all the numbers in array that greater than 50
    //if(number >= 50){
    //    console.log("Number greater than 50:" + number);
    //}

    // return the first number in array that greater than 50
    return number>50;
  }
  
array.find(greaterThan);


const students = [{
    name: "superwoman",
    marks: 90
},{
    name: "flash",
    marks: 70
},{
    name: "batman",
    marks: 77
},{
    name: "superman",
    marks: 60
},{
    name: "arrow",
    marks: 94
}];

// Q1: Sort all the students by marks from highest to lowest using sort method
// ascending:
students.sort(function(a, b){return a.marks - b.marks});

// descending:
students.sort(function(a, b){return b.marks - a.marks});

// Q2: Filter and display all the students with marks greater than 80 using filter method
students.filter(a => a.marks > 80);

// q3: Create a new array from the array above in which the marks of all students is 5 more than current marks using map
students.map(a => a.marks + 5);