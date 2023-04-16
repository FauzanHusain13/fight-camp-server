const mongoose = require("mongoose");

let trainingSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Nama training harus diisi"]
    },
    desc: {
        type: String,
        require: [true, "Deskripsi training harus diisi"]
    },
    thumbnail: {
        type: String,
    },
    memberships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Membership",
    }]
}, { timestamps : true })


trainingSchema.pre('validate', async function(next) {
    try {
        const memberships = await mongoose.model('Membership').find({}, '_id');
        this.memberships = memberships.map(membership => membership._id);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Training", trainingSchema);