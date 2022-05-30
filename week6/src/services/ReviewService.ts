import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType"
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import { ReviewsResponseDto } from "../interfaces/review/ReviewsResponseDto";
const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const review = new Review(reviewCreateDto);
        await review.save();
        const data = {
            _id: review._id
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getReviews = async (movieId: string, search: string, option: ReviewOptionType, page: number): Promise<ReviewsResponseDto> => {
    const regex = (search: string) => new RegExp(`.*${search}.*`);
    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;
    try {
        const titleRegex = regex(search);
        if (option === 'title') {
            reviews = await Review.find({ title: { $regex: titleRegex}}).where('movie').equals(movieId).sort({ createdAt: -1}).skip(perPage * (page -1)).limit(perPage);
        } else if (option === 'content') {
            reviews = await Review.find({content: { $regex: titleRegex}}).where('movie').equals(movieId).sort({ createdAt: -1}).skip(perPage * (page -1)).limit(perPage);
        } else {
            reviews = await Review.find({
                $or: [
                    {title: { $regex: titleRegex}},
                    {content: {$regex: titleRegex}}
                ]
            }).where('movie').equals(movieId).sort({ createdAt: -1}).skip(perPage * (page -1)).limit(perPage);
        }

        const total = await Review.countDocuments({movie: movieId});
        const lastPage: number = Math.ceil(total/ perPage);
        const data = {
            reviews,
            lastPage
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export default {
    createReview,
    getReviews
}