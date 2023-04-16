const mongoose = require("mongoose");

let logoSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Nama perusahaan harus diisi"]
    },
    logo: {
        type: String,
        require: [true, "Logo harus diisi"]
    }
}, { timestamps : true })

module.exports = mongoose.model("Logo", logoSchema);