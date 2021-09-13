import Bike from "../models/bikes.js";

export const getBikes = async (req, res) => {
  try {
    const bike = await Bike.find();
    res.status(200).json(bike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  if (req.file) {
    const { filename, path } = req.file;
    res.status(200).json({ filename, path });
  }
  res.status(400);
};

export const createBike = async (req, res) => {
  try {
    const bike = new Bike({
      ...req.body,
    });
    await bike.save();
    res.status(200).json(bike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(bike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
