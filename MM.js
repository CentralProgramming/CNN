class MM{
  static convertToMatrix(list, elementsPerSubArray){
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
  static findAvg(a, b){
    if(a.length != b.length){
      console.log("Matrix lengths do not match.  M1:", a.length, " M2: ", b.length,"MM.js");
      return;
    }
    let avg = 0;
    for(let i = 0; i < a.length; i++){
      for(let j = 0; j < a[i].length; j++){
        avg += a[i][j] * b[i][j];
      }
    }
    avg = avg / (a.length * a[0].length);
    return avg;
  }
  static simplify(a){
    let arr = a;
    for(let i = 0; i < a.length; i++){
      for(let j = 0; j < a[i].length; j++){
        if(arr[i][j] == 255){
          arr[i][j] = -1;
        }else{
          arr[i][j] = 1;
        }
      }
    }
    return arr;
  }
  static getHighest(mat){
    let highest = mat[0][0];
    for(let i = 0; i < mat.length; i++){
      for(let j = 0; j < mat[i].length; j++){
        if(mat[i][j] > highest){
          highest = mat[i][j];
        }
      }
    }
    return highest;
  }
  static convertToVector(mat){
    let newArr = [];
    for(let i = 0; i < mat.length; i++){
        newArr = newArr.concat(mat[i]);
    }
    return newArr
  }
  static convertToString(arr){
    let a = "";
    for(let i = 0; i < arr.length; i++){
        a += arr[i] + " "
    }
    return a
  }
}

module.exports.MM = MM;
