import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Form,
  Button,
  FormItem,
  Input,
  Icon,
  Message
} from 'element-ui'

Vue.use(Form)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)

// 进行全局挂载：
Vue.prototype.$message = Message
