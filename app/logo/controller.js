const Logo = require("./model")

const path = require("path");
const fs = require("fs")
const config = require("../../config")

module.exports = {
    index: async(req, res) => {
        try {
            const logo = await Logo.find();
            res.render("admin/logo/view_logo", {
                title: "Fight Camp || Logo",
                logo
            })
        } catch (err) {
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const logo = await Logo.findOne({ _id: id })

            res.render("admin/logo/edit", {
                title: "Fight Camp || Edit logo",
                logo
            })
        } catch (err) {
            res.redirect("/logo")
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/logo/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const logo = await Logo.findOne({ _id: id });

                        let currentImage = `${config.rootPath}/public/uploads/logo/${logo.logo}`;
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage)
                        }

                        await Logo.findOneAndUpdate({
                            _id: id
                        },{
                            name,
                            logo: filename
                        })

                        await logo.save();

                        res.redirect("/logo");
                    } catch (err) {
                        res.redirect("/logo");
                    }
                })
            } else {
                await Logo.findOneAndUpdate({
                    _id: id
                },{
                    name,
                })

                res.redirect("/logo");
            }
        } catch (err) {
            res.redirect("/logo");
        }
    }
}