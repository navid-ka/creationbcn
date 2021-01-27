const loadingScreen = document.querySelector(".loading-screen");
const fade = document.querySelector(".fade-out");


//Anims

function pageTransitionIn() {
	return gsap.to(loadingScreen, {
		width: "100%",
		duration: 0.5,
	});
}

function pageTransitionOut(container) {
	return gsap.timeline({ delay: 0.3 }).add("start").to(
		loadingScreen,
		{
			width: "0%",
			duration: 0.3,
			ease: "power1.out",
		},
		"start"
	);
}
function fadeIn() {
	return gsap.to(fade, {
		width: "100%",
		height: "100%",
		duration: 0.5,
	});
}
function fadeOut() {
	return gsap.timeline({ delay: 0.3 }).add("start").to(
		fade,
		{
			width: "0%",
			duration: 0.3,
			ease: "power1.out",
		},
		"start"
	);
}
barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});

barba.init({
	debug: true,
	timeout: 5000,
	transitions: [
		{
			name: "home",
			from: { namespace: "level-1" },
			to: { namespace: "level-1" },
			async leave(data) {
				const done = this.async();
				pageTransitionIn();
				await delay(1500);
				done();

			},
			enter(data) {
				pageTransitionOut();

			},
		},
		{
			name: "portfolio",
			from: { namespace: ["level-1"] },
			to: { namespace: ["detail"] },
			leave(data) {
				fadeIn();
				delay(1000);


			},
			enter(data) {
				delay(1000)
				fadeOut();
			},
		},
		{
			name: "servicios",
			from: { namespace: ["level-1"] },
			to: { namespace: ['level-2'] },
			leave() {
				delay(1000);
				fadeIn();
	
			},
			enter(data) {
				location.reload();
				delay(1000);
				fadeOut();
				
			},
		},

		{
			name: "level-2",
			from: { namespace: ['level-2'] },
			to: { namespace: ['level-2'] },
			leave(data) {

				pageTransitionIn();
			},
			enter(data) {

				pageTransitionOut();
			},
		},

		{
			name: "level-2-1",
			from: { namespace: ['level-2'] },
			to: { namespace: ["level-1"] },
			leave(data) {

				delay(1000);
				pageTransitionIn();

			},
			enter(data) {
				delay(1000);
				pageTransitionOut();
			},
		},
	],
/* 		views: [{
			namespace: ['level-2'],
			beforeLeave(data) {

			},
			beforeEnter(data){
				location.reload();
			} 
		},]  */
});

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}
