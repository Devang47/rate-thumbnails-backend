import mongoose from 'mongoose';
const { Schema } = mongoose;

export const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Video', VideoSchema);
