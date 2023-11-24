import mongoose from 'mongoose';

export default mongoose.model('Dish', new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    allergens: String
}));
