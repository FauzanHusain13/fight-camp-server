const Discount = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const discount = await Discount.find()
            res.render("admin/discount/view_discount", {
                title: "Fight Camp || Discount",
                discount
            })
        } catch (err) {
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/discount/add", {
                title: "Fight Camp || Tambah discount"
            })
        } catch (err) {
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const payload = req.body

            const discount = await Discount(payload)
            await discount.save()

            res.redirect("/discount")
        } catch (err) {
            res.redirect("/discount")
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const discount = await Discount.findOne({ _id: id })
            res.render("admin/discount/edit", {
                title: "Fight Camp || Edit discount",
                discount
            })
        } catch (err) {
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body
    
            await Discount.findOneAndUpdate({
                _id: id
            }, payload)

            res.redirect("/discount")
        } catch (err) {
            res.redirect("/discount")
            throw err
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Discount.findOneAndDelete({ _id: id })
            res.redirect("/discount")
        } catch (err) {
            res.redirect("/discount")
            throw err
        }
    }
}