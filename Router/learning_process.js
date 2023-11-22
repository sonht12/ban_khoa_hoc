import express from "express";


import { create,getAll,Delete,GetOne,update,getCoursesForUser,checkCourseAndReturnMessage, GetOneprocess } from "../controllers/learning_process";
const Router = express.Router();
Router.post('/courseprogress',create);
Router.get('/courseprogress/:id',GetOneprocess);
Router.get('/courseprogress',getAll);
Router.delete('/courseprogress/:id',Delete);
Router.get('/courseprogress/:productId/:userId',GetOne);
Router.put('/courseprogress/:id',update);
Router.get('/courseprogress/:userId', getCoursesForUser);
Router.get('/coursestatus/:productId/:userId',checkCourseAndReturnMessage)
export default Router;