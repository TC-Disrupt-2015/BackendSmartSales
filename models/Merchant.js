function MerchantModel(mongoose)
{
	var merchantSchema = mongoose.Schema({ 
		merchantId: String,
		merchantToken: String
	});

	return mongoose.model(merchantSchema, 'merchant', 'merchant');
}

module.exports = MerchantModel;