
import { checkValidManager, checkValidCustomer } from "./services/services.js";

const m1 =     {
    _id : "M1",
    restID: "R1",
    fName : "Anna",
    lName : "Ruiz",
    phone : "000-000-0000",
    __v : 0,
    active : true
}

const m2 =     {
    _id : "M2",
    restID: "R2",
    fName : "Anna",
    lName : "Ruiz",
    phone : "000-000-0000",
    __v : 0,
    active : true
}

const item1 = {
    _id: "I1",
    restID: "R1",
    name: "Mama Burger",
    description: "Burger consisting of meat and a bun",
    image: "mamaburger.png",
    category: "Main",
    price: 5.99,
    soldOut: false,
    active: true,
    __v: 0
  }

const c1 =     {
    _id : "C1",
    fName : "Starfire",
    lName : "Kori",
    phone : "000-000-0000",
    __v : 0,
    active : true
}

console.log('true: ', checkValidManager(m1, item1));
console.log('false: ', checkValidManager(m2, item1));
console.log('false: ', checkValidManager(c1, item1));

console.log('true: ', checkValidCustomer(c1, item1));
console.log('false: ', checkValidCustomer(m2, item1));
console.log('false: ', checkValidCustomer(c1, item1));