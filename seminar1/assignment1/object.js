const sopt = {
    season : 30,
    group : ['YB', 'OB'],
    part : ['서버', '기획', '디자인', '안드'],
    introduce: function() {
        this.part.map(name => {
            console.log(`솝트내 파트는 ${name} 파트가 있다`)
        });
    }
}

console.log(sopt.group);
sopt.introduce();

let arr = [1, 'item', true];
let arr2 = Array(4, null, {item : 'item'});

arr.map(item => console.log(item));
arr2.map(item => console.log(item));

function menu(dinner) {
    return `오늘 메뉴는 ${dinner} 입니다.`;
}

const str2 = menu('삼겹살');
console.log(str2);

const menu2 = (dinner) => {
    return `오늘 메뉴는 ${dinner} 입니다.`;
}

const str3 = menu('곱창');

const func = (num) => {
    return num * num;
}

const multiple = (func, num) => {
    console.log(func(num));
}

multiple(func, 3);

let a = 2;
let b = a++;
console.log(b);
console.log(a);
