let name1: string = '이동현';
console.log(name1);

let grade: number = 4;

let isDeleted: boolean = false;

const sum = (x: number, y: number): number => {
    return x * y;
}

const ages: number[] = [1,2,3,4];
const ages2: Array<number> = [1,2,3,4];

const strArray: string[] = ["h1", "h2"];
const strArray2: Array<string> = ["h1", "h2"];

const obj1: object = {

}

const obj2: Object = {

}

const f1 = (obj: object): void => {
    console.log(obj);
}

const f2 = (obj: Object): void => {
    console.log(obj);
}

f2([1, 2, 3]);
f2('h1');

f1([1,2,3,]);
//f1('h1');

const div = (x: number, y: number): number => {
    return x / y;
}

let p: null = null;
let u: undefined = undefined;

let name2: any = '이동현';
let name2Length: number = (<string>name2).length;

let name3: any = '이동현';
let name3Length: number = (name3 as string).length;

