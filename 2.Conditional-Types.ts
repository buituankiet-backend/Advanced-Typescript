/*
* Conditional Types
* Syntax: Type someType = T extends U ? X : Y
*/

// User for 
type someType = string | number;
type MyConditionalType = someType extends string | number ? string : null; //? string

//User for function
function someFunction<T>(value:T) {
type A = T extends boolean ? 'type A' 
            : T extends string 
            ? 'Type B'
            : T extends number
            ? 'Type C'
            : 'Type D';
    const someOtherFunction = (
        someArg: T extends boolean ? 'Type A' : 'Type B'
    ) => {
            const a: 'Type A' | 'Type B' = someArg
    }
    return someOtherFunction;
}

const typeB = someFunction('Hello');
const typeA = someFunction(true || false) // dac biet khi su dung boolean in typescript

type StringOrNot<T> = T extends string ? string : never; // ???

type AUnion = string | boolean | never; // => String or boolean

// type Exclude<T, U> = T extends U ? never : T;
type resultType = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
/*
* 'a' extends 'a' | 'b' ? never : 'a' => never
* 'b' extends 'a' | 'b' ? never : 'a' => never
* 'c' extends 'a' | 'b' ? never : 'c' => 'c'
*/

type MyType<T> = T extends string | number ? T : never;
type MyResult = MyType<string | number | boolean>;

type MyTypeFunction<T> = (() => T) extends () => string | number ? T : never;
type myResultFunction = MyTypeFunction<string | number >

type myTypeArray<T> = [string | number] extends [string | number] ? T : never;

// type SomeType = T extends infer U ? U : Y => return Type

type inferSomething<T> = T extends infer U ? U : any;
type inferred = inferSomething<'Hello'> // => type inferred = 'Hello' 

type inferSomething2<T> =  T extends { a: infer A, b: infer B} ? A & B : any;
type inferred2 = inferSomething2<{
    a: { someAProp: 1},
    b: { someBProp: 2};
}>; // type inferred2 = { someAProp: 1} & {someBProp: 2}

