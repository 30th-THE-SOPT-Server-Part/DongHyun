import {Member} from "./member"; 

export interface Dinner {
    member: Member[];
    shuffle(array: Array<Member>): Array<Member>;
    organize(array: Array<Member>): void;
}