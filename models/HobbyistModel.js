function HobbyistModel(mongoose)
{
	var hobbyistSchema = mongoose.Schema({ 
		name: String,
		email: String,
		location: {
			lat: Number,
			lon: Number
		},
		radius: Number
	});

	return mongoose.model('hobbyist', hobbyistSchema, 'hobbyist');
}
module.exports = HobbyistModel;