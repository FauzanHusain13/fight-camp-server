const Membership = require("../membership/model")
const Bank = require("../bank/model")
const Training = require("../training/model")
const Confirmation = require("../confirmation/model")

module.exports = {
    index: async(req, res) => {
        try {
            const membership = await Membership.countDocuments();
            const bank = await Bank.countDocuments();
            const training = await Training.countDocuments();
            const confirmation = await Confirmation.countDocuments();

            res.render("admin/dashboard/view_dashboard", {
                title: "Fight Camp || Dashboard",
                count: {
                    membership,
                    bank,
                    training,
                    confirmation
                }
            })
        } catch (err) {
            throw err
        }
    }
}