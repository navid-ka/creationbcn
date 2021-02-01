const options = {
	plugins: [
		new SwupScrollPlugin({
			doScrollingRightAway: true,
			animateScroll: false,
		}),
	],
};

const swup = new Swup(options);

//Animations

/* const tl = gsap.timeline({paused : true}); */

//H1
/* gsap.registerPlugin(ScrollTrigger); //gsap ScrolTrigger init

const sections = gsap.utils.toArray("section").forEach((section) => {

    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end:"top 5%",
            toggleActions: "play none restart none",
            markers: true,
        },
        opacity: 0,
        x: -50,
        ease: "Power2.easeIn",
    });

});
 */

/* gsap.from(".container", {
	scrollTrigger: {
		trigger: ".container",
		toggleActions: "play none restart none",
		markers: true,
	},
	opacity: 0,
	delay: 1,
	x: -50,
	ease: "Power2.easeIn",
}); */


// contact

function enviar() {
	var messagesElement = document.getElementById("messages");

	// disable send button
	document.querySelector("#send").disabled = true;
	document.querySelector("#send").innerText = "Enviando ...";
	// show messages
	document.querySelector("#messages").style.display = "block";

	// XHR object
	var xhr = new XMLHttpRequest();

	xhr.onload = function (res) {
		if (xhr.status == 200) {
			console.log("resultado:" + xhr.status);
			var res = JSON.parse(this.response);

			document.querySelector("#messages").innerHTML = res.message;
			//document.querySelector("#messages").innerHTML += res.msg_phpmailer;
			console.log(xhr.responseText);

			if (res.error == false) {
				document.querySelector("#contact").style.display = "none";
				document
					.querySelector("#messages")
					.classList.remove("alert-danger");
				document
					.querySelector("#messages")
					.classList.add("alert-success");
				document.querySelector("#messages").innerHTML = res.message;
			} else {
				document
					.querySelector("#messages")
					.classList.add("alert-danger");
				document.querySelector("#send").disabled = false;
				document.querySelector("#send").innerText =
					"Reintentar el envío";
			}
		} else {
			// log error
			document.querySelector("#send").disabled = false;
			document.querySelector("#messages").innerHTML =
				"Se ha producido un error, contacte con el administrador";
			console.log("error" + xhr.status);
		}
	};

	// preapare request
	var formMethod = "POST";
	var formUrl = "mod/enviar.php";
	var formType = true;

	xhr.open(formMethod, formUrl, formType);

	// prepare form data
	var formElement = document.getElementById("contact");
	var data = new FormData(formElement);
	xhr.send(data);
}
