import Path from "../models/paths.js"

export const createPath = async (req, res, next) => {
  // const path = new Path(req.body.path);
  // await path.save();
  // console.log(path);
  res.status(200).json({
		message: "Being developed! Please stay tuned",
		status: 200,
	});
}

export const showPath = async (req, res, next) => {
  const path = await Path.findById(req.params.id)
  return path;
}

export const showAllPaths = async (req, res, next) => {

  const fakeData = []

  for (const i = 0; i < 10; i++) {
    fakeData.push(
      {
        _id: i,
        pinpoints: [
          [i, i * 100]
          [i + 10, i * 100]
        ],
        user: i,
        speed: "Slow",
        date: ["mon", "tue", "wed", "thu"]
      }
    )
  }

  res.status(200).json({
    data: fakeData,
		message: "Being developed! Please stay tuned",
		status: 200,
	});

}

export const updatePath = async (req, res) => {

}

export const deletePath = async (req, res) => {
  const id = req.params;
  await Path.findByIdAndDelete(id);
}