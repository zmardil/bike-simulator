import express from "express";
import {
  getBikes,
  createBike,
  deleteBike,
  updateBike,
  uploadImage,
} from "../controllers/bikes.js";
import multer from "multer";
import passport from "passport";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", getBikes);
router.post("/upload", isAuth, upload.single("image"), uploadImage);
router.post("/", isAuth, createBike);
router.delete("/:id", isAuth, deleteBike);
router.put("/:id", passport.authenticate("local"), updateBike);

export default router;
