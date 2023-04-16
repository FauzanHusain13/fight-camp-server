const mongoose = require("mongoose");

let gallerySchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Judul harus diisi"]
    },
    image: {
        type: String,
        require: [true, "Image harus diisi"]
    }
}, { timestamps : true })

module.exports = mongoose.model("Gallery", gallerySchema);