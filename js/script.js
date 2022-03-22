
var ctx = document.getElementById('canvas').getContext('2d');

//ширина и высота канваса
var w = document.getElementById('canvas').width;
var h = document.getElementById('canvas').height;

var button = document.querySelector("button");

//Основна функция
button.addEventListener("click", function() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var n = document.getElementById("nodes").value;
  var alfa = document.getElementById("alfa").value;
  var betta = document.getElementById("betta").value;
  var gamma = document.getElementById("gamma").value;
  var delta = document.getElementById("delta").value;
  var del = document.getElementById("del").value;
  var A = document.getElementById("A").value;
  var B = document.getElementById("B").value;
  var C = document.getElementById("C").value;
  var D = document.getElementById("D").value;

  //масштаб по осям
  var perX = w/(Number(B)-Number(A)); 
  var perY = h/(Number(D)-Number(C));

  var f = document.getElementById("f");
  var p = document.getElementById("p"); 
  var r = document.getElementById("r"); 
  var df = document.getElementById("df"); 
  var dp = document.getElementById("dp");  

  hh = (Number(B)-Number(A))/Number(n);

  matr = matrix(Number(n) + 1, Number(n) + 1);
  table(Number(hh), Number(n), A, B, C, D, perX, perY, alfa, betta, gamma, delta);

  if(f.checked){
    printf(A, B, C, D, perX, perY, alfa, betta, gamma, delta);
  }

  if(p.checked){
    printp(A, B, C, D, perX, perY, alfa, betta,gamma, delta, n);
  }

  if(r.checked){
    printr(A, B, C, D, perX, perY, alfa, betta, gamma, delta, hh, n);
  }

  if(df.checked){
    printdf(A, B, C, D, perX, perY, alfa, betta, gamma, delta,  hh, n, del);
  }

  if(dp.checked){
    printdp(A, B, C, D, perX, perY, alfa, betta, gamma, delta,  hh, n, del);
  }
});

function printf(A, B, C, D, perX, perY, alfa, betta, gamma, delta){

  ctx.fillStyle = "#006400"; 

  for(var x = Number(A); x <= Number(B); x = x+0.01/perX){
    var y =Number(alfa)*Math.sin(Math.tan(Number(betta)*x))+Number(gamma)*Math.cos(Number(delta)*x); 
    ctx.fillRect(Math.round(-Number(A)*perX+ x * perX), Math.round(Number(D)*perY - y * perY), 1 , 1);
  }
}

function printp(A, B, C, D, perX, perY, alfa, betta, gamma, delta, n) {
    ctx.beginPath();
    ctx.strokeStyle = "red";

    hh = (Number(B)-Number(A))/Number(n);

    ctx.moveTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh, 0, n) * perY));
    for (var x = Number(A); x <= Number(B); x += 0.01 / perX) {
        ctx.lineTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh, 0, n) * perY), 1, 1);
    }

    ctx.stroke();
}

//полином
function pol(t, k, n) {
    if (k < n)
        return (pol(t, k + 1, n) + (fac(t, k) * matr[0][k]));
    return fac(t, k) * matr[0][k];
}

//коэффициент при дельта^k(y0)
function fac(t, k) {
    if (k == 0)
        return 1;
    return t / k * fac(t-1, k - 1);
}

//создание матрицы
function matrix(rows, columns){
    var arr = new Array();

    for (var i=0; i < rows; i++){
        arr[i] = new Array();
        for (var j=0; j < columns; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}

//создание таблицы конечных разностей
function table(hh, n, A, B, C, D, perX, perY, alfa, betta, gamma, delta) {
//первый столбец (func(x))
    for (var x = Number(A), i = 0; i <= n; x += hh, i++) {
        matr[i][0] =  Number(alfa)*Math.sin(Math.tan(Number(betta)*x))+Number(gamma)*Math.cos(Number(delta)*x);
    }


  for(var j=1; j<=n; j++){
    for(var i=0; i<=(n-j); i++){
      matr[i][j]=matr[i+1][j-1]-matr[i][j-1];
    }
  } 
}

//отрисовка Rn()
function printr(A, B, C, D, perX, perY, alfa, betta, gamma, delta,  hh, n) {
    ctx.fillStyle = "#0000FF";
    for (var x = Number(A); x <= Number(B); x += 0.01) {
      var y = Number(alfa)*Math.sin(Math.tan(Number(betta)*x))+Number(gamma)*Math.cos(Number(delta)*x); 
      ctx.fillRect(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - y * perY + pol((x - Number(A)) / hh, 0, n) * perY), 1, 1);
    }
}

//отрисовка функции dF()
function printdf(A, B, C, D, perX, perY, alfa, betta, gamma, delta,  hh, n, del) {
    ctx.fillStyle = "#FF00FF";

    for (var x = Number(A); x <= Number(B); x += 0.01) {
        var y = Number(alfa)*Math.sin(Math.tan(Number(betta)*x))+Number(gamma)*Math.cos(Number(delta)*x); 
        var s =  Number(alfa)*Math.sin(Math.tan(Number(betta)*(x+Number(del))))+Number(gamma)*Math.cos(Number(delta)*(x+Number(del))); 
        ctx.fillRect(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - s * perY/Number(del) + y * perY/Number(del)), 1, 1);
    }
}

//отрисовка функции dPn()
function printdp(A, B, C, D, perX, perY, alfa, betta, gamma, delta, hh, n, del) {
    ctx.beginPath();
    ctx.strokeStyle = "#800000";

    hh = (Number(B)-Number(A))/Number(n);

    ctx.moveTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh + Number(del), 0, n) * perY + pol((x - Number(A)) / hh, 0, n) * perY));
    for (var x = Number(A); x <= Number(B); x += 0.01) {
        ctx.lineTo(Math.round(- Number(A) * perX + x * perX), Math.round(Number(D) * perY - pol((x - Number(A)) / hh + Number(del), 0, n) * perY + pol((x - Number(A)) / hh, 0, n) * perY), 1, 1);
    }

    ctx.stroke();
}