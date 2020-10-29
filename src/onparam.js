(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
	define([], factory);
    } else if (typeof module === 'object' && module.exports) {
	module.exports = factory();
    } else {
	root.returnExports = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    var script =  document.currentScript;

    function appendScriptFile(src){
	return new Promise((resolve, reject) => {
	    let el = document.createElement('script');
	    el.onload = () => resolve(el);
	    el.src = src
	    document.head.appendChild(el);
	});
    }

    function appendScriptCode(code){
	return new Promise((resolve, reject) => {
	    let el = document.createElement('script');
	    let src = new Blob([code], { type: 'text/javascript' });
	    el.onload = () => resolve(el);
	    el.src = URL.createObjectURL(src);
	    document.head.appendChild(el);
	});
    }

    var actions = {
	'vconsole': () => {
	    appendScriptFile('https://cdn.staticfile.org/vConsole/3.3.4/vconsole.min.js')
	        .then(function() {
		    appendScriptCode("window.vConsole = new window.VConsole();")
		})
	}
    };

    (function() {
	let scriptSrc = new URL(script.src);
	let href = new URL(window.location.href);
	let key = scriptSrc.searchParams.get("key");
	let value = scriptSrc.searchParams.get("value");
	let action = scriptSrc.searchParams.get("action");
	if(!!key && !!value && !!action && href.searchParams.get(key) == value){
	    actions[action]()
	}
    })();
}));
