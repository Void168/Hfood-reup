import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    image: { type: String, required: false },
    category: { type: String, required: false },
    expiry: {type: String, required: false},
    type: {type: String, required: false},
    description: { type: String, required: false },
    price: { type: Number, required: false, min: 0 },
    discount:{ type: Number, required: false, min: 0},
    countInStock: { type: Number, required: false, min: 0},
    rating: { type: Number, required: false, min: 0},
    numReview: { type: Number, required: false, min: 0 },
    import: { type: String, required: false },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;