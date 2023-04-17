const Gallery = require("./model")

const path = require("path");
const fs = require("fs")
const config = require("../../config")

module.exports = {
    index: async(req, res) => {
        try {
            const gallery = await Gallery.find()
            res.render("admin/gallery/view_gallery", {
                title: "Fight Camp || Gallery",
                gallery
            })
        } catch (err) {
            throw err
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/gallery/add", {
                title: "Fight Camp || Tambah gallery",
            })
        } catch (err) {
            res.redirect("/gallery")
            throw err
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { title } = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/gallery/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const gallery = new Gallery({
                            title,
                            image: filename
                        })

                        await gallery.save();
            
                        res.redirect("/gallery");
                    } catch (err) {
                        res.redirect("/gallery");
                    }
                })
            } else {
                res.redirect("/gallery");
            }
        } catch (err) {
            res.redirect("/gallery")
            throw err
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const gallery = await Gallery.findOne({ _id: id })

            res.render("admin/gallery/edit", {
                title: "Fight Camp || Edit gallery",
                gallery
            })
        } catch (err) {
            res.redirect("/gallery")
            throw err
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/gallery/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const gallery = await Gallery.findOne({ _id: id });

                        let currentImage = `${config.rootPath}/public/uploads/gallery/${gallery.image}`;
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage)
                        }

                        await Gallery.findOneAndUpdate({
                            _id: id
                        },{
                            title,
                            image: filename
                        })

                        await gallery.save();

                        res.redirect("/gallery");
                    } catch (err) {
                        res.redirect("/gallery");
                    }
                })
            } else {
                await Gallery.findOneAndUpdate({
                    _id: id
                },{
                    title,
                })

                res.redirect("/gallery");
            }
        } catch (err) {
            res.redirect("/gallery");
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            const gallery = await Gallery.findOneAndRemove({
                _id: id
            });

            let currentImage = `${config.rootPath}/public/uploads/gallery/${gallery.image}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
            }
            
            res.redirect("/gallery");
        } catch (err) {
            res.redirect("/gallery");
        }
    }
}