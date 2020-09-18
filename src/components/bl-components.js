import blText from './blText'
import blNavbar from './blNavbar'
import blInfo from './blInfo'
import blInfoTabs from './blInfoTabs'
import blEditInfo from './blEditInfo'

export default (Vue) => {
  Vue.component('blText', blText)
  Vue.component('blNavbar', blNavbar)
  Vue.component('blInfo', blInfo)
  Vue.component('blInfoTabs', blInfoTabs)
  Vue.component('blEditInfo', blEditInfo)
}
