function HobbyistModel(mongoose)
{
	var hobbyistSchema = mongoose.Schema({ 
		name: String,
		email: String,
		location: {
			lat: Number,
			lon: Number
		},
		productsId: [String],
		radius: Number
	});

	return mongoose.model(hobbyistSchema, 'hobbyist', 'hobbyist');
}
module.exports = HobbyistModel;