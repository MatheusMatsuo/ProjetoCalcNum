var equation = null;
var error = null;
//equacao test: ((x)**3)-9*(x)+3
function getInfo() {
  equation = document.getElementById("equation").value;
  error = document.getElementById("error").value;
  bissecao(equation, error)
};
function bissecao(f,e){
    // variaveis
    var min = -10000
    var max = 10000
    var func = f;
    var resultado = null;
    var sinal = null;
    var sinalAnt = null;
    var resultadoAnt = null;
    const intervalos =[];
    const raizes = [];
    //encontrando intervalos
    for (let i = min; i <=max; i++) { 
        resultadoAnt = i-1;
        var resultado = func.replaceAll('x', i);
        sinalAnt = sinal;
        resultado = eval(resultado);
        if(resultado >0){
            sinal = '+'
        }else if(resultado <0){
            sinal ='-'
        }
        if(sinal != sinalAnt && i > min){
            intervalos.push(resultadoAnt, i)
        }
    }
    //achando media/refinacao
    for (let i = 0; i < intervalos.length; i+=2) { 
        var a = intervalos[i];
        var b = intervalos[i+1];
        var erro = e;
        var inter = 0;
        var media;

        erro = erro.replaceAll(',' , '.');
        while (Math.abs(b - a) / 2 > erro) {
            media = (a + b) / 2;
            inter = 1;    
            if (eval(func.replaceAll('x', media)) === 0) {
              break;
            } else {
              if (eval(func.replaceAll('x', a)) * eval(func.replaceAll('x', media)) < 0) {
                b = media;
              } else {
                a = media;
              }
            }
        }
        raizes.push("Par de Intervalos: " + intervalos[i] +', '+ intervalos[i+1] + ' Valor do raiz deles: '+media);
    }
    var span = document.getElementById("result");
    span.textContent = raizes.join('  ||  ');

    //GRAPH    
    new Chart('myChart', {
    type: 'scatter',
      plugins:[{
        beforeDraw: chart => {
          var xAxis = chart.scales['x-axis-1'];
          var yAxis = chart.scales['y-axis-1'];
          const scales = chart.chart.config.options.scales;
          scales.xAxes[0].ticks.padding = yAxis.top - yAxis.getPixelForValue(0) + 6;
          scales.yAxes[0].ticks.padding = xAxis.getPixelForValue(0) - xAxis.right + 6;
        }
      }],
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: [{x:-3,y:5},{x:-2,y:0},{x:-1,y:-3},{x:0,y:-4},{x:1,y:-3},{x:2,y:0},{x:3,y:5}],
          borderColor: 'red'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: -10000,
              max: 10000,
              stepSize: 1,
              callback: v => v == 0 ? '' : v
            },
            gridLines: {
              drawTicks: false
            }        
          }],
          yAxes: [{
            ticks: {
              min: -10000,
              max: 10000,
              stepSize: 1,
              callback: v => v == 0 ? '' : v
            },
            gridLines: {
              drawTicks: false
            } 
          }]
        }
      }
    });
}
