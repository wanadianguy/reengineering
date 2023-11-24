import mongoose from 'mongoose';

export default mongoose.model('Cart', new mongoose.Schema({
    idUser: String,
    cart: [{
        idDish: String,
        quantity: Number,
    }],
    state: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: '',
    }
}));
