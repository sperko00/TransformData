var json = require("./data.json");
var data = json;
const fs = require("fs");

const questions = data.array.filter(item => {
  if (item.question && item.answer1 && item.answer2 && item.answer3) {
    return item;
  }
});
const questionsTransformed = questions.map(item => {
  return {
    question: item.question,
    answers: [
      { text: item.answer1, isCorrect: item.answer1right ? true : false },
      { text: item.answer2, isCorrect: item.answer2right ? true : false },
      { text: item.answer3, isCorrect: item.answer3right ? true : false }
    ]
  };
});
const questionsJSON = JSON.stringify(questionsTransformed);
fs.writeFileSync("questions.json", questionsJSON);
const result = data.array.filter(item => {
  if (item.description) {
    if (item.description.indexOf("bildpaare")) {
      return item;
    }
  }
});
let memoryImages = [];
result.forEach(element => {
  element.images.forEach(image => {
    let path = image.path.slice(8, image.path.length);

    let publicPath = "http://portal.schooltastic.net/api" + path;
    memoryImages.push(publicPath);
  });
});
const memoryImagesJSON = JSON.stringify(memoryImages);
fs.writeFileSync("memory.json", memoryImagesJSON);
