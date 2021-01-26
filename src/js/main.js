const loadingScreen = document.querySelector(".loading-screen");
const fade = document.querySelector(".fade-out");


function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}

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

barba.hooks.enter((data) => {
	console.log(data.current.url.href);
});

barba.hooks.enter(() => {
	window.scrollTo(0, 0);
});

barba.init({
	debug: true,
	timeout: 5000,
	transitions: [
		{
			sync: true,
			name: "home",
			from: { namespace: "level-1" },
			to: { namespace: "level-1" },
			async leave(data) {
				delay(300);
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				delay(300);
				await pageTransitionOut(data.next.container);
			},
		},
		{
			sync: true,
			name: "portfolio",
			from: { namespace: ["level-1"] },
			to: { namespace: ["detail"] },
			async leave(data) {
				await fadeIn();
				delay(300);
				data.current.container.remove();

			},
			async enter(data) {
				delay(300)
				await fadeOut(data.next.container);

			},
		},
		{
			sync: true,
			name: "servicios",
			from: { namespace: ["level-1"] },
			to: { namespace: ['level-2'] },
			async leave(data) {
				await fadeIn();
				delay(300);
				data.current.container.remove();
			},
			async enter(data) {
				delay(300);
				await fadeOut(data.next.container);
			},
		},

		{
			sync: true,
			name: "level-2",
			from: { namespace: ['level-2'] },
			to: { namespace: ['level-2'] },
			async leave(data) {
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				await pageTransitionOut(data.next.container);
			},
		},

		{
			sync: true,
			name: "level-2-1",
			from: { namespace: ['level-2'] },
			to: { namespace: ["level-1"] },
			async leave(data) {
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				await pageTransitionOut(data.next.container);
			},
		},
	],
			views: [{
			namespace: ['level-2'],
			beforeLeave(data) {
				barba.history.remove();
                barba.go(url);
			}
		},]
});

