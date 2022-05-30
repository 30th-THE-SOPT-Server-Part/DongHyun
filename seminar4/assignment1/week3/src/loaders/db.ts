import mongoose from "mongoose";
import config from "../config"; 
import Movie from "../modules/Movie";
import Review from "../modules/Review";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log("Mongoose Connected ...");

    Movie.createCollection().then(function (collecttion) {
      console.log("Review Collection is created!");
    });
    
    Review.createCollection().then(function (collection) {
      console.log("Review Collection is created!");
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
