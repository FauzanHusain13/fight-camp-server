const Admin = require("./model")
const bcrypt = require("bcryptjs")

module.exports = {
    viewSignin: async(req, res) => {
        try{
            if(req.session.admin === null || req.session.admin === undefined) {
                res.render("admin/admin/view_signin", {
                    title: "Halaman Sign in"
                })
            } else {
                res.redirect("/dashboard")
            }
        } catch(err) {
            res.redirect("/");
        }
    },
    actionSignin: async(req, res) => {
        try {
            const { email, password } = req.body;
            const check = await Admin.findOne({ email });

            if (check) {
                if (check.status === "Y") {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if(checkPassword) {
                        req.session.admin = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name
                        }
                        res.redirect("/dashboard");
                    } else {
                        res.redirect("/");
                    }
                } else {
                    res.redirect("/");
                }
            } else {
                res.redirect("/");
            }
        } catch (err) {
            res.redirect("/");
        }
    }
}