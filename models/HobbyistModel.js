function HobbyistModel(mongoose)
{
	var hobbyistSchema = mongoose.Schema({
		name: String,
		email: String,
		location: {type:[Number], index: '2d'},// Lon, Lat
		radius: Number,

	});

	return mongoose.model('hobbyist', hobbyistSchema, 'hobbyist');
}
module.exports = HobbyistModel;