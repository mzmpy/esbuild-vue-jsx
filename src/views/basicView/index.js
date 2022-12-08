import {
  defineComponent,
  ref
} from 'vue'
import { ElInput } from 'element-plus/components'
import { zhCn } from 'element-plus/locale'
import styles from './index.module.css'


console.log(zhCn)

export default defineComponent({
  name: 'BasicView',
  components: { ElInput },
  setup(props, ctx) {
    const peopleName = ref('')

    const onInput = (val) => {
      peopleName.value = val
    }

    return () => {
      return <>
        <h1>
          Hello { peopleName.value || 'World' }!
        </h1>
        <div class={ styles('inputBox') }>
          <span>Name</span>
          <ElInput class={ styles('input') } modelValue={ peopleName.value } onInput={ onInput } placeholder="World"></ElInput>
        </div>
      </>
    }
  },
})
