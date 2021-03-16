const switchNotes = document.querySelector('.switch__notes');
const switchLetters = document.querySelector('.switch__letters');
const keyboard = document.querySelector('.keyboard');

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

function isKeyNotFound(key) {
	if (!key || !key.classList.contains('keyboard__key')) {
		return true;
	}
	return false;
}

function playAudio(event) {
	const key = getKeyElement(event);
	if (isKeyNotFound(key)) {
		return;
	}

	const sound = key.dataset.sound;
	const audio = new Audio();

	audio.src = `audio/${sound}.mp3`;
	audio.currentTime = 0;
	audio.play();
}

function setActiveClass(event) {
	const key = getKeyElement(event);
	if (isKeyNotFound(key)) {
		return;
	}

	key.classList.add('active');
}

function removeActiveClass(event) {
	const key = getKeyElement(event);
	if (isKeyNotFound(key)) {
		return;
	}

	key.classList.remove('active');
}

function playKey(event) {
	if (!event.repeat) {
		setActiveClass(event);
		playAudio(event);
	}
}

keyboard.addEventListener('mousedown', (event) => {
	playKey(event);
	keyboard.addEventListener('mouseover', playKey);
});
keyboard.addEventListener('mouseout', (event) => removeActiveClass(event));
keyboard.addEventListener('mouseup', (event) => removeActiveClass(event));

window.addEventListener('keydown', (event) => playKey(event));
window.addEventListener('keyup', (event) => removeActiveClass(event));
window.addEventListener('mouseup', () => keyboard.removeEventListener('mouseover', playKey));
