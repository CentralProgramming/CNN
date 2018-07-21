const { MM } = require("./MM.js");
/*edges go row then col Ex: [[1, 2, 3],
                             [4, 5, 6],
                             [7, 8, 9]]
*/
class ImageProcess{
  constructor(p){
    this.pixels = MM.simplify(p);
  }
  start(arr, edge){
    let filtered = this.filtering(arr, edge);
    let pooled = this.pooling(filtered);
    let normalized = this.normalizing(pooled);
    return normalized;
  }
  filtering(p, edge){
    let F = [];
    let mEdge = MM.convertToMatrix(edge, 3);
    let size = 0;
    for(let i = 0; i < p.length-2; i++){
      size++;
      for(let j = 0; j < p[i].length-2; j++){
        F.push(MM.findAvg(this.getSection(i, j, 3, p), mEdge))
      }
    }
    return MM.convertToMatrix(F, size);
  }
  getSection(x, y, s, arr){
    let F = [];
    for(let i = x; i < x+s; i++){
      for(let j = y; j < y+s; j++){
        try{
          F.push(arr[i][j]);
        }catch(e){}
      }
    }
    return MM.convertToMatrix(F, s);
  }
  pooling(arr){
    let size = 0;
    let F = [];
    // if(arr.length % 2 == 0){
    //
    // }
    for(let i = 0; i < arr.length; i+=2){
      size++;
      for(let j = 0; j < arr[i].length; j+=2){
        let h = MM.getHighest(this.getSection(i, j, 2, arr))
        F.push(h)
      }
    }
    return MM.convertToMatrix(F, size);
  }
  normalizing(arr){
    let F = arr;
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        if(arr[i][j] < 0){
          F[i][j] = 0;
        }
      }
    }
    return F;
  }
}

module.exports.ImageProcess = ImageProcess;
