const keyboard = document.querySelector('.keyboard');
const switchNotes = document.querySelector('.switch__notes');
const switchLetters = document.querySelector('.switch__letters');

function getKeyElement(event) {
	if (event.type == 'keydown' || event.type == 'keyup') {
		const key = document.querySelector(`.keyboard__key[data-keyCode=${event.code}]`);
		return key;
	}

	if (event.target.classList.contains('keyboard__key')) {
		return event.target;
	}
	return event.target.parentNode;
}

function playAudio(event) {
	const key = getKeyElement(event);
	const audio = new Audio();
	const sound = key.dataset.sound;

	audio.src = `audio/${sound}.mp3`;
	audio.currentTime = 0;
	audio.play();
}

function setActiveClass(event) {
	const key = getKeyElement(event);
	key.classList.add('active');
}

function removeActiveClass(event) {
	const key = getKeyElement(event);
	key.classList.remove('active');
}

keyboard.addEventListener('click', (event) => {
	setActiveClass(event);
	playAudio(event);
});
keyboard.addEventListener('transitionend', (event) => removeActiveClass(event));

window.addEventListener('keydown', (event) => {
	playAudio(event);
	setActiveClass(event);
});
window.addEventListener('keyup', (event) => removeActiveClass(event));
