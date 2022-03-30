
function bissecao(){
    // variaveis
    var min = -5
    var max = 5
    var func = '5 + (x) - (x) ** 6';
    var resultado = null;
    var sinal = null;
    var sinalAnt = null;
    var resultadoAnt = null;
    var marginErro = 0.01;
    var intervaloF = null;
    var intervaloS = null;
    var intervaloM = null;
    var extra = false;
    const intervalos =[];

    //encontrando intervalos
    for (let i = min; i < max; i++) { 
        resultadoAnt = i-1;
        var resultado = func.replaceAll('x', i);
        sinalAnt = sinal;
        resultado = eval(resultado);
        console.log(resultado);
        if(resultado >0){
            sinal = '+'
        }else if(resultado <0){
            sinal ='-'
        }
        if(sinal != sinalAnt && i > min){
            intervalos.push(resultadoAnt, i)
        }
    }
    console.log(intervalos);

    //achando media/refinacao
    for (let i = 0; i < intervalos.length; i+=2) { 
        var firstchild = intervalos[i];
        var secondchild = intervalos[i+1];
        var media = (firstchild + secondchild)/2;
        var resultadoM = 1;
        console.log('Media: '+media);

        do{
            var resultadoF = eval(func.replaceAll('x', firstchild));
            var resultadoS = eval(func.replaceAll('x', secondchild));
            resultadoM = eval(func.replaceAll('x', media));
 
            intervaloF = Math.sign(resultadoF);
            intervaloS = Math.sign(resultadoS);    
            intervaloM = Math.sign(resultadoM);
            if(intervaloF == intervaloM){
                resultadoS = eval(func.replaceAll('x', secondchild));
                resultadoF = eval(func.replaceAll('x', media));
                firstchild = media;
                media = (media + secondchild)/2;
                
                console.log('nova media F: '+media);
            }else if(intervaloS == intervaloM){
                resultadoF = eval(func.replaceAll('x', firstchild));
                resultadoS = eval(func.replaceAll('x', media));
                secondchild = media;
                media = (firstchild + media)/2;

                console.log('nova media S: '+media);
            }
            if(Math.abs(resultadoM) > marginErro){
                extra = true;
            }
        }while (Math.abs(resultadoM) > marginErro);
        console.log('Ultimo Intervalo:'+media);
        console.log('Valor da equacao com o intervalo: ' + eval(func.replaceAll('x', media)));
    }
//1.36114501953125
}

bissecao()
