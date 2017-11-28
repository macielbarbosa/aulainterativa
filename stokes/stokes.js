var parameters = {
    "id":"ggb",
    "width":600,
    "height":500,
    "showToolBar":false,
    "borderColor":null,
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":false,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":false,
    "useBrowserForJS":true,
    "ggbBase64":"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"
};
var applet = new GGBApplet(parameters, '5.0');
applet.setHTML5Codebase('https://app.geogebra.org/5.0/web3d/');
var ggbInit = false;

window.onload = function() {
    applet.inject('applet_container','preferHTML5');
    initialValues();
}

function ggbOnInit(){
    document.ggb.enableRightClick(false);
}

function initialValues() {
    document.getElementById('xuv').value = '3sin(u)cos(v)';
    document.getElementById('yuv').value = '3sin(u)sin(v)';
    document.getElementById('zuv').value = '3cos(u)';
    document.getElementById('ui').value = '0';
    document.getElementById('uf').value = 'pi/2';
    document.getElementById('vi').value = '0';
    document.getElementById('vf').value = '2pi';

    document.getElementById('xt').value = '3cos(t)';
    document.getElementById('yt').value = '3sin(t)';
    document.getElementById('zt').value = '0';
    document.getElementById('ti').value = '0';
    document.getElementById('tf').value = '2pi';

    document.getElementById('fx').value = 'y';
    document.getElementById('fy').value = '-x';
    document.getElementById('fz').value = '0';
    
    /*document.getElementById('superficie').value = 'x+y';
    document.getElementsByName('tipo')[0].checked = true;
    document.getElementById('parametrica').style.display = 'none';
    document.getElementById('implicita').style.display = 'block';*/
}

function geogebra(comando){
    document.ggb.evalCommand(comando);
}

function calcular(){
    plotSuperficie();
    plotCurva();
    var fx = document.getElementById('fx').value;
    var fy = document.getElementById('fy').value;
    var fz = document.getElementById('fz').value;
    if(ti>tf) {
        alert('O parâmetro t inicial da curva deve ser menor que o t final.');
        return;
    }
    geogebra('fx(x,y,z)='+fx);
    geogebra('fy(x,y,z)='+fy);
    geogebra('fz(x,y,z)='+fz);
    document.getElementById('resultadoBox').style.display = 'block';
    document.getElementById('resultado').innerHTML = document.ggb.getValue('integral').toFixed(2);
    if(document.ggb.getValue('integral')==NaN) calcular();
    MathJax.Hub.Typeset();
}

function plotSuperficie(){
    var xuv = document.getElementById('xuv').value;   
    var yuv = document.getElementById('yuv').value;   
    var zuv = document.getElementById('zuv').value;   
    var ui = document.getElementById('ui').value;   
    var uf = document.getElementById('uf').value;   
    var vi = document.getElementById('vi').value;   
    var vf = document.getElementById('vf').value;

    /*geogebra('xuv(u,v)='+xuv);
    geogebra('yuv(u,v)='+yuv);
    geogebra('zuv(u,v)='+zuv);
    geogebra('ui='+ui);
    geogebra('uf='+uf);
    geogebra('vi='+vi);
    geogebra('vf='+vf);*/
    geogebra('superficie=Surface('+xuv+','+yuv+','+zuv+',u,'+ui+','+uf+',v,'+vi+','+vf+')');
}

function plotCurva(){
    var rx = document.getElementById('xt').value;
    var ry = document.getElementById('yt').value;
    var rz = document.getElementById('zt').value;
    var ti = document.getElementById('ti').value;
    var tf = document.getElementById('tf').value;

    geogebra('rx(t)='+rx);
    geogebra('ry(t)='+ry);
    geogebra('rz(t)='+rz);
    geogebra('ti='+ti);
    geogebra('tf='+tf);
}

/*
function tipoFuncao() {
    var implicita = document.getElementsByName('tipo')[0].checked;
    if(implicita) {
        document.getElementById('parametrica').style.display = 'none';
        document.getElementById('implicita').style.display = 'block';
    }
    else {
        document.getElementById('implicita').style.display = 'none';
        document.getElementById('parametrica').style.display = 'block';
    }
}*/