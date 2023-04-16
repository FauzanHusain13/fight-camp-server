const Membership = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const membership = await Membership.find()
            res.render("admin/membership/view_membership", {
                title: "Fight Camp || Membership",
                membership
            })
        } catch (err) {
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/membership/add", {
                title: "Fight Camp || Tambah membership"
            })
        } catch (err) {
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const payload = req.body

            const membership = await Membership(payload)
            await membership.save()

            res.redirect("/membership")
        } catch (err) {
            res.redirect("/membership")
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const membership = await Membership.findOne({ _id: id });
            res.render("admin/membership/edit", {
                title: "Fight Camp || Edit paket",
                membership
            })
        } catch (err) {
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body
    
            await Membership.findOneAndUpdate({
                _id: id
            }, payload)

            res.redirect("/membership")
        } catch (err) {
            res.redirect("/membership")
            throw err
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Membership.findOneAndDelete({ _id: id })
            res.redirect("/membership")
        } catch (err) {
            res.redirect("/membership")
            throw err
        }
    }
}