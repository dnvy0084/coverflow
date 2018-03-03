console.log('index.js');


function compose(...fns) {
	return fns.reduce((f, g) => (...args) => g(f(...args)));
}

function closure(f, ...args) {
	return e => f(e, ...args);
}

function onload(target) {
	return new Promise((resolve, reject) => {
		target.onload = e => resolve(target);
		target.onerror = err => reject(err);

		if(target.complete) resolve(target);
	});
}

function loadImage(url, img = document.createElement('img')) {
	img.src = url;

	return onload(img);
}

function ajaxGET(url, query) {
	const req = new XMLHttpRequest();

	req.open('GET', url + queryString(query));
	req.send(null);

	return onload(req).then(e => req.responseText);
}

function queryString(o) {
	let s = '?';

	for(let k in o) {
		if(k === '__proto__') continue;

		s += `${k}=${o[k]}&`;
	}

	return s;
}

function appendAt(targetElement, parentElement) {
	console.log('append', targetElement, parentElement);

	return parentElement.appendChild(targetElement);
}

let appendToBody;

function loadAndAppendBody(url) {
	return loadImage(url)
		.then(img => appendToBody(img));
}

onload(window)
	.then(window => appendToBody = closure(appendAt, document.body))
	.then(window => ajaxGET('https://coverflow-196806.appspot.com/', {query: '김연아'}))
	.then(response => JSON.parse(response))
	.then(json => json.items)
	.then(items => items.map(item => loadAndAppendBody(item.thumbnail)))
	.then(promises => Promise.all(promises))
	.then(imgs => console.log(imgs));