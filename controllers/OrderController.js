import Order from "../models/OderModel";
import Product from "../models/product";
import User from "../models/user";
import { v4 as uuidv4 } from 'uuid';

export const createOrder = async (req, res) => {
    try {
        const { course, payment} = req.body;
        // Kiểm tra xem các trường cần thiết đã được cung cấp hay chưa
        if (!course || !payment || !payment.paymentMethod ) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thông tin không đầy đủ để tạo đơn hàng.',
            });
        }

        // Lấy ID của khóa học từ yêu cầu của người dùng
        const courseId = req.body.course;

        // Tìm thông tin khóa học từ Model Product
        const product = await Product.findById(courseId);

        // Kiểm tra nếu không tìm thấy thông tin khóa học
        if (!product) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Không tìm thấy thông tin khóa học.',
            });
        }

        // Lấy thông tin người dùng từ token đã đăng nhập
        const user = req.user;

        // Tạo đối tượng Order mới với các trường thông tin từ Client
        const newOrder = new Order({
            orderDate: new Date(),
            orderStatus: 'Chờ xử lý',
            course: product._id,
            courseInfo: {
                name: product.name,
                price: product.price,
            },
            user: user._id,
            userInfo: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            payment: {
                paymentMethod: payment.paymentMethod,
                paymentDate: new Date(),
                transactionID: uuidv4(),
                paymentAmount: product.price,
                paymentContent: payment.paymentContent,
                bankName: payment.bankName,
            },
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await newOrder.save();

        return res.status(201).json({
            status: 'OK',
            message: 'Đơn hàng đã được tạo thành công.',
            data: {
                _id: newOrder._id,
                ...newOrder.toObject(),
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi khi tạo đơn hàng.',
            error: error.message,
        });
    }
};


// Hàm để lấy danh sách tất cả đơn hàng
// Hàm để lấy danh sách tất cả đơn hàng
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
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

// Hàm để lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
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
          status: 'ERR',
          message: 'The userId is required',
        });
      }
  
      // Lấy tất cả đơn hàng của người dùng với populate cho trường courses
      const orders = await Order.find({ user: userId }).populate('course');
  
      return res.status(200).json({
        status: 'OK',
        message: 'Danh sách đơn hàng của người dùng',
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Lỗi khi lấy danh sách đơn hàng.',
        error: error.message,
      });
    }
  };

  export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { orderStatus } = req.body;

        // Kiểm tra xem orderStatus đã được cung cấp hay không
        if (!orderStatus) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vui lòng cung cấp trạng thái đơn hàng mới.',
            });
        }

        // Tìm đơn hàng trong cơ sở dữ liệu
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Không tìm thấy đơn hàng.',
            });
        }

        // Admin chỉ có quyền cập nhật trạng thái đơn hàng
        order.orderStatus = orderStatus;

        // Lưu cập nhật vào cơ sở dữ liệu
        await order.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật trạng thái đơn hàng thành công.',
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi khi cập nhật trạng thái đơn hàng.',
            error: error.message,
        });
    }
};








