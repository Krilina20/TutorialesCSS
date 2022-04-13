// if(document.all)
//     window.attachEvent('onload', _onload);
// else
//     window.addEventListener("load", _onload, false);

var tmr1 = undefined, tmr2 = undefined;
var A=1, B=1;

var pretag = document.getElementById('donut');
// var canvastag = document.getElementById('canvasdonut');

var ancho = 40;
var alto = 22;
var tamanyo = ancho * alto;

pretag.innerHTML = "Por empezar ...";

// var _onload = function() 
// {
//     var pretag = document.getElementById('donut');
//     // var canvastag = document.getElementById('canvasdonut');


//     pretag.innerHTML = "Por empezar ...";
// };

function animacion()
{
    if(tmr1 === undefined) 
    {
        tmr1 = setInterval(asciiframe, 50);
    } 
    else 
    {
        clearInterval(tmr1);
        tmr1 = undefined;
    }
}

function asciiframe() 
{
    var b=[];
    var z=[];
    A += 0.07;
    B += 0.03;
    var cA=Math.cos(A), sA=Math.sin(A),
        cB=Math.cos(B), sB=Math.sin(B);
    for(var k=0;k<tamanyo;k++) {
        b[k]=k%ancho == (ancho-1) ? "\n" : " ";
        z[k]=0;
    }
    for(var j=0;j<6.28;j+=0.07) 
    { // j <=> theta
        var ct=Math.cos(j),st=Math.sin(j);
        for(i=0;i<6.28;i+=0.02) 
        {   // i <=> phi
        var sp=Math.sin(i),cp=Math.cos(i),
            h=ct+2, // R1 + R2*cos(theta)
            D=1/(sp*h*sA+st*cA+5), // this is 1/z
            t=sp*h*cA-st*sA; // this is a clever factoring of some of the terms in x' and y'

        var x=0|((ancho/2)+(ancho*3/8)*D*(cp*h*cB-t*sB)),
            y=0|((alto/2)+(alto*2/3)*D*(cp*h*sB+t*cB)),
            o=x+ancho*y,
            N=0|(8*((st*sA-sp*ct*cA)*cB-sp*ct*sA-st*cA-cp*ct*sB));
            if(y<alto && y>=0 && x>=0 && x<(ancho-1) && D>z[o])
            {
                z[o]=D;
                b[o]=".,-~:;=!*#$@"[N>0?N:0];
            }
        }
    }
    pretag.innerHTML = b.join("");
}
