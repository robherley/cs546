let textList;

const clear = () => {
	textList = {};
	Cookies.remove('textList');
	document.getElementById('pali-list').innerHTML = '';
};

const getListItem = (text, isPali) => {
	let newItem = document.createElement('li');
	newItem.className = `${isPali ? 'is' : 'not'}-palindrome list-item card`;
	newItem.innerHTML = `<p>${text}</p><i class="fa fa-${isPali
		? 'check'
		: 'times'}-circle fa-2x" aria-hidden="true"></i>`;
	document.getElementById('pali-list').appendChild(newItem);
};

const addNewText = () => {
	const text = document.getElementById('text');
	const simplified = text.value.toLowerCase().replace(/[^0-9a-z]/g, '');
	if (simplified.length !== 0) {
		if (textList[text.value]) {
			alert(`'${text.value}' is already in the list!`);
		} else {
			textList[text.value] = {
				isPalindrome:
					simplified ===
					simplified
						.split('')
						.reverse()
						.join(''),
				simplified
			};
			getListItem(text.value, textList[text.value].isPalindrome);
			Cookies.set('textList', JSON.stringify(textList));
		}
	} else {
		alert('You must have at least one alphanumeric character!');
	}
};

window.onload = () => {
	let cookies = Cookies.getJSON('textList');
	textList = cookies ? cookies : {};
	Object.keys(textList).forEach(key => {
		getListItem(key, textList[key].isPalindrome);
	});
	const submitButton = document.getElementById('submit');
	const clearButton = document.getElementById('clear');
	if (submitButton && clearButton) {
		submitButton.addEventListener('click', e => {
			e.preventDefault();
			addNewText();
		});
		clearButton.addEventListener('click', e => {
			if (confirm('Are you sure you want to delete the list?')) {
				clear();
			}
		});
	}
};
