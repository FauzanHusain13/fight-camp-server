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
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { paragraph } = req.body;
    
            await About.findOneAndUpdate({
                _id: id
            }, { paragraph })

            res.redirect("/about")
        } catch (err) {
            res.redirect("/about")
            throw err
        }
    }
}