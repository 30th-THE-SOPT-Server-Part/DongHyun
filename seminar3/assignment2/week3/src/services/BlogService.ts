import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { BlogCreateDto } from "../interfaces/Blog/BlogCreateDto";
import { BlogResponseDto } from "../interfaces/Blog/BlogResponseDto";
import { BlogUpdateDto } from "../interfaces/Blog/BlogUpdateDto";
import Blog from "../models/Blog";

const createBlog = async (blogCreateDto: BlogCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const blog = new Blog({
            blogName: blogCreateDto.blogName,
            userName: blogCreateDto.userName,
            email: blogCreateDto.email,
            age: blogCreateDto.age,
            url: blogCreateDto.url
        });

        await blog.save();

        const data = {
            _id: blog.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateBlog = async (blogId: string, blogUpdateDto: BlogUpdateDto) => {
    try {
        // findByIdAndUpdate
        await Blog.findByIdAndUpdate(blogId, blogUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findBlogById = async (blogId: string): Promise<BlogResponseDto | null> => {
    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return null;
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteBlog = async (blogId: string): Promise<void> => {
    try {
        await Blog.findByIdAndDelete(blogId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}