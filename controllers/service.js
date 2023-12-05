import Order from "../models/oder";

export const removeOnDayService = async (req, res) => {
  try {
    const data = Order.find({});
    console.log(data);
  } catch (error) {
    return res.status(404).send({
      message: "Error removing",
    });
  }
};
