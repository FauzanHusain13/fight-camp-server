const Confirmation = require("./model")

module.exports = {
    index: async(req, res) => {
        try { 
            const confirmation = await Confirmation.find().populate("user")

            res.render("admin/confirmation/view_confirmation", {
                confirmation,
                title: "Fight Camp || Confirmation"
            })
        } catch (err) {
            res.redirect("/confirmation")
            throw err
        }
    },
    actionStatus: async (req, res) => {
        try{
            const { id } = req.params;
            const { status } = req.query;

            await Confirmation.findByIdAndUpdate({ _id: id }, { status })
        } catch(err) {
            res.redirect("/confirmation");
        }
    }
}