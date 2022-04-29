
export interface BlogUpdateDto {
    // update 들어올 수도 있고 아닐 수도 있음 -> optional
    blogName?: string;
    userName?: string;
    email?: string;
    age?: number;
    url?: string;
}