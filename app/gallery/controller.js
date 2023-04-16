const Gallery = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const gallery = await Gallery.find()
            res.render("admin/gallery/view_gallery", {
                title: "Fight Camp || Gallery",
                gallery
            })
        } catch (err) {
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/gallery/add", {
                title: "Fight Camp || Tambah gallery",
            })
        } catch (err) {
            res.redirect("/gallery")
            throw err
        }
    }
}