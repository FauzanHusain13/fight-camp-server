const mongoose = require("mongoose");

let confirmationSchema = mongoose.Schema({
    historyTraining: {
        trainingName: { type: String, require:[true, "Jenis training harus diisi"] },
        thumbnail: { type: String, require:[true, "Thumbnail training harus diisi"] },
        package: { type: String, require:[true, "package membership harus diisi"] },
        price: { type: Number, require:[true, "price membership harus diisi"] },
        session: { type: String, require:[true, "Session harus diisi"] }
    },
    historyBank: {
        name: { type: String, require:[true, "Nama pemilik harus diisi"] },
        bankName: { type: String, require:[true, "Nama bank harus diisi"] },
        noRekening: { type: String, require:[true, "No rekening harus diisi"] }
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    admin: {
        name: { type: String, default: "Lisnawati" },
        noTelp: { type: Number, default: 0811265318 },
    },
    historyDiscount: {
        discountName: { type: String },
        discount: { type: Number },
        codeDiscount: { type: String },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number
    }
}, { timestamps : true })

module.exports = mongoose.model("Confirmation", confirmationSchema);