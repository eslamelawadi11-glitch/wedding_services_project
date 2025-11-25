import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icons
import { 
  faHome, 
  faSearch, 
  faUser, 
  faHeart, 
  faCalendar, 
  faMapMarkerAlt,
  faStar,
  faEnvelope,
  faPhone,
  faCamera,
  faMusic,
  faPalette,
  faBuilding,
  faSprayCan,
  faBars,
  faTimes,
  faChevronDown,
  faCheck,
  faTimes as faX,
  faEdit,
  faTrash,
  faEye,
  faSignInAlt,
  faSignOutAlt,
  faCog,
  faBell,
  faFilter,
  faMap,
  faList,
  faShare,
  faBookmark,
  faClock,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faGlobe,
  faSun,
  faMoon,
  faImage
} from '@fortawesome/free-solid-svg-icons'

import { 
  faHeart as faHeartRegular,
  faBookmark as faBookmarkRegular,
  faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'

import { 
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useAuthStore } from './stores/auth'

// Add icons to library
library.add(
  faHome, faSearch, faUser, faHeart, faCalendar, faMapMarkerAlt,
  faStar, faEnvelope, faPhone, faCamera, faMusic, faPalette,
  faBuilding, faSprayCan, faBars, faTimes, faChevronDown,
  faCheck, faX, faEdit, faTrash, faEye, faSignInAlt, faSignOutAlt,
  faCog, faBell, faFilter, faMap, faList, faShare, faBookmark,
  faClock, faCheckCircle, faExclamationCircle, faInfoCircle,
  faGlobe, faSun, faMoon, faImage,
  faHeartRegular, faBookmarkRegular, faStarRegular,
  faFacebook, faInstagram, faTwitter, faWhatsapp
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Initialize auth on app start
const authStore = useAuthStore()
if (authStore.token) {
  authStore.fetchUser()
}

app.mount('#app')
