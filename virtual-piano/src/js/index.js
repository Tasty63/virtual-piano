class Piano {
	constructor() {
		this.keyboard = new Keyboard();
		this.switch = new Switch();
		this.fullscreen = new Fullscreen();
		this.fullscreen.addHandlers();
	}

	addHandlers() {
		window.addEventListener('keydown', this.keyboard.playHandler);
		window.addEventListener('keyup', this.keyboard.removeActiveClass.bind(this.keyboard));
		window.addEventListener('mouseup', () =>
			this.keyboard.node.removeEventListener('mouseover', this.keyboard.playHandler)
		);
	}
}

class Keyboard {
	constructor() {
		this.node = document.querySelector('.keyboard__container');
		this.playHandler = this.playKey.bind(this);

		this.node.addEventListener('mousedown', (event) => {
			this.playKey(event);
			this.node.addEventListener('mouseover', this.playHandler);
		});
		this.node.addEventListener('mouseout', this.removeActiveClass.bind(this));
		this.node.addEventListener('mouseup', this.removeActiveClass.bind(this));
	}

	getKeyElement(event) {
		if (event.type == 'keydown' || event.type == 'keyup') {
			const key = document.querySelector(`.keyboard__key[data-keyCode=${event.code}]`);
			return key;
		}

		if (event.target.classList.contains('keyboard__key')) {
			return event.target;
		}
		return event.target.parentNode;
	}

	isKeyNotFound(key) {
		if (!key || !key.classList.contains('keyboard__key')) {
			return true;
		}
		return false;
	}

	playAudio(event) {
		const key = this.getKeyElement(event);
		if (this.isKeyNotFound(key)) {
			return;
		}

		const sound = key.dataset.sound;
		const audio = new Audio();

		audio.src = `audio/${sound}.mp3`;
		audio.currentTime = 0;
		audio.play();
	}

	setActiveClass(event) {
		const key = this.getKeyElement(event);
		if (this.isKeyNotFound(key)) {
			return;
		}

		key.classList.add('active');
	}

	removeActiveClass(event) {
		const key = this.getKeyElement(event);
		if (this.isKeyNotFound(key)) {
			return;
		}

		key.classList.remove('active');
	}

	playKey(event) {
		if (!event.repeat) {
			this.setActiveClass(event);
			this.playAudio(event);
		}
	}
}

class Switch {
	constructor() {
		this.node = document.querySelector('.switch');
		this.node.addEventListener('click', this.changeKeyNames);
	}

	changeKeyNames(event) {
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
}

class Fullscreen {
	constructor() {
		this.node = document.querySelector('.piano__fulscreen');
	}

	activateFullscreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}

	deactivateFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	isInFullscreen() {
		if (
			document.fullscreenElement ||
			document.webkitIsFullScreen ||
			document.mozFullScreen ||
			document.msFullscreenElement
		) {
			return true;
		}
	}

	exitFullscreen() {
		if (this.isInFullscreen()) {
			return;
		}

		this.node.classList.remove('opened');
	}

	addHandlers() {
		this.node.addEventListener('click', () => {
			if (this.node.classList.contains('opened')) {
				this.deactivateFullscreen();
			} else {
				this.activateFullscreen(document.documentElement);
			}
			this.node.classList.toggle('opened');
		});

		document.addEventListener('fullscreenchange', this.exitFullscreen.bind(this));
		document.addEventListener('webkitfullscreenchange', this.exitFullscreen.bind(this));
		document.addEventListener('mozfullscreenchange', this.exitFullscreen.bind(this));
		document.addEventListener('MSFullscreenChange', this.exitFullscreen.bind(this));
	}
}

const piano = new Piano();
piano.addHandlers();
