/*
fucker(merwin)

let arr = [1,2,3,4,5];

let arr1 = arr.reverse()

console.log(arr1)

const numbers = [23, 5, 100, 56, 9, 13, 37, 10, 1]
const numbers2 = [...numbers]

console.log(numbers == numbers2)
// let numbers1 =  numbers.splice(1,3)

// // numbers.sort((a, b) => {
// //     console.log("a",a)
// //     console.log("b",b)
// //     return (a-b)
// // });

console.log(numbers2)
console.log(numbers)

const array = [15, 16, 17, 18, 19];

function reducer(previous, current, index, array) {
  const returns = previous + current;
  console.log(`previous: ${previous}, current: ${current}, index: ${index}, returns: ${returns}, array: ${array}`);
  return returns;
}

array.reduce(reducer);


obj = {
  name : "sherwin",
  age : 21
}

arr1 = [2,3,4,5,6,7]

let parser = (...args) => {
  console.log(args[0])
}

parser(obj)

const arry = [...arr1]

console.log(arry)

function printer(){
  console.log(this.name)
}

const newPrinter = printer.bind(obj)

newPrinter()

Function.prototype.myBind = function (args) {
  let fun =  this;
  let obj = args
 return function (){
   obj.yoo = fun
   obj.yoo()
 }
}
// console.log("hi")

yo = printer.myBind(obj)

console.log(yo)
yo()

// const hi = function (){
//   console.log(this)

//   return this
// }

// console.log(hi())


function DogObject(name, age) {
  let dog = Object.create(constructorObject);
  dog.name = name;
  dog.age = age;
  return dog;
}

console.log(DogObject.prototype)


function Rectangle(height,width){
  this.height = height
  this.width = width
}

Rectangle.prototype.logger = function (){
  console.log(this.height)
}

// Rectangle.logger()

var shape = new Rectangle(2,3)

console.log(shape.logger)

// shape.logger()

Rectangle.prototype.fucker = function(){
  console.log("hello")
}

console.log(shape.fucker)

function Square(side){
  this.side = side
}

Square.prototype = Object.create(Rectangle.prototype)

console.log(Square)



// Square.prototype.side = function (){
//   console.log(this.side)
// }

// var box = new Square(2)

// console.log(box)

// console.log(Square.prototype)

// date = new Date()
// console.log(date.getTime())

function DogObject(name, age) {
  let dog = Object.create(constructorObject);
  dog.name = name;
  dog.age = age;
  return dog;
}
let constructorObject = {
  speak: function(){
      return "I am a dog"
  }
}
let bingo = DogObject("Bingo", 54);
console.log(bingo);


var data = [1,2,3,4,5,6]

var data2 = data

console.log(data2)

data[2] = 7

console.log(data2)

data2[3] = "hi"

console.log(data2)
console.log(data)


if(obj['name']){
  console.log(true)
}

// console.log(value)

console.log(obj['name'])


*/

function dataFetcher(){
  console.log("fetching data...")
}

let debouncer = function(fun,delay){
  let timer;
  return function(){

    clearTimeout(timer)
    timer = setTimeout(fun,delay)
  }
}

let debouncedFun = debouncer(dataFetcher,500)

function dataUploader(){

  console.log("uploading data...")

}


let throttler =  function (fn,delay){
  let flag = true
  return function(){
    if(flag){
      fn()
      flag = false
      setTimeout(()=>{
        console.log("timeOut")
        flag = true
      },delay)
    }
  }
}

let throttledFun = throttler(dataUploader,2000)


function gp (){
  console.log("gp")
}

function p (e){
  console.log("p")
  e.stopPropagation()
}

function c (){
  console.log("c")
}

document.getElementById("gp").addEventListener("click",gp,true)
document.getElementById("p").addEventListener("click",p,false)
document.getElementById("c").addEventListener("click",c,true)


let observer = new IntersectionObserver((entries,observer)=>{
  console.log(entries)
  console.log(observer)
})

observer.observe(document.getElementById("gp"))