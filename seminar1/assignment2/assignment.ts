import { Dinner } from "./dinner";
import { Member } from "./member";

const dinner: Dinner = {
    member: [
        { 
            name: '채정아',
            group: 'ob',
            part: 'server'
        }, 
        {
            name: '김동재',
            group: 'yb',
            part: 'server'
        },
        {
            name: '강민재',
            group: 'yb',
            part: 'server'
        },
        {
            name: '김루희',
            group: 'ob',
            part: 'server'
        },
        {
            name: '박진수',
            group: 'yb',
            part: 'server'
        }
    ],
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },
    organize(array) {
        let shuffleDinnerMember: Member[]  = this.shuffle(array);
        let ob: Array<Member> = [];
        let yb: Array<Member> = [];
        for (var value of shuffleDinnerMember) {
            if (value.group === 'ob') {
                ob.push(value);
            } 
            if (value.group === 'yb') {
                yb.push(value);
            }
        }
        console.log(`오늘의 저녁 식사 멤버는 ${this.shuffle(yb)[0].name}, ${this.shuffle(ob)[0].name}`);
    }
}

dinner.organize(dinner.member);