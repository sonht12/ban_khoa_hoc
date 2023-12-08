import Comment2 from "../models/comment2.js";
import product from "../models/product.js";

export const comment2 = {
  createComment2: async (req, res) => {
    const { name, parentId, idUser, idCourse, imgUser } = req.body; // Bao gồm imgUser trong body của yêu cầu
    try {
      const newComment = new Comment2({
        name: name,
        parent: parentId,
        user: idUser,
        product: idCourse,
        imgUser: imgUser, // Thiết lập trường imgUser
      });
      const savedComment = await newComment.save();

      if (parentId) {
        await Comment2.findByIdAndUpdate(parentId, {
          $push: { children: savedComment._id },
        });
      } else {
        await product.findByIdAndUpdate(
          // Sửa từ 'product' thành 'Product'
          idCourse,
          { $addToSet: { comment2: savedComment._id } },
          {
            new: true,
          }
        );
      }
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getCOmmentTree: async (req, res) => {
    const { commentId } = req.params;
    try {
      const rootComment = await Comment2.findById(commentId)
        .populate("children")
        .populate("user");
      const getChildren = async (comment) => {
        if (comment.children && comment.children.length > 0) {
          for (let i = 0; i < comment.children.length; i++) {
            const child = await Comment2.findById(comment.children[i]._id)
              .populate("children")
              .populate("user");
            comment.children[i] = child;
            await getChildren(child);
          }
        }
      };
      await getChildren(rootComment);
      res.json(rootComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  removeComment: async (req, res) => {
    try {
      const Comment = await Comment2.findByIdAndDelete(req.params.id);
      res.json({
        message: "Comment deleted successfully",
        Comment: Comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  editComment: async (req, res) => {
    console.log(req.params.id);
    try {
      const comment = await Comment2.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name,
          status: req.body.status,
        },
        {
          new: true,
        }
      );
      // await product.findByIdAndUpdate(req.body.idCourse, {});
      if (!comment) {
        return res.status(200).json({
          message: "Cập nhật Comment  không thành công",
        });
      }
      return res.json({
        message: "succes update",
        comment,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
