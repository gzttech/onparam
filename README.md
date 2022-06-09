# onparam.js

onparam.js可以帮助页面在queryParams传递了某个特定参数时（比如action=debug），加载一个js的lib（比如vconsole）。

在一些特定场景下，比如对已经打包好的js代码增加临时进行在线的调试，onparam.js就可以发挥自己的作用。或者是在CI流程中，针对已经打包完成的HTML进行一些统一的修改（比如增加sentry的js追踪代码），也可以通过onparam.js来完成外部库的加载。

## Usage
onparam.js可以以一个script标签的形式被加载在HTML中，具体形式如下
```
<script
  src="<ONPARAM_JS_PATH>?key=<KEY>&value=<VALUE>&action=<LIB>"
  x-code="<X-CODE>"
  x-domain="<X-DOMAIN>">
</script>
```

简单的对上面的参数做一下解释：

- <ONPARAM_JS_PATH>就是onparam.js的地址，既可以下载到本地中通过引用，也可以直接通过公共CDN引用，比如 https://cdn.jsdelivr.net/gh/gzttech/onparam/src/onparam.js ，因为jsdelivr的默认地址有时在国内不能访问，可以考虑使用镜像地址 https://fastly.jsdelivr.net/gh/gzttech/onparam/src/onparam.js
- <KEY>/<VALUE>，当页面的queryParams中包含设置的KEY=VALUE这个参数时，onparam.js会加载action中指定的库。比如设置了`onparam.js?key=test&value=enable`，那么比如访问的页面是"/index.html?test=enable&..."，那么onparam.js就会加载指定action中指定的库。
- <LIB>，需要加载的lib地址，lib的规则同jsdelivr，即`[REPO/]<PACKAGE>[@VERSION]`，其中
  - 可选的`[REPO/]`默认为`npm/`，如果加载的包来自github则使用`gh/`前缀。
  - `<PACKAGE>`即为包的名称，如jquery等。
  - 可选的`[@VERSION]`只包的版本，如果不提供则使用jsdelivr中的最新版本。
- <X-CODE>是在js文件加载完成后需要执行的js代码
- <X-DOMAIN>是jsdelivr的镜像地址或者备用地址，在 https://cdn.jsdelivr.net 不能使用时，可以指定这个地址（比如 https://fastly.jsdelivr.net ）。


## Cookbook
在下面的范例代码中，可以把onparam.js替换为公共CDN地址 https://cdn.jsdelivr.net/gh/gzttech/onparam/src/onparam.js 。

### 加载vconsole

```
<script
  src="onparam.js?key=action&value=test&action=vconsole"
  x-code="vConsole = new VConsole();">
</script>
```

### 加载eruda

```
<script
  src="onparam.js?key=action&value=test&action=eruda"
  x-code="eruda.init();">
</script>
```

### 加载mdebug

```
<script
  src="onparam.js?key=action&value=test&action=mdebug"
  x-code="mdebug.init();">
</script>
```
