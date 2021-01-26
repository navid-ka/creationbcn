const loadingScreen = document.querySelector(".loading-screen");
const fade = document.querySelector(".fade-out");

//Helpers

function getRootWebSitePath(){
    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex) + '/';
    var webFolderIndex = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
    var webFolderFullPath = _location.substring(0, webFolderIndex);
    return webFolderFullPath;
}
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
			name: "portfolio",
			from: { namespace: "level-1" },
			to: { namespace: "detail" },
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
			name: "servicios",
			from: { namespace: "level-1" },
			to: { namespace: "level-2" },
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
			name: "level-2",
			from: { namespace: "level-2" },
			to: { namespace: "level-2" },
			async leave(data) {
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				await pageTransitionOut(data.next.container);
			},
		},

		{
			name: "level-2-1",
			from: { namespace: "level-2" },
			to: { namespace: "level-1" },
			async leave(data) {
				await pageTransitionIn();
				data.current.container.remove();
			},
			async enter(data) {
				await pageTransitionOut(data.next.container);
			},
		},
		{
			name: "lv-detail",
			from: { namespace: "level-2" },
			to: { namespace: "detail" },
			
			async leave(data) {
/* 				barba.go(`${basePath}`) */
				await fadeIn();
				data.current.container.remove();
			},
			async enter(data) {
				await fadeOut(data.next.container);
			},
		},
	],
			views: [{
			namespace: 'level-2',
			beforeLeave(data) {
				barba.go(getRootWebSitePath());
			}
		},]
});

