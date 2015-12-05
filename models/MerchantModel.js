function MerchantModel(mongoose)
{
	var merchantSchema = mongoose.Schema({ 
		merchantId: String,
		merchantToken: String
	});

	return mongoose.model('merchant', merchantSchema, 'merchant');
}

module.exports = MerchantModel;