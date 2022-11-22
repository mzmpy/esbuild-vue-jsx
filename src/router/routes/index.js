import BasicView from '../../views/basicView'
import TextView from '../../views/test'

const routes = [
  {
    path: '/',
    name: 'BasicView',
    component: BasicView
  },
  {
    path: '/test-view',
    name: 'TestView',
    component: TextView
  }
]

export default routes
