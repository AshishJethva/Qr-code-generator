import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

function isValidURL(url) {
  const urlPattern = new RegExp(
    "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // Domain name
      "localhost|" + // OR localhost
      "\\d{1,3}(\\.\\d{1,3}){3})" + // OR IP address (IPv4)
      "(:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" + // Port and path
      "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // Query string
      "(\\#[-a-zA-Z0-9_]*)?$", // Fragment locator
    "i"
  );

  return urlPattern.test(url);
}

inquirer
  .prompt([{ message: "Type in Your URL: ", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    const validURL = isValidURL(url);
    if (validURL) {
      var qr_svg = qr.image(url);
      qr_svg.pipe(fs.createWriteStream("qr_img.png"));

      fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    } else {
      alert("Please enter a valid URL!");
    }
  })
  .catch((error) => {
    alert("Something went wrong");
  });
