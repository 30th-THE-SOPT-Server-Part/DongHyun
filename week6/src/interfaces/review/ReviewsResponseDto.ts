import {ReviewInfo} from "./ReviewInfo";

export interface ReviewsResponseDto {
    Reviews: ReviewInfo[];
    lastPage: number;
}