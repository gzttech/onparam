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
  var defaultCdnDomain = 'https://cdn.jsdelivr.net';

  function rtrim(x, characters) {
    var start = 0;
    var end = x.length - 1;
    while (characters.indexOf(x[end]) >= 0) {
      end -= 1;
    }
    return x.substr(0, end + 1);
  }

  function formatPackage(name) {
    let [prefix, ...rest] = name.split('@');
    let version = rest.join('@');
    if(prefix.indexOf('/') === -1){
      prefix = `npm/${prefix}`
    }
    return [prefix, version]
  }

  function appendCssTag(link){
	  return new Promise((resolve, reject) => {
	    let el = document.createElement('link');
      el.rel = 'stylesheet';
	    el.href = link;
	    document.head.appendChild(el);
	  });
  }

  function appendScriptTag(link){
	  return new Promise((resolve, reject) => {
	    let el = document.createElement('script');
	    el.onload = () => resolve(el);
	    el.src = link;
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

  function mountFromCDN(prefix, version, jsCode, cdnDomain){
    fetch(`https://data.jsdelivr.com/v1/package/${prefix}@${version}/entrypoints`, {mode: 'cors'})
      .then(resp => resp.json())
      .then(data => {
        let currCdnDomain = rtrim((cdnDomain || defaultCdnDomain), '/');
        let urlPrefix = `${currCdnDomain}/${prefix}@${version}`
        if(!!data.js) {
          appendScriptTag(urlPrefix + data.js.file).then(function() {
            if(!!jsCode){
              appendScriptCode(jsCode);
            }
          })
        }
        if(!!data.css) {
          appendCssTag(urlPrefix + data.css.file)
        }
      })
  }

  function appendFromCDN(prefix, version, jsCode, cdnDomain){
    if(!version) {
      fetch(`https://data.jsdelivr.com/v1/package/resolve/${prefix}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
          version = data.version;
          mountFromCDN(prefix, version, jsCode, cdnDomain);
        })
    }
    else {
      mountFromCDN(prefix, version, jsCode, cdnDomain);
    }
  }

  (function() {
    let scriptSrc = new URL(script.src);
    let href = new URL(window.location.href);
    let key = scriptSrc.searchParams.get("key");
    let value = scriptSrc.searchParams.get("value");
    let action = scriptSrc.searchParams.get("action");
    let jsCode = script.getAttribute('x-code');
    let cdnDomain = script.getAttribute('x-domain');
    if(!!key && !!value && !!action && href.searchParams.get(key) == value){
      let [prefix, version] = formatPackage(action);
      appendFromCDN(prefix, version, jsCode, cdnDomain);
	  }
  })();
}));
