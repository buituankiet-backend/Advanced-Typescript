// Use Partial<Type> it is in common use with interface => convert Optional 

interface Student  {
    name: string;
    age: number;
}

const kietOld = (id: number, student: Student) => {}

kietOld(1, {
    name: 'kiet',
    age: 22
})

const kietNew = (id: number, student: Partial<Student>) => {}

kietNew(2, {
    name: 'abc'
})

// Khi su dung cai Partial nay 
// Chung ta co the giai quyet duoc chuyen tham so co duoc truyen vao hay khong

//Use Required<Type> the opposite of Partial
interface Human {
    name?: string;
    age?: number
}

const humanOld: Human = { name: 'kiet'};
const humanNew: Required<Human> = { name: 'Kiet', age: 22} 

//Use Readonly<Type> it uses read not change
interface Todo {
    title: string;
    description?: string;
    completed?: boolean;
  
}

const todo: Readonly<Todo> = {
        title: "Learning"
}

// todo.title = 'Sleep' // => Error Beaucase it use read 

// Use Record<K, T>
const students: Record<string, /*Partial<Student> */ Student> = {
    student1: {
        name: 'kiet',
        age: 22
    },
    student2: {
        name: 'chien',
        age: 22
    }
}

console.log(students.student1); // { name: 'kiet', age: 22 }

interface CatInfo {
    age: number;
    breed: string;
}

type CatName = 'a' | 'b' | 'c';

const cats: Record<CatName, CatInfo> = {
 a : {
    age: 22,
    breed: 'a'
 }, 
 b : {
    age: 23,
    breed: 'b'
 },
 c : {
    age: 24,
    breed: 'c'
 }
}

console.log( cats.a); // { age: 22, breed: 'a' }
console.log( cats.b);// { age: 23, breed: 'b' } 
console.log( cats.c);//{ age: 24, breed: 'c' }

//Use Pick<T, K>

type TodoPick = Pick<Todo, 'title' | 'description'>

const todoNew: TodoPick = {
    title: 'abc',
    description: 'xyz'
}
console.log(todoNew); // { title: 'abc', description: 'xyz' }

//Use Omit 
type TodoOmit = Omit<Todo, 'title'>
/*
type TodoOmit = {
    description?: string | undefined;
    completed?: boolean | undefined;
}
*/

//Use Exclude & Extract

type AvailableDrinks = 'Coffee' | 'Tea' | 'Orange Juice' | 'Lemonade';

let JohnsDrinks: AvailableDrinks;
JohnsDrinks = 'Coffee'

type DrinksJaneDoesntLike = 'Coffee' | 'Orange Juice';
type DrinksJaneLikes = 'Tea' | 'Lemonade' | 'Mojito';

// let JanesDrink: Exclude<AvailableDrinks, DrinksJaneDoesntLike>; //let JanesDrink: "Tea" | "Lemonade"
let JanesDrink: Extract<AvailableDrinks, DrinksJaneLikes>; // let JanesDrink: "Tea" | "Lemonade"
JanesDrink = 'Tea';

//Use NonNullable

interface StarshipProperties {
    color?: 'blue' | 'green' | 'red';
}

function painStarshipt( 
    id: number, 
    color: NonNullable<StarshipProperties['color']>) {
        return {
            id, 
            color
        }
}

//Use ReturnType
type painStarshiptReturn = ReturnType<typeof painStarshipt>;

// painStarshipt(1, null) // Error 
painStarshipt(1, 'green')

//Use Instancetype<T> Muc dich ban dau su dung la dinh dang cai kieu du lieu nay
class Dog {
    name: string;

    sound() {}

    constructor(name: string) {
        this.name = name;
    }
}

type dogInstanceType = InstanceType<typeof Dog>; //Dog

type Constructable<classInstance> = new (...args: any[]) => classInstance;

function Deletable<BaseClass extends Constructable<{}>>(Base: BaseClass) {
    return class extends Base {
        deleted: boolean;
        delete() {}
    }
}

class Car {
    deleted: boolean;
    delete() {}
    constructor( public name: string) {}
}

class User {
    deleted: boolean;
    delete() {}
    constructor(public name: string) {}
}

const DeleteCar = Deletable(Car);
const DeleteUser = Deletable(User);

type DeletableUserInstance = InstanceType<typeof DeleteUser>;
type DeletableCarInstance = InstanceType<typeof DeleteCar>;


class Profile {
    user: DeletableUserInstance;
    car: DeletableCarInstance;
}

const profile = new Profile();
profile.user = new DeleteUser('kiet');
profile.car = new DeleteCar('BMW');