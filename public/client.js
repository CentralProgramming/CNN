let testingData = {};

$.ajax({
	type: "POST",
	url: '/'
}).done((data) => {
	testingData = data;
	NN(data)
	console.log(data);
})
let data = []

function NN(d){
	let net = new brain.NeuralNetwork();

	data = Object.keys(d).map((key) => {
		// console.log(key);
		return d[key];
	})
	// console.log(data);
	const trainingData = [
		{input: data[1], output: [0]},
		{input: data[2], output: [0]},
		{input: data[3], output: [1]},
		{input: data[4], output: [1]},
		{input: data[5], output: [1]}
	]
	net.train(trainingData)
	console.log(net.run(data[6]));
}


// function setup(){
// 	createCanvas(500, 500);
// }
//
// function draw(){
// 	background(0);
// 	frameRate(1);
// 	if(Object.keys(data).length == 0)return;
// 	// displayArray(data[0])
// }
// function displayArray(a){
// 	let arr = convertToMatrix(a, Math.sqrt(a.length))
// 	for(let i = 0; i < arr.length; i++){
// 		for(let j = 0; j < arr[i].length; j++){
// 			let gv = map(arr[i][j], 0, 0.1, 0, 255);
// 			stroke(gv);
// 			point(i, j)
// 		}
// 	}
// }


function convertToMatrix(list, elementsPerSubArray){
	var matrix = [], i, k;

 for (i = 0, k = -1; i < list.length; i++) {
		 if (i % elementsPerSubArray === 0) {
				 k++;
				 matrix[k] = [];
		 }

		 matrix[k].push(list[i]);
 }

 return matrix;
}
