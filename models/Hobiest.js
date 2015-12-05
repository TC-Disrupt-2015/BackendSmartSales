function HobbyistModel(mongoose)
{
	var hobbyistSchema = mongoose.Schema({ 
		name: String,
		email: String,
		location: String,
		productsID: [String],
		radius: Number
	});

	return mongoose.model(hobbyistSchema, 'hobbyist', 'hobbyist');
}
module.exports = HobbyistModel;