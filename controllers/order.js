import Order from "../models/oder";
import Product from "../models/product";
import User from "../models/user";
import { orderSchema } from "../middlewares/Order";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    // Kiểm tra và validate đầu vào sử dụng middleware
    const validationResult = orderSchema.validate(req.body);
    console.log(validationResult)
    if (validationResult.error) {
      return res.status(400).json({
        status: "ERR",
        message: validationResult.error.details[0].message,
      });
    }
    const { course, payment, vouche } = validationResult.value;
    console.log(validationResult.value,"value day");
    const courseId = course;
    const product = await Product.findById(courseId);
    if (!product) {
      return res.status(404).json({
        status: "ERR",
        message: "Không tìm thấy thông tin khóa học.",
      });
    }
    const user = req.body.user;
    console.log(req.body);
    const discount = vouche ? product.price - vouche : product.price;
    const newOrder = new Order({
      orderDate: new Date(),
      orderStatus: req.body.orderStatus,
      course: product._id,
      paymentCode:req.body.paymentCode,
      user: user,
      payment: {
        paymentMethod: "Ví điện tử",
        paymentDate: new Date(),
        transactionID: uuidv4(),
        paymentAmount: discount,
        paymentContent: payment.paymentContent,
        bankName: payment.bankName,
      },
    });
    // Lưu đơn hàng vào cơ sở dữ liệu
    await newOrder.save();
    await User.findByIdAndUpdate(
      user,
      { $addToSet: { product: product._id } },
      {
        new: true,
      }
    );
    return res.status(201).json({
      status: "OK",
      message: "Đơn hàng đã được tạo thành công.",
      data: {
        _id: newOrder._id,
        ...newOrder.toObject(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Lỗi khi tạo đơn hàng.",
      error: error.message,
    });
  }
};

// Hàm để lấy danh sách tất cả đơn hàng
// Hàm để lấy danh sách tất cả đơn hàng
// Hàm để lấy danh sách tất cả đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate({
      path: "course",
      select: "name price",
    })
    .populate({
      path: "user",
      select: "name email phoneNumber",
    })
    .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "OK",
      message: "Success",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Error while fetching orders",
      error: error.message,
    });
  }
};
export const getAllOrdersMonay = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    let query = {};
    if(startDate && endDate) {
      query = {...query, orderDate: {
        $gte: startDate,
        $lte: endDate
      } }
    }

    // if ((startDate && !endDate) || (startDate && endDate)) {
    //   const targetDate = new Date(startDate);
    //   targetDate.setHours(0, 0, 0, 0);
    //   const targetEndDate = new Date(targetDate);
    //   targetEndDate.setHours(23, 59, 59, 999);
    //   if (startDate > endDate) {
    //     return res
    //       .status(500)
    //       .json({ error: "startDate must be less than endDate" });
    //   }
    //   const searchQuery = {
    //     orderDate: {
    //       $gte: targetDate,
    //       $lt: endDate ? endDate : targetEndDate,
    //     },
    //   };
    //   query = { $and: [searchQuery] };
    // }
    const orders = await Order.paginate(query)
    const populatedOrders = await Order.populate(orders.docs, [{ path: 'course' }, { path: 'user', model: 'User' }]);
    console.log(populatedOrders);
    return res.status(200).json({
      status: "OK",
      message: "Success",
      data: { ...orders, docs: populatedOrders }, // Thay đổi docs thành populatedOrders
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Error while fetching orders",
      error: error.message,
    });
  }
};


// Hàm để lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate([
      {path : 'course'},
      {path : 'user'}
    ]);
    if (!order) {
      return res.status(404).json({
        status: "ERR",
        message: "Order not found",
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "Success",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Error while fetching order",
      error: error.message,
    });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    // Lấy tất cả đơn hàng của người dùng với populate cho trường courses
    const orders = await Order.find({ user: userId }).populate("course");

    return res.status(200).json({
      status: "OK",
      message: "Danh sách đơn hàng của người dùng",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Lỗi khi lấy danh sách đơn hàng.",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    // Kiểm tra xem orderStatus đã được cung cấp hay không
    if (!orderStatus) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp trạng thái đơn hàng mới.",
      });
    }
    // Tìm đơn hàng trong cơ sở dữ liệu
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: "ERR",
        message: "Không tìm thấy đơn hàng.",
      });
    }

    // Admin chỉ có quyền cập nhật trạng thái đơn hàng
    order.orderStatus = orderStatus;

    // Lưu cập nhật vào cơ sở dữ liệu
    await order.save();

    return res.status(200).json({
      status: "OK",
      message: "Cập nhật trạng thái đơn hàng thành công.",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Lỗi khi cập nhật trạng thái đơn hàng.",
      error: error.message,
    });
  }
};

export const DeleteOrder = async (req, res) => {
  const orderId = req.params.id;

  // Sử dụng Mongoose để xóa đơn hàng dựa trên _id
  Order.findByIdAndRemove(orderId)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Đã xóa đơn hàng thành công.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// thong ke doanh thu theo thang

export const getCourseSales = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const salesData = await getRevenueByMonth(currentYear);
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRevenueByMonth = async (year) => {
  let years = [year - 1, year];
  let revenueData = {};
  for (let yr of years) {
    let data = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(`${yr}-01-01`),
            $lt: new Date(`${yr + 1}-01-01`),
          },
        },
      },
      {
        $addFields: {
          "payment.paymentAmount": {
            $toDecimal: "$payment.paymentAmount",
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$orderDate" } },
          total: { $sum: "$payment.paymentAmount" },
        },
      },
    ]);
    console.log(data);
    // Chuyển đổi dữ liệu
    let monthlyData = convertDataToMonthlyFormat(data);
    revenueData[yr] = monthlyData;
  }
  return revenueData;
};

const convertDataToMonthlyFormat = (data) => {
  let monthlyData = initializeEmptyMonths();
  data.forEach((item) => {
    const monthName = getMonthName(item._id.month);
    monthlyData[monthName] = item.total;
  });
  return monthlyData;
};

const initializeEmptyMonths = () => {
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let monthlyData = {};
  monthNames.forEach((month) => (monthlyData[month] = 0));
  return monthlyData;
};

const getMonthName = (monthNumber) => {
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  return monthNames[monthNumber - 1];
};
