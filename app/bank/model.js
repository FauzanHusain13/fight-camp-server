const mongoose = require("mongoose");

let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Nama pemilik harus diisi"]
    },
    bankName: {
        type: String,
        require: [true, "Nama bank harus diisi"]
    },
    noWhatsapp: {
        type: Number,
        require: [true, "Nomor whatsapp harus diisi"]
    },
    noRekening: {
        type: String,
        require: [true, "Nomor rekening bank harus diisi"]
    },
}, { timestamps : true })

module.exports = mongoose.model("Bank", bankSchema);