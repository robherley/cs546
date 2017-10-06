window.onload = () => {
	anime({
		targets: '#logo .letters path',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInQuad',
		duration: 800
	});
};
