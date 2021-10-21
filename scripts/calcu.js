const ic = document.getElementById('categoria1');
const pf = document.getElementById('productofinal');
const pe = document.getElementById('productoenvio');
var value;

$('#Select1').on('change', function() {
  value = $(this).val();
  sel = $('#Select1 :selected').text();
  console.log(value);
  console.log(sel);
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
   
    ic.innerHTML = `<div>Categoria: <strong>${sel}</strong></div>` 
    pe.innerHTML = `<div>Envío: <strong>USD ${xt}</strong></div>`
    pf.innerHTML = `<div>Costo total del envío: <strong>USD ${xte}</strong></div>`

}



