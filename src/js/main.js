const options = {
    plugins: [
        new SwupScrollPlugin({
            doScrollingRightAway: true,
			animateScroll: false
        })
    ]
};

const swup = new Swup(options);