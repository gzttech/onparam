# onparam.js

onparam.js可以帮助页面在queryParams传递了某个特定参数时（比如action=debug），加载一个js的lib（比如vconsole）。

在一些特定场景下，比如对已经打包好的js代码增加临时进行在线的调试，onparam.js就可以发挥自己的作用。


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
