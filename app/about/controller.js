const About = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const about = await About.find()
            res.render("admin/about/view_about", {
                title: "Fight Camp || About",
                about
            })
        } catch (err) {
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/about/add", {
                title: "Fight Camp || Tambah about",
            })
        } catch (err) {
            res.redirect("/about")
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { paragraph } = req.body;

            const about = await About({ paragraph });
            await about.save()

            res.redirect("/about")
        } catch (err) {
            res.redirect("/about")
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const about = await About.findOne({ _id: id })
            res.render("admin/about/edit", {
                title: "Fight Camp || Edit about",
                about
            })
        } catch (err) {
            res.redirect("/about")
            throw err
        }
    }
}