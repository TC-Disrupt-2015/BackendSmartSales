/**
 * Created by manthanhd on 12/5/2015.
 */
function OrderModel(mongoose) {
    var orderSchema = mongoose.Schema({
        productId: String,
        merchantId: String,
        status: String,
        quantity: Number,
        date: {type: Date, default: new Date()},
        price: Number,
        amount: Number,
        description: String
    });

    return mongoose.model(orderSchema, 'order', 'order');
}

module.exports = OrderModel;