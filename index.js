const fs = require("fs");
const { ImageProcess } = require("./ImageProcess.js");
const { MM } = require("./MM.js");
const { send } = require("./SendToClient.js");
const util = require("util");

const trainingFiles = ["square1.txt", "square2.txt", "square3.txt", "square4.txt", "rectangle2.txt", "circle1.txt", "circle2.txt"]

const inputFiles = ["circle1.txt", "circle2.txt", "square1.txt"];

const edges = [
  [-1, -1, -1, 1, 1, 1, 1, 1, 1],//top
  [1, 1, -1, 1, 1, -1, 1, 1, -1],//right
  [1, 1, 1, 1, 1, 1, -1, -1, -1],//bottom
  [-1, 1, 1, -1, 1, 1, -1, 1, 1]//left
]


function convolute(PATH, files, callback) {

  let inputData = {};
  let TotalData = {};

  for(let p = 0; p < files.length; p++){
    let fileData = [];
    let pixels = [];
    let dimensions = [];
    let image, iterationArr;
    let FinalVector = [];
    fs.readFile(PATH + files[p], "utf8", (err, data) => {
      if(err) console.log(err);

      fileData = data.split("\n");
      dimensions = fileData[0].split(" ").map(l => parseInt(l));
      pixels = fileData[1].split(" ").map(p => parseInt(p));
      pixels.splice(pixels[pixels.length-1], 1);
      pixels = MM.convertToMatrix(pixels, dimensions[0]);

      image = new ImageProcess(pixels);
      for(let i = 0; i < edges.length; i++){
        iterationArr = image.pixels;
        let iteration = 0
        while(iterationArr.length > 10){
          iteration++;
          iterationArr = image.start(iterationArr, edges[i]);
        }
        let iterationVector = MM.convertToVector(iterationArr)
        for(let i = 0; i < iterationVector.length; i++){
          FinalVector.push(iterationVector[i]);
        }
        // let key = files[p].substring(0, files[p].length -4) + "_edges["+i+"]";
        // TotalData[key] = iterationArr;
      }
      let fileName = files[p].substring(0, files[p].length -4);
      inputData[fileName] = FinalVector;
      if(Object.keys(inputData).length == files.length){
        callback(inputData)
      }

      // if(Object.keys(TotalData).length == files.length*4){
      //   callback(TotalData)
      // }

    });
  }

}

function displayImg(fileName, iteration, edge){
  let iterationArr = [];
  fs.readFile("./imgs/" + fileName, "utf8", (err, data) => {
    if(err) console.log(err);

    fileData = data.split("\n");
    dimensions = fileData[0].split(" ").map(l => parseInt(l));
    pixels = fileData[1].split(" ").map(p => parseInt(p));
    pixels.splice(pixels[pixels.length-1], 1);
    pixels = MM.convertToMatrix(pixels, dimensions[0]);

    let image = new ImageProcess(pixels);
    iterationArr = image.pixels;
    for(let i = 0; i < iteration; i++){
      iterationArr = image.start(iterationArr, edge);
    }
    // console.log(iterationArr);
    send(iterationArr);
  });
}
function collectData(callback){
  let s = {}
  convolute("./imgs/training/", trainingFiles, (trainingFile) => {
    s.trainingFiles = trainingFile;
    convolute("./imgs/input/", inputFiles, (inputFile) => {
      s.inputFiles = inputFile;
      callback(s);
    })
  })
}
// collectData((d) => {
//   send(d)
// })
convolute("./imgs/training/", trainingFiles, (a) => {
  send(a)
  console.log(Object.keys(a));
})
