const loadingScreen = document.querySelector(".loading-screen");
const mainNavigation = document.querySelector(".main-navigation");

function pageTransitionIn() {
	return (
		gsap
			.to(loadingScreen, {
					width: "100%",
					duration: 0.5,
			})
	);
}

function pageTransitionOut(container) {
	return gsap
		.timeline({ delay: 0.3 })
		.add("start")
		.to(
			loadingScreen,
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
		transitions: [{
			async leave(data) {
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				await pageTransitionOut(data.next.container);
			},
	
		}],
		views: [{
			namespace: 'level-2',
			beforeLeave(data) {
				delay(700);
				location.reload();
			}
		}, {
			namespace: 'level-2',
			beforeEnter(data) {
				location.reload();
				done();
			}
		}]
	});


function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}