const mongoose = require("mongoose");

let sosmedSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Nama sosial media harus diisi"]
    },
    url: {
        type: String,
        require: [true, "Url harus diisi"]
    },
}, { timestamps : true })

module.exports = mongoose.model("Sosmed", sosmedSchema);