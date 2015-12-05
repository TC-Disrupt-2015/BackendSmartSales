function ProductModel(mongoose) {
    var productSchema = mongoose.Schema({
        name: String,
        description: String,
        photos: [String],
        price: Number,
        unitsAvailable: Number,
        tags: [String],
        hId: String
    });

    return mongoose.model('product', productSchema, 'product');
}

module.exports = ProductModel;