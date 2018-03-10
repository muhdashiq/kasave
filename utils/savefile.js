const path = require('path');
const fs = require('fs');

function saveFileToLocation(tempPath, targetPath,type='.png') {
  if (path.extname(req.files.file.name).toLowerCase() === type) {
    fs.rename(tempPath, targetPath, function(err) {
      if (err) throw err;
      console.log("Upload completed!");
    });
  }
  else {
    fs.unlink(tempPath, function () {
      if (err) throw err;
      console.error("Only .png files are allowed!");
    });
  }
}


module.exports = {
  saveFileToLocation
}
