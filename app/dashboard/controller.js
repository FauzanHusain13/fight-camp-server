module.exports = {
    index: async(req, res) => {
        try {
            res.render("admin/dashboard/view_dashboard", {
                title: "Fight Camp || Dashboard",
            })
        } catch (err) {
            throw err
        }
    }
}