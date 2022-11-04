import Path from "../models/path"

export const createPath = async (req, res, next) => {
  const path = new Path(req.body.path);
  await path.save();
  console.log(path);
}

export const showPath = async (req, res, next) => {
  const path = await Path.findById(req.params.id)
  return path;
}

export const updatePath = async (req, res) => {

}

export const deletePath = async (req, res) => {
  const id = req.params;
  await Path.findByIdAndDelete(id);
}