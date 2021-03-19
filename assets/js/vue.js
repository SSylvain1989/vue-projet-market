// data
const products = [
  { id: 1, description: "Amande", price: 12, img: 'assets/img/amande.png'},
  { id: 2, description: 'Romarin', price: 20, img: 'assets/img/romarin.png'},
  { id: 3, description: 'Menthe', price: 15, img: 'assets/img/mint.png'},
  { id: 4, description: 'Camomille', price: 10, img: 'assets/img/camomille.png'},
  { id: 5, description: 'Lavande', price: 22, img: 'assets/img/lavande.png'},
  { id: 6, description: 'Earl Grey', price: 20, img: 'assets/img/earlGrey.png'},
  { id: 7, description: 'Framboise', price: 15, img: 'assets/img/framboise.png'},
  { id: 8, description: 'Hibiscus', price: 17, img: 'assets/img/hibiscus.png'},
  { id: 9, description: 'Rose', price: 17, img: 'assets/img/rose.png'},
  { id: 10, description: 'Tasse', price: 12, img: 'assets/img/tasse.png'},
  { id: 11, description: 'Boule à thé', price: 7, img: 'assets/img/boule.png'},
  { id: 12, description: 'Bols', price: 15, img: 'assets/img/bols.png'},
  { id: 13, description: 'Theire jamba', price: 25, img: 'assets/img/theire1.png'},
  { id: 14, description: 'Theire bava', price: 25, img: 'assets/img/theire2.png'},
  { id: 15, description: 'Theire bovo', price: 25, img: 'assets/img/theire3.png'},
];


const Home = {
  template: '#home',
  name: 'Home', 
  data:() => {
    return{
    products,
    searchKey: '',
    liked : [ ],
    cart:[],
  }
  },
  computed:{
    filteredList(){
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      })
    },
    getLikeCookie(){
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    },
    cartTotalAmount(){
      let total = 0;
      for (let item in this.cart){
        total = total + (this.cart[item].quantity * this.cart[item].price)
      }
      return total;
    }, 
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart){
        itemTotal = itemTotal + (this.cart[item].quantity)
      }
      return itemTotal;
    }
  },
  methods: {
    setLikeCookie(){
      document.addEventListener('input', () => {
        setTimeout(()=> {
        $cookies.set('like', JSON.stringify(this.liked));
      }, 300);
    })
    },
    addToCart(product){
      // check if already in array and
      for (let i = 0; i < this.cart.length; i++) {
        if( this.cart[i].id === product.id ){
          return this.cart[i].quantity++
        };
        
      }
      this.cart.push({
        id:product.id,
        img: product.img,
        description: product.description,
        price : product.price,
        quantity: 1,
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity + 1;
    }, 
    cartMinusOne(product, id){
      if(product.quantity === 1) {
        this.cartRemoveItem(id);
      }else{
        product.quantity = product.quantity - 1;
      }},
    cartRemoveItem(id){
      this.$delete(this.cart, id);
    }, 
  },
  mounted: () => {
    this.getLikeCookie;
  }
}
const UserSettings = {
  template: ' <h1>UserSettings</h1>',
  name: 'UserSettings'
}
const WishList = {
  template: ' <h1>Wish List </h1>',
  name: 'WishList'
}
const ShoppingCart = {
  template: ' <h1>ShoppingCart</h1>',
  name: 'ShoppingCart'
}

// routeur
const router = new VueRouter({
  routes : 
  [
    { path: '/', component: Home , name: 'Home' },
    { path: '/user-settings', component: UserSettings, name: 'UserSettings '},
    { path: '/wish-list', component: WishList, name: 'WishList'},
    { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart'},
  ]
})


const vue = new Vue({
  router,

}).$mount('#app');