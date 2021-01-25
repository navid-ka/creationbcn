const loadingScreen = document.querySelector(".loading-screen");
const mainNavigation = document.querySelector(".main-navigation");

function pageTransitionIn() {
	// GSAP methods can be chained and return directly a promise
	// but here, a simple tween is enough
	return (
		gsap
			// .timeline()
			// .set(loadingScreen, { transformOrigin: 'bottom left'})
			// .to(loadingScreen, { duration: .5, scaleY: 1 })
			.to(loadingScreen, {
					width: "100%",
					duration: 1,
	
				/* transformOrigin: "left top", */
			})
	);
}
// Function to add and remove the page transition screen
function pageTransitionOut(container) {
	// GSAP methods can be chained and return directly a promise
	return gsap
		.timeline({ delay: 0.7 }) // More readable to put it here
		.add("start") // Use a label to sync screen and content animation
		.to(
			loadingScreen,
			{
				width: "0%",
				duration: 0.5,
				/* transformOrigin: "left bottom", */
				ease: "power1.out",
			},
			"start"
		);
}

barba.hooks.enter(() => {
    window.scrollTo(0, 0);
});
barba.init({
		// We don't want "synced transition"
		// because both content are not visible at the same time
		// and we don't need next content is available to start the page transition
		// sync: true,
		transitions: [
			{
				// NB: `data` was not used.
				// But usually, it's safer (and more efficient)
				// to pass the right container as a paramater to the function
				// and get DOM elements directly from it
				async leave(data) {
					// Not needed with async/await or promises
					// const done = this.async();

					await pageTransitionIn();
					// No more needed as we "await" for pageTransition
					// And i we change the transition duration, no need to update the delay…
					// await delay(1000)

					// Not needed with async/await or promises
					// done()

					// Loading screen is hiding everything, time to remove old content!
					data.current.container.remove();
				},

				async enter(data) {
					await pageTransitionOut(data.next.container);
				},
				// Variations for didactical purpose…
				// Better browser support than async/await
				// enter({ next }) {
				//   return pageTransitionOut(next.container);
				// },
				// More concise way
				// enter: ({ next }) => pageTransitionOut(next.container),
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
