import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  item: {
    name: String,
    category: String,
    image: String, // URL of the image
  },
  quantity: Number,
  type: String,
  totalPrice: Number,
});

export default mongoose.models.CartItem || mongoose.model("cart", CartItemSchema);
