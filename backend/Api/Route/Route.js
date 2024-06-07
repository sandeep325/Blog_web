const expres = require('express');
const routes = expres.Router();
const {BlogValidator} = require("../../Services/Validation/Common.Validation");

const {BlogList,AddBlog,BlogDelete,BlogUpdate} =require("../Controller/Blog.Controller");

routes.get('/blogs',  BlogList);
routes.post('/blogs',  BlogValidator,AddBlog);
routes.delete('/blogs/:id',  BlogDelete);
routes.patch('/blogs/:id', BlogUpdate);
module.exports=routes; 


