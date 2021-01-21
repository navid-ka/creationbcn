barba.init({
	transitions: [
		{
			name: "opacity-transition",
			leave(data) {
				return gsap.to(data.current.container, {
                    ease: "circ.out",
                    x: 2000,

				});
			},
			enter(data) {
				return gsap.from(data.next.container, {
                    opacity: 0,
				});
			},
		},
	],
});
