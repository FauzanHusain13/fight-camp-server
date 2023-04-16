const Training = require("./model")

const path = require("path");
const fs = require("fs")
const config = require("../../config")

module.exports = {
    index: async(req, res) => {
        try {
            const training = await Training.find()
                .populate("memberships")

            res.render("admin/training/view_training", {
                training,
                title: "Fight Camp || Training"
            })
        } catch(err) {
            res.redirect("/training");
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/training/add", {
                title: "Fight Camp || Tambah jenis training",
            })
        } catch (err) {
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name, desc } = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/training/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const training = new Training({
                            name,
                            desc,
                            thumbnail: filename
                        })

                        await training.save();
            
                        res.redirect("/training");
                    } catch (err) {
                        res.redirect("/training");
                    }
                })
            } else {
                res.redirect("/training");
            }
        } catch (err) {
            res.redirect("/training")
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params

            const training = await Training.findOne({ _id: id })
                .populate("memberships")

            res.render("admin/training/edit", {
                title: "Fight Camp || Edit training",
                training
            })
        } catch (err) {
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name, desc } = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/training/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const training = await Training.findOne({ _id: id });

                        let currentImage = `${config.rootPath}/public/uploads/training/${training.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }

                        await Training.findOneAndUpdate({
                            _id: id
                        },{
                            name, 
                            desc,
                            thumbnail: filename
                        })

                        await training.save();

                        res.redirect("/training");
                    } catch (err) {
                        res.redirect("/training");
                    }
                })
            } else {
                await Training.findOneAndUpdate({
                    _id: id
                },{
                    name,
                    desc
                })

                res.redirect("/training");
            }
        } catch (err) {
            res.redirect("/training");
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            const training = await Training.findOneAndRemove({
                _id: id
            });

            let currentImage = `${config.rootPath}/public/uploads/training/${training.thumbnail}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
            }
            
            res.redirect("/training");
        } catch (err) {
            res.redirect("/training");
        }
    }
}