const Training = require("../training/model")
const Membership = require("../membership/model")
const Bank = require("../bank/model")
const Discount = require("../discount/model")
const Confirmation = require("../confirmation/model")

module.exports = {
    training: async(req, res) => {
        try {
            const training = await Training.find()
                .select("_id name thumbnail memeberships")
                .populate("memberships")

            res.status(200).json({ data: training })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" }) 
        }
    },
    detailTraining: async(req, res) => {
        try {
            const { id } = req.params;
            const training = await Training.findOne({ _id: id })
                .populate("memberships")
            
            const bank = await Bank.find()
            const discount = await Discount.find()

            if(!training) {
                return res.status(404).json({ message: "Jenis training tidak ditemukan!" });
            }

            res.status(200).json({
                data: {
                    detail: training,
                    bank,
                    discount
                }
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    checkout: async(req, res) => {
        try {
            const { training, membership, bank, discount } = req.body;

            const res_training = await Training.findOne({ _id: training })
                .select("_id name thumbnail memberships")
                .populate("memberships")
            if(!res_training) return res.status(404).json({ message: "training tidak ditemukan" })

            const res_membership = await Membership.findOne({ _id: membership })
            if(!res_membership) return res.status(404).json({ message: "membership tidak ditemukan" })

            const res_bank = await Bank.findOne({ _id: bank });
            if(!res_bank) return res.status(404).json({ message: "bank tidak ditemukan" })

            let historyDiscount = {};
            let discountAmount = 0;
          
            if (discount) {
              const res_discount = await Discount.findOne({ _id: discount });
          
              if (res_discount) {
                historyDiscount = {
                  discountName: res_discount._doc.discountName,
                  discount: res_discount._doc.discount,
                  codeDiscount: res_discount._doc.codeDiscount,
                };
          
                discountAmount = res_discount._doc.discount;
              }
            }
          
            const payload = {
              historyTraining: {
                trainingName: res_training._doc.name,
                thumbnail: res_training._doc.thumbnail,
                package: res_membership._doc.package,
                price: res_membership._doc.price,
                session: res_membership._doc.session,
              },
              historyBank: {
                name: res_bank._doc.name,
                bankName: res_bank._doc.bankName,
                noRekening: res_bank._doc.noRekening,
              },
              historyDiscount,
              user: req.user._id,
              total: res_membership._doc.price - discountAmount,
            };
          
            const confirmation = new Confirmation(payload);
            await confirmation.save();
          
            res.status(201).json({
              data: confirmation,
            });
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    confirmation: async(req, res) => {
        try {
            const { status = "" } = req.query;

            let criteria = {} 

            if(status.length) {
                criteria = {
                    ...criteria,
                    status : { $regex : `${status}`, $options : 'i' }
                }
            }
            criteria = {
                ...criteria,
            }

            const registrated = await Confirmation.find(criteria)

            res.status(200).json({ 
                data: registrated,
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
}