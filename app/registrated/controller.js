const Confirmation = require("../confirmation/model")

module.exports = {
    index: async(req, res) => {
        try {
            const registrated = await Confirmation.find({ "status": "success" }).populate("user")

            res.render("admin/registrated/view_registrated", {
                registrated,
                title: "Fight Camp || registrated"
            })
        } catch (err) {
            res.redirect("/registrated")
            throw err
        }
    }
}