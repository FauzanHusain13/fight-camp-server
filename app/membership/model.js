const mongoose = require("mongoose");

let membershipSchema = mongoose.Schema({
    package: {
        type: String,
        require: [true, "Nama paket harus diisi"]
    },
    price: {
        type: Number,
        require: [true, "Harga harus diisi"]
    },
    session: {
        type: String,
        require: [true, "Jumlah session harus diisi"]
    },
}, { timestamps : true })

module.exports = mongoose.model("Membership", membershipSchema);