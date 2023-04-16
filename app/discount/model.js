const mongoose = require("mongoose");

let discountSchema = mongoose.Schema({
    discountName: {
        type: String,
        require: [true, "Nama discount harus diisi"]
    },
    discount: {
        type: Number,
        require: [true, "Potongan harga harus diisi"]
    },
    codeDiscount: {
        type: String,
    },
}, { timestamps : true })

module.exports = mongoose.model("Discount", discountSchema);