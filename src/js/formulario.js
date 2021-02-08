function inicia() {
	var send = document.getElementById("send");
	send.addEventListener("click", envia);
}
function envia() {
	var datos = new FormData();
	var nombre = document.getElementById("floatingInput").value;
	var apellidos = document.getElementById("floatingApellidos").value;
	var correo = document.getElementById("floatingEmail").value;
	var comentario = document.getElementById("floatingTextarea").value;
	var condiciones = document.getElementById("flexRadio").value;
	if (
		nom != "" &&
		correo != "" &&
		apellidos != "" &&
		comentario != "" &&
		condiciones != ""
	) {
		datos.append("nombre", nombre);
		datos.append("apellidos", apellidos);
		datos.append("correo", correo);
		datos.append("comentario", comentario);
		datos.append("condiciones", condiciones);
		var url = "mod/enviar.php";
		var solicitud = new XMLHttpRequest();
		solicitud.addEventListener("load", mostra);
		solicitud.open("POST", url, true);
		solicitud.send(datos);
	}
}
function mostra(event) {
	var datos = event.target;
	if (datos.status == 200) {
		document.querySelector("#messages").classList.add("alert-success");
		document.querySelector("#messages").innerHTML =
		datos.responseText;
	} else {
		document.querySelector("#messages").classList.add("alert-danger");
		document.querySelector("#messages").innerHTML =
			"Se ha producido un error en el envio.";
	}
}
window.addEventListener("load", inicia);