import { Schema, model, models } from "mongoose";

// Define the schema for the Prompt model
const promptFromSchme = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    name: {
        type: String,
        required: [true, 'Please provide a name.'], // Corrected typo and improved error message
    },
    desc: {
        type: String,
        required: [true, 'Please provide a description.'], // Improved error message
    },
    images: [{
        type: String,
        required: [true, 'Please provide at least one image.'], // Improved error message
    }],
    price: {
        type: Number,
        required: [true, 'Please provide a price.'], // Improved error message
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'],
        required: [true, 'Please provide a category.'], // Improved error message
    }
});

// Check if the Prompt model is already defined, otherwise create it
const Prompt = models.Prompt || model('Prompt', promptFromSchme);

export default Prompt;
