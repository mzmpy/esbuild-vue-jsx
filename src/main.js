import {
  defineComponent,
  h, Fragment, ref
} from 'vue'
import { ElInput } from 'element-plus'
import './index.css'

export default defineComponent({
  name: 'main',
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
        <ElInput class="input" modelValue={ peopleName.value } onInput={ onInput } placeholder="World"></ElInput>
      </>
    }
  },
})
