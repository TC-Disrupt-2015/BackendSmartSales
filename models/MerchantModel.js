function MerchantModel(mongoose) {
    var merchantSchema = mongoose.Schema({
        merchantId: String,
        accessToken: String,
        location: {
            lat: Number,
            lon: Number
        }
    });

    return mongoose.model('merchant', merchantSchema, 'merchant');
}

module.exports = MerchantModel;