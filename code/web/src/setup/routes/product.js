// App Imports
// import Detail from '../../modules/product/Detail'
import List from '../../modules/product/List';


// Product routes
export default {

  product: {
    path: '/products',
    component: List,
    auth: true
  },
}
