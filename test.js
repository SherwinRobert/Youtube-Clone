// object1  = {
//     name: "sherwin"
// }

// array = ["sherwin"]


// function Sherwin (age) {
//     this.age = age
//     return age
// }

// age = Sherwin(21)
// console.log(age)
// console.log(Sherwin)

// console.log(Sherwin.prototype)

// // var jason = new Sherwin(13)
// var jason = Object.create(Sherwin.prototype)
// console.log(jason)

// console.log(jason.merwin)

// // Sherwin.call(jason,13)

// // console.log(jason)


// Sherwin.prototype.merwin =  function (){
//     console.log("merwin is a sucker")
// }

// console.log(jason.merwin)

// function Sharon(){
//     console.log("he is a big fucker")
// }

// console.log(Sharon.prototype)

// Sharon.prototype = Object.create(Sherwin.prototype)

// console.log("the updated prototype",Sharon.prototype)

// function Rectangle( width, height ) {
//     this.width = width;
//     this.height = height;
//   };
//   Rectangle.prototype.area = function() {
//     return this.width * this.height;
//   };
//   var shape = new Rectangle( 3, 4 );


// let object = {
//     name : "sherwin",
//     age : "21"
// }

// let object2 = {
//     name: "merwin",
//     age:18
// }

// arr = ["sherwin","merwin"]

// function printer(){
//     console.log(`the name is ${this.name} and age is ${this.age}`)
// }

// newPrinter = printer.bind(object)

// newPrinter()

// Function.prototype.myBind =  function(...args){
//     let funName = this;
//     return args
//     // return function(obj) {
//     //     funName(obj);
//     // }
// }

// bindedPrinter = printer.myBind(object)

// console.log(bindedPrinter)

// // a = [...object2]

// console.log(a)


var sherwin = 500

const merwin = "brooo"

function fucker(data) {
    console.log(data)
}