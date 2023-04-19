const Sosmed = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const sosmed = await Sosmed.find()
            res.render("admin/sosmed/view_sosmed", {
                title: "Fight Camp || Sosmed",
                sosmed
            })
        } catch (err) {
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params

            const sosmed = await Sosmed.findOne({ _id: id })
            res.render("admin/sosmed/edit", {
                title: "Fight Camp || Edit sosmed",
                sosmed
            })
        } catch (err) {
            res.redirect("/sosmed")
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body

            await Sosmed.findOneAndUpdate({
                _id: id
            }, payload)

            res.redirect("/sosmed")
        } catch (err) {
            res.redirect("/sosmed")
            throw err
        }
    }
}