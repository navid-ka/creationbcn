const loadingScreen = document.querySelector(".loading-screen");
const mainNavigation = document.querySelector(".main-navigation");

function pageTransitionIn() {
	return (
		gsap
			.to(loadingScreen, {
					width: "100%",
					duration: 1,
			})
	);
}

function pageTransitionOut(container) {
	return gsap
		.timeline({ delay: 0.7 })
		.add("start")
		.to(
			loadingScreen,
			{
				width: "0%",
				duration: 0.5,
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


/* const myRoutes = [{
	path: '/',
	name: 'level-1'
  }, {
	path: '/servicios/',
	name: 'level-2'
  },];

  
barba.use(barbaRouter, {
	routes: myRoutes
});
 */

barba.init({
		transitions: [
			{
				async leave(data) {
					await pageTransitionIn();
					data.current.container.remove();
				},
				async enter(data) {

					await pageTransitionOut(data.next.route.name);
					console.log(['level-1'])
				},
			},
		],
	});


function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}