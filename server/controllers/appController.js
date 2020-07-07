const fs = require("fs");

appData = JSON.parse(fs.readFileSync(`${__dirname}/../temp/appdata_temp.json`));

exports.checkId = (req, res, next, value) => {
  if (req.params.id * 1 > appData.length - 1) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getPopularApps = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: appData.length, data: appData });
};

exports.getParticularApp = (req, res) => {
  const id = req.params.id * 1;
  const app = appData.find((a) => a.id === id);
  res.status(200).json({ status: "success", data: { app } });
};

exports.addApp = (req, res) => {
  const newId = appData[appData.length - 1].id + 1;
  const newApp = Object.assign({ id: newId }, req.body);

  appData.push(newApp);

  fs.writeFile(
    `${__dirname}/temp/appdata_temp.json`,
    JSON.stringify(appData),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "New App Data Added",
      });
    }
  );
};

exports.updateApp = (req, res) => {
  res
    .status(200)
    .json({ status: "success", data: { message: "Updated App here" } });
};

exports.deleteApp = (req, res) => {
  res.status(204).json({ status: "success", data: null });
};
