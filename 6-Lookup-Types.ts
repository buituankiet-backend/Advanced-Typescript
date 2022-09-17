
//Indexed access types 

type UserId = number;
interface userAddress {
    street: string;
    city: string;
    country: string;
}

interface User {
    id: UserId;
    name: string;
    address: userAddress
}

type City = User['address']['city'];
type Id = User['id'];
type IdOrName = User['id' | 'name']

function updateAddress(id: User['id'], newAddress: User['address']) {}

//keyof 
type UserProperties = keyof User;

let userProperties: UserProperties = 'id';

//keyof + Indexed access types + generics
function getProperties<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let user = {name: 'kiet', age: 22};
const name1 = getProperties(user, 'name');
const age = getProperties(user, 'age')
console.log(name1, age);

//Example 2
type SubmitRequest = {
    transactionId: string;
    personal: {
        a: string,
        b: string,
        c: string,
        previousAliases: {
            firstName: string,
            middleName: string,
            lastName: string,
        }[]
        d: string,
        e: string
    },
    driver: {
        a: string,
        b: string,
        c: string,
        d: string,
        e: string[]
    },
    payment: RequestPayment
}

type RequestPayment = {
    cardToken: string
}

type RequestPayment2 = SubmitRequest['payment'];
type RequestPersonal = SubmitRequest['personal']['previousAliases']

function getPayment(): SubmitRequest['payment'] | RequestPayment | RequestPayment2 {
    return {
        cardToken: 'abcjadjajdjadjabd'
    }
}