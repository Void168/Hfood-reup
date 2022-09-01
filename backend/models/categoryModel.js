import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Categories = mongoose.model('Categories', categorySchema);

export default Categories;