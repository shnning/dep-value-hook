# Introduction
dep-value-hook是一个用来解决数据依赖关系的库。当你想让一个变量依赖另一个变量，并且在变量改变时做一些额外的事情，那么就可以使用该库。

# Usage
```react
// index.js
import { DepValueProvider } from "dep-value-hook";

...
<DepValueProvider>
  <Form />
</DepValueProvider>
...

// Form.js
import { useDepState } from 'dep-value-hook'
function Form() {
  //...
  const [fieldA, setFieldA] = useDepState({
    defaultValue: "",
    name: "fieldA",
    nextDepName: "fieldB",
    effect: (value) => {
      // this effect function will be executed when setFieldA is called.
      // the effect of depState that has the same name as nextDepName will be executed 
      // and fieldB will be reset as the defaultValue. Also depState fieldC is same as depState fieldB.
    },
  });

  const [fieldB, setFieldB] = useDepState({
    defaultValue: "",
    name: "fieldB",
    prevDepName: "filedB",
    nextDepName: "filedC",
    effect: async (value) => {
      // ...
    },
  });
  
  const [fieldC, setFieldC] = useDepState({
    defaultValue: "",
    name: "fieldC",
    prevDepName: "filedC",
    effect: async (value) => {
      // ... 
    },
  });
  //...
}
```
我们可以把prevDepName和nextDepName理解为双向链表中的prev指针和next的指针，当传给setFieldA一个新的值时，首先fieldA会被重新赋值defaultValue，接着会执行filedA的effect函数，执行完毕后会去寻找与nextDepName相同的depState，如果有，执行effect函数，然后循环上述过程。   
最初是为了解决表单联动问题，一个下拉框的数据依赖好几个之前的下拉框的数据选择，而且依赖项发生变化时，该下拉框数据要清空并重新请求数据。

# 开发调试
```bash
npm i --legacy-peer-deps
npm run examples:install
npm run examples:start
# 如果想边调试边看示例, 在上面运行完毕后还需要额外再运行
npm run build:dev


# 如果想在其他project调试
npm run build:dev-link
npm link # 在本库的根目录下运行
cd your project
npm link dep-value-hook # 之后就可以import该库了
```



