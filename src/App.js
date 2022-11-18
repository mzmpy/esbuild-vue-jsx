import {
  defineComponent,
  h, Fragment, ref
} from 'vue'
import { ElInput } from 'element-plus/components'
import styles from './App.module.css'

export default defineComponent({
  name: 'App',
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
