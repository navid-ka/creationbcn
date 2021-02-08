new WOW().init();
const swup = new Swup({
	plugins: [
		/* new SwupJsPlugin(options), */
		new SwupScrollPlugin({
			doScrollingRightAway: true,
			animateScroll: false,
		}),
	],
});