import mongoose from 'mongoose';

const connectToDb = async (url) => {
  try {
    const result = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connectToDb;
