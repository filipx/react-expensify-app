// Object destructuring

const person = {
  name: 'Andrew',
  age: 26,
  location: {
    city: 'Philadelphia',
    temp: 90
  }
}
const {name: firstName = 'User', age} = person;
console.log(`${firstName} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
  
}
// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holliday',
//   publisher: {
//     name: 'Penguin'
//   } 
// }

// const { name: publisherName = 'Self-Published' } = book.publisher
// console.log(publisherName);


// Array destructuring

const address = ['1299 S Jupiter Street', 'Philadephia', 'Pennsylvania', '3894'];
// const [street, town, state, code] = address;
const [, town, state = 'New York'] = address;

console.log(`You are in ${town}, ${state}.`);

const items = ['Coffee', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = items;
console.log(`A medium ${itemName} costs ${mediumPrice} bucks.`);
