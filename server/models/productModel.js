import mongoose from 'mongoose';

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    stock:{
        type:Number,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        trim:true
    },
size: {
    type: [String], 
    required: true,
    trim: true
},
color: {
    type: [String], 
    required: true,
    trim: true
},

});



const Product = mongoose.model("Product", productSchema);

export default Product;