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
const result1 = students.sort(function(a, b){return a.marks - b.marks});
console.log(result1);

// descending:
const result2 = students.sort(function(a, b){return b.marks - a.marks});
console.log(result2);

// Q2: Filter and display all the students with marks greater than 80 using filter method
const result3 = students.filter(a => a.marks > 80);
console.log(result3);

// q3: Create a new array from the array above in which the marks of all students is 5 more than current marks using map
const result4 = students.map(a => a.marks + 5);
console.log(result4);