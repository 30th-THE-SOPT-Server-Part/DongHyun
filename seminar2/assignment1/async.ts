console.log('Hello Server');

setTimeout((): void => {
    console.log('Hello Server2');
}, 3000);

console.log('Hello Server 3');


/**
 * resolve 동작에 대한 결과를 올바르게 줄 수 있음
 * reject 동작을 실패하면 호출
 */

const condition: boolean = false;
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject(new Error('에러 발생! condition false'))
    }
});

promise
    .then((resolveDate): void => console.log(resolveDate))
    .catch(err => console.log(err));
/**
 * resolve 실행이 정상적으로 이행(fullfiled) 된다면 then() 을 통해서 전달 
 * 실패시 catch()를 통해 전달
 */

const restaurant = (callback: () => void, time: number) => {
    setTimeout(callback, time);
}

const order = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황 - 음식 주문]');
            resolve('음식 주문 시작');
        }, 1000);
    })
}

const cook = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log('[레스토랑 진행 상황 - 음식 조리]');
        restaurant(() => {
            resolve(`${progress} -> 음식 조리 중`);
        }, 2000);
    });
}

const serving = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log('[레스토랑 진행 상황 - 음식 서빙]');
        restaurant(() => {
            resolve(`${progress} -> 음식 서빙 중`);
        }, 3000);
    });
}

const eat = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log('[레스토랑 진행 상황 - 음식 먹기]');
        restaurant(() => {
            resolve(`${progress} -> 음식 먹는 중`);
        }, 4000);
    });
}

order()
    .then(progress => cook(progress))
    .then(progress => serving(progress))
    .then(progress => eat(progress))
    .then(progress => console.log(progress));

Promise.resolve(123)
    .then(res => {
        throw new Error('에러 발생!')
        return 456
    })
    .then(res => {
        console.log(res)
        return Promise.resolve(789)
    })
    .catch(err => {
        console.log(err.message)
    });

