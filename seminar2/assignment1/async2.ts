//async
//함수 표현식
const asyncFunctuon1 = async () => {

}

//함수 선언식
async function asyncFunctuon2() {

}

let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc1 - ${msg}`);
        }, 1000);
    });
};

let asyncFunc2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFunc2 - ${msg}`);
        }, 1500);
    });
};

const promiseMain1 = (): void => {
    asyncFunc1('hi')
        .then((result: string) => {
            console.log(result);
            return asyncFunc2('hello');
        }).then((result: string) => {
            console.log(result);
        });
};
promiseMain1()

const asyncMain = async (): Promise<void> => {
    let result = await asyncFunc1('hi');
    console.log(result);
    result = await asyncFunc2('hello');
    console.log(result);
};

asyncMain()