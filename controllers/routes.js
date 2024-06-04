const router = require("express").Router()
const userCtrl = require("./userCtrl")
const studentCtrl = require("./studentCtrl")
const freelancerCtrl = require("./freelancerCtrl")
const commentCtrl = require("./commentCtrl")
const likedStudentCtrl = require("./likedStudentCtrl")
const likedFreelancersCtrl = require("./likedFreelancerCtrl")
const roleProfileCtrl = require("./roleProfileCtrl")

const express = require('express')
const app = express()
const path = require('path')

const upload = require("../middleware/upload")
const { verifyToken } = require("../middleware/verifyToken")

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// user routes
router.post("/auth/loginsignup", userCtrl.signup)
router.post("/auth/signup", userCtrl.signup)
router.post("/auth/login", userCtrl.login)
router.get("/user", userCtrl.getUser)

// Placed under auth endpoints because we want to protect all other routes
router.use(verifyToken)

// student routes
router.get('/students', studentCtrl.getStudents);
router.post('/students', upload, studentCtrl.createStudent);
router.put('/students/:id', studentCtrl.updateStudent);
router.delete('/students/:id', studentCtrl.deleteStudent);

// Freelancer Routes below
router.get('/freelancers', freelancerCtrl.getFreelancers);
router.post('/freelancers', upload, freelancerCtrl.createFreelancer);
router.put('/freelancers/:id', freelancerCtrl.updateFreelancer);
router.delete('/freelancers/:id', freelancerCtrl.deleteFreelancer);
// router.post('/freelancers', verifyToken, upload.single('photo'), freelancerCtrl.createFreelancer);

// Role Profile Routes below
router.get('/role-profile', roleProfileCtrl.getRoleProfile)
router.put('/role-profile/:id', studentCtrl.deleteStudent)
router.put('/role-profile/:id', freelancerCtrl.deleteFreelancer)

// Likes Routes below
router.get('/liked-students', likedStudentCtrl.getLikedStudents)
router.post('/liked-students', likedStudentCtrl.likeStudent)
router.get('/liked-freelancers', likedFreelancersCtrl.getLikedFreelancers)
router.post('/liked-freelancers', likedFreelancersCtrl.likeFreelancer)
router.delete('/liked-students/:studentId', likedStudentCtrl.deleteLikedStudent)
router.delete('/liked-freelancers/:freelancerId', likedFreelancersCtrl.deleteLikedFreelancer)

// Comments for students
router.get('/students/:id/comments', commentCtrl.getComments);
router.post('/students/:id/comments', commentCtrl.createComment);

// Comments for freelancers
router.get('/freelancers/:id/comments', commentCtrl.getComments);
router.post('/freelancers/:id/comments', commentCtrl.createComment);

// Update and delete comments
router.put('/comments/:commentId', commentCtrl.updateComment);
router.delete('/comments/:commentId', commentCtrl.deleteComment);

module.exports = router;