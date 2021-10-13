const pf = document.getElementById('productofinal');
const pe = document.getElementById('productoenvio');
var value;

$('#Select1').on('change', function() {
  value = $(this).val();
  console.log(value);
});

function calculo(valor, precio, x, xt, preciokg, xte){
    var valor = document.getElementById('idvalor').value;
    var precio = document.getElementById('idpeso').value;

    var x,xt = 0;
    var preciokg = 70;

    console.log(valor);
    console.log(precio);
    x = (preciokg)*(precio);
    console.log(x);
    //window.alert("El precio del envio es: $" + (x));
    xt = parseFloat(valor) + parseFloat(x);
    console.log(xt);
    //window.alert("El precio final (con envio): $" + (xt));

    xte = parseFloat(xt) + parseFloat(value);
    console.log(xte);
    
    pe.innerHTML = `<div><strong>El precio del envio es: USD ${xt}</strong></div>`
    pf.innerHTML = `<div><strong>El precio final del producto es: USD ${xte}</strong></div>`

}
