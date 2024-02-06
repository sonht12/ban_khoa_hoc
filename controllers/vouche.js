import Voucher from "../models/vouche";
import UserCheme from "../models/user";

export const voucherController = {
  /* create */
  create: async (req, res) => {
    try {
      const body = req.body;
      const voucher = await Voucher.create(body);
      if (voucher) {
        return res.status(201).json({ data: voucher });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q, isActive, startDate, endDate } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
      };
      let query = {}

      if(q) query =  {...query, code: { $regex: new RegExp(q), $options: "i" } } ;
      if(isActive) {
        console.log("isActive", isActive);
        //1 : Tất cả , 2 Miễn phí , 3 Có phí
        if(isActive == 2) {
          query = {...query, isActive: true }
        } else if(isActive == 3) {
          query = {...query, isActive: false }
        }else {
          delete query.isActive  
        }
      }
      if(startDate && endDate) {
        query = {...query,startDate: {
          $gte: startDate,
          $lte: endDate
        } }
      }

      const vouchers = await Voucher.paginate(query, options);
      return res.status(200).json({ data: vouchers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getActiveVoucher: async (req, res) => {
    try {
      const { _page = 1, _limit = 10, q } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 },
      };
      const query = q
        ? { code: { $regex: new RegExp(q), $options: "i" }, isActive: true }
        : { isActive: true };
      const currentDate = new Date();
      query.startDate = { $lte: currentDate };
      query.endDate = { $gte: currentDate };
      const vouchers = await Voucher.paginate(query, options);
      return res.status(200).json({ data: vouchers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);
      if (voucher) {
        return res.status(200).json({ data: voucher });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const voucher = await Voucher.findByIdAndUpdate(id, body, { new: true });
      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      return res.status(200).json({ data: voucher });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findByIdAndDelete(id);
      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      return res.status(200).json({ data: voucher });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  sendVoucheByUser: async (req, res) => {
    console.log("1");
    try {
      const { id, idVouche } = req.params;
      console.log(id, idVouche);
      const voucher = await UserCheme.findByIdAndUpdate(
        id,
        {
          $addToSet: { voucher: idVouche },
        },
        {
          new: true,
        }
      );
      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }
      return res.status(200).json({ message: "sended Voucher " });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  removeVoucheUser: async (req, res) => {
    const { id, idVouche } = req.params;
    try {
      const c = await UserCheme.findByIdAndUpdate(id,{
        $pull : {
          voucher : idVouche
        }
      })
      return res.json("success")
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
