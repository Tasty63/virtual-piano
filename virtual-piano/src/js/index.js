const keyboard = document.querySelector('.keyboard');
const switchNotes = document.querySelector('.switch__notes');
const switchLetters = document.querySelector('.switch__letters');

function getKeyElement(target) {
	if (target.classList.contains('keyboard__key')) {
		return target;
	}
	return target.parentNode;
}

function playAudio(event) {
	const key = getKeyElement(event.target);
	const audio = new Audio();
	const sound = key.dataset.sound;

	audio.src = `audio/${sound}.mp3`;
	audio.currentTime = 0;
	audio.play();
}

function removeActive(event) {
	if (event.target.classList.contains('active')) {
		event.target.classList.remove('active');
	}
}

keyboard.addEventListener('click', (event) => {
	const key = getKeyElement(event.target);
	key.classList.add('active');
});

keyboard.addEventListener('transitionend', removeActive);

keyboard.addEventListener('click', playAudio);
