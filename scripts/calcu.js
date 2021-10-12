
function calculo(valor, precio, x, xt, preciokg){
    var valor = document.getElementById('idvalor').value;
    var precio = document.getElementById('idpeso').value;
    var x,xt = 0;
    var preciokg = 70;

    console.log(valor);
    console.log(precio);
    x = (preciokg)*(precio);
    console.log(x);
    window.alert("El precio del envio es: $" + (x));
    xt = parseFloat(valor) + parseFloat(x);
    console.log(xt);
    window.alert("El precio final (con envio): $" + (xt));

}
