/**
 * Created by manthanhd on 12/5/2015.
 */
function OrderModel(mongoose) {
    var orderSchema = mongoose.Schema({
        inventoryId: {type: String, index: true},
        productId: {type: String, index: true},
        merchantId: {type: String, index: true},
        status: String,
        quantity: Number,
        date: {type: Date, default: new Date()},
        description: String
    });

    return mongoose.model('order',orderSchema, 'order');
}

module.exports = OrderModel;