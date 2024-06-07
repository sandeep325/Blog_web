require("dotenv").config();
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Blog = require("../Model/Blog.Model");

exports.BlogList = async (req, res, next) => {
    try {
        let BlogRes = await Blog.find().sort({ _id: -1 }).select(" _id name email description");
        if (BlogRes?.length > 0) {
            return res.status(200).json({
                status: 200,
                count: BlogRes?.length,
                data:BlogRes,
                message: 'Blog list.'
            });

        } else {
            return res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'Blog list.'
            });
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, Error: error, message: 'Internal server Error !.' });

    }
}

exports.AddBlog = async (req, res, next) => {
    try {
        let validationError = validationResult(req);
        if (validationError?.errors?.length > 0) {
            return res.status(409).json({
                status: 409,
                data: validationError?.errors?.map((data) => {
                    return {
                        'input': data?.param,
                        'ErrorMsg': data?.msg
                    }
                }),
                message: 'Data Validation Error.'
            });
        } else {
            const { name, email, description} = req.body;
            let obj = {
                _id: new mongoose.Types.ObjectId(),
                name, email, description
            };
            const blog_res = await Blog.create(obj);
            if (blog_res) {
                return res.status(201).json({
                    status: 201,
                    id: blog_res._id,
                    message: 'Blog created.'
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Blog not created.'
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, Error: err, message: 'Internal server Error !.' });
    }

}



exports.BlogDelete = async (req, res, next) => {
    try {
        if(!req?.params?.id) {   return  res.status(404).json({status:404,message:"Please provide Id."}); } 
        let id = req?.params?.id;
       const check = await Blog.findOne({ _id: id });

       if (!check) {
        return  res.status(404).json({status:404,message:"blog not found"});
      }

      const deletedBlog = await Blog.deleteOne({ _id: id });
        if (!deletedBlog) {
            return res.status(404).json({
                status: 404,
                id: req?.params?.id,
                message: 'blog not deleted',
            });
        } 

        return res.status(200).json({
            status: 200,
            id: req?.params?.id,
            message: 'blog deleted',
        });
    } 
    catch (err) {
        return res.status(500).json({ status: 500, Error: err, message: 'Internal server Error !.' });
    }
}
exports.BlogUpdate = async (req, res, next) => {
    try {
        if(!req?.params?.id) {   return  res.status(404).json({status:404,message:"Please provide Id."}); } 
        let blogData = req?.body;
        const BlogUpdate = await Blog.findByIdAndUpdate(
            { _id: req?.params?.id },
            blogData,
            { new: true },
        ).select();

        if (BlogUpdate) {
            return res.status(200).json({
                status: 200,
                id: req?.params?.id,
                message: 'blog updated',
            });
        } else {

            return res.status(400).json({
                status: 400,
                id: req?.params?.id,
                message: 'blog not updated.',
            });

        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            msg: err
        });
    }
}