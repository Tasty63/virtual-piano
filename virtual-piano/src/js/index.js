const keyboard = document.querySelector('.keyboard');
const switchButton = document.querySelector('.switch');

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

function changeKeyNames(event) {
	const letters = ['Q', '2', 'W', '3', 'E', 'R', '5', 'T', '6', 'Y', '7', 'U'];
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	const keyNamesElements = Array.from(document.querySelectorAll('.keyboard__key-name'));

	if (event.target.classList.contains('switch__letters')) {
		keyNamesElements.forEach((item, index) => {
			item.textContent = letters[index];
		});
	} else if (event.target.classList.contains('switch__notes')) {
		keyNamesElements.forEach((item, index) => {
			item.textContent = notes[index];
		});
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

switchButton.addEventListener('click', changeKeyNames);
