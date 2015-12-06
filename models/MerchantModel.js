function MerchantModel(mongoose) {
    var merchantSchema = mongoose.Schema({
        merchantId: String,
        accessToken: String,
        location: {type:[Number], index: '2d'} // Lon, lat
    });

    return mongoose.model('merchant', merchantSchema, 'merchant');
}

module.exports = MerchantModel;