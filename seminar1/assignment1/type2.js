const name = '이동현';
console.log(typeof name);

let age = 24;
console.log(typeof age);

let server = true;
console.log(typeof server);

console.log('안녕하세요 제 이름은 : ' + name);

console.log(`안녕하세여 제 이름은 ${name}`);

console.log(typeof null);
console.log(typeof undefined);

let numArr = [1, 2, 3, 4];
let arr = ["안녕", 2, "우와", 4, true];
const newNumArr = numArr.map(x => x * 2);
console.log(newArr);

newNumArr.map(x => {
    console.log(x);
});

for (const x of newNumArr) {
    console.log(x);
}

