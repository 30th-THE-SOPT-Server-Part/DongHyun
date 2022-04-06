// var name = '이동현';
// var name = 'leedonghyun';

// console.log(name);

// let name2 = '이동현';
// //let name2 = '이동현2'; 재선언 에러

// console.log(name2);

// let name3 = '이동현3';

// console.log(name3);

if (true) {
    var x = 'var variable';
}
console.log(x);

if (true) {
    const y = 'const variable';
}
//console.log(y);

function foo () {
    if (true) {
        var name = '이동현';
        console.log('if - block - ' , name);
    }
    console.log('function - block - ', name);
}
//console.log('global - block - ', name);

foo()