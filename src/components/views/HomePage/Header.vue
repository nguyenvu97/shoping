<template>
  <header id="aa-header">
    <!-- start header top -->
    <div class="aa-header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="aa-header-top-area">
              <!-- start header top left -->
              <div class="aa-header-top-left">
                <!-- start language -->
                <div class="aa-language">
                  <div class="dropdown">
                    <a class="btn dropdown-toggle" href="#" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <!-- Sử dụng hình ảnh từ thư mục public -->
                      <img src="/img/flag/english.jpg" alt="english flag">ENGLISH
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li><a href="#"><img src="/img/flag/french.jpg" alt="">FRENCH</a></li>
                      <li><a href="#"><img src="/img/flag/english.jpg" alt="">ENGLISH</a></li>
                    </ul>
                  </div>
                </div>
<!--                 / language -->

<!--                 start currency-->
                <div class="aa-currency">
                  <div class="dropdown">
                    <a class="btn dropdown-toggle" href="#" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <i class="fa fa-usd"></i>USD
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li><a href="#"><i class="fa fa-euro"></i>EURO</a></li>
                      <li><a href="#"><i class="fa fa-jpy"></i>YEN</a></li>
                    </ul>
                  </div>
                </div>

                <div class="cellphone hidden-xs">
                  <p><span class="fa fa-phone"></span>00-62-658-658</p>
                </div>

              </div>
              <!-- / header top left -->
              <div class="aa-header-top-right">
                <ul class="aa-head-top-nav-right">
                  <li v-if="email"><router-link to="/account">{{ email }}</router-link></li>
                  <li v-else><router-link to="/login">My Account</router-link></li>
                  <li class="hidden-xs"><router-link to="/products/1">Wishlist</router-link></li>
                  <li class="hidden-xs"><a href="cart.html">My Cart</a></li>
                  <li class="hidden-xs"><a href="checkout.html">Checkout</a></li>
                  <li v-if="email && email.trim() !== ''">
                    <button class="btn btn-link" @click="logout">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- / header top -->

    <!-- start header bottom -->
    <div class="aa-header-bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="aa-header-bottom-area">
              <!-- logo -->
              <div class="aa-logo">
                <router-link to="/">
                  <span class="fa fa-shopping-cart"></span>
                  <p>daily<strong>Shop</strong> <span>Your Shopping Partner</span></p>
                </router-link>
              </div>
              <!-- / logo -->
              <!-- cart box -->
              <div class="aa-cartbox">
                <a class="aa-cart-link" href="#">
                  <span class="fa fa-shopping-basket"></span>
                  <span class="aa-cart-title">SHOPPING CART</span>
                  <span class="aa-cart-notify">2</span>
                </a>
                <div class="aa-cartbox-summary">
                  <ul>
                    <li>
                      <a class="aa-cartbox-img" href="#"><img src="/img/woman-small-2.jpg" alt="img"></a>
                      <div class="aa-cartbox-info">
                        <h4><a href="#">Product Name</a></h4>
                        <p>1 x $250</p>
                      </div>
                      <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
                    </li>
                    <li>
                      <a class="aa-cartbox-img" href="#"><img src="/img/woman-small-1.jpg" alt="img"></a>
                      <div class="aa-cartbox-info">
                        <h4><a href="#">Product Name</a></h4>
                        <p>1 x $250</p>
                      </div>
                      <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
                    </li>
                    <li>
                      <span class="aa-cartbox-total-title">
                        Total
                      </span>
                      <span class="aa-cartbox-total-price">
                        $500
                      </span>
                    </li>
                  </ul>
                  <a class="aa-cartbox-checkout aa-primary-btn" href="#">Checkout</a>
                </div>
              </div>
              <div class="aa-search-box">
                <form action="">
                  <input type="text" name="" id="" placeholder="Search here ex. 'man' ">
                  <button type="submit"><span class="fa fa-search"></span></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

import UserService from "@/service/User_Service.js";

export default {
  name: 'Header',
  data() {
    return {
      email: "",
      errorMessage: "",
      is_Open_Logout: false,
    };
  },
  mounted() {
    this.decodeUserToken();
  },
  methods: {
    async decodeUserToken() {
      try {
        const responseData = await UserService.decodeToken();
        if (responseData.status_code ===  200){
          this.email = responseData.data.email;
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async logout() {
      try {
       await UserService.logout();

        await this.$router.push({ name: 'home' });
        window.location.reload();

      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  },
};



</script>


<style scoped>

@import url('https://fonts.googleapis.com/css?family=Lato|Raleway&display=swap');
@import '@/assets/css/font-awesome.css';
@import '@/assets/css/bootstrap.css';
@import "@/assets/css/jquery.smartmenus.bootstrap.css";
@import "@/assets/css/jquery.simpleLens.css";
@import '@/assets/css/slick.css';
@import '@/assets/css/nouislider.css';
@import '@/assets/css/theme-color/default-theme.css';
@import '@/assets/css/sequence-theme.modern-slide-in.css';
@import '@/assets/css/style.css';
</style>

