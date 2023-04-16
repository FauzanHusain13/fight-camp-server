const mongoose = require("mongoose");

let aboutSchema = mongoose.Schema({
    paragraph: {
        type: String,
        require: [true, "Nama paket harus diisi"]
    },
}, { timestamps : true })

module.exports = mongoose.model("About", aboutSchema);