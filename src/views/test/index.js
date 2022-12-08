import {
  defineComponent,
  ref
} from 'vue'
import { ElInput } from 'element-plus/components'

console.log('TestView')

export default defineComponent({
  name: 'TestView',
  components: { ElInput },
  setup(props, ctx) {
    const text = ref('')

    const onInput = (val) => {
      text.value = val
    }

    return () => {
      return <>
        <div>TestView { text.value }</div>
        <ElInput style={{ width: '300px!important' }} modelValue={ text.value } onInput={ onInput } placeholder="Hello"></ElInput>
      </>
    }
  }
})
