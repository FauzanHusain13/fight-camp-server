const Bank = require("./model");

module.exports = {
    index: async(req, res) => {
        try {
            const bank = await Bank.find();
            res.render("admin/bank/view_bank", {
                bank,
                title: "Fight Camp || Bank"
            })
        } catch(err) {
            res.redirect("/bank");
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/bank/add", {
                title: "Fight Camp || tambah bank"
            })
        }
        catch(err) {
            res.redirect("/bank");
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const payload = req.body;

            const bank = await Bank(payload)
            await bank.save();

            res.redirect("/bank");
        } catch(err) {
            res.redirect("/bank");
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const bank = await Bank.findOne({ _id : id });
            res.render("admin/bank/edit", {
                bank,
                title: "Fight Camp || Edit bank"
            })
        } catch (err) {
            res.redirect("/bank");
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            await Bank.findOneAndUpdate({
                _id: id
            }, payload);

            res.redirect("/bank");
        } catch (err) {
            res.redirect("/bank");
            throw err
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Bank.findOneAndRemove({
                _id: id,
            });

            res.redirect("/bank");
        } catch (err) {
            res.redirect("/bank");
            throw err
        }
    }
}