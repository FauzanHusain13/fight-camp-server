const Discount = require("./model")
const User = require("../user/model")

const config = require("../../config")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email,
        pass: config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

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

            const users = await User.find();
            const emails = [];

            for (let i = 0; i < users.length; i++) {
                emails.push(users[i].email);
            }

            const mailOptions = {
                from: config.email,
                to: emails,
                subject: "New Promo",
                html: (
                    `<div style="background-color: #F0F0F0; padding: 20px; font-weight: 400; text-align: center; font-family: 'Poppins';">
                        <div style="background-color: white; margin: auto; width: 500px; padding: 25px 50px 50px;">
                            <h1 style="color: #e53e3e;">Chokbulls</h1>
                            <p style="font-size: 18px; font-weight: 400; margin-top: 20px;">Promo Spesial ${payload.discountName}</p>
                            <p style="font-size: 18px; font-weight: 400; margin-top: -5px">Potongan sebesar ${payload.discount}</p>
                        </div>
                    </div>`
                )
            };

            const discount = await Discount(payload)
            await discount.save()

            // send mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                    console.log(error)
                } else {
                    console.log("sukses!")
                    res.redirect("/discount")
                }
            });

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