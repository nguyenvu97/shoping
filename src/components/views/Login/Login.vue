<script >
import Header from "@/components/views/HomePage/Header.vue";
import {Token} from "@/model/user/Token.ts";
import Response from "@/model/user/Response.ts";
import Footer from "@/components/views/HomePage/Footer.vue";
import Cookies from "js-cookie";
import axios from "axios";





export default {

  name: 'Login',
  components: {
    Footer,
    Header
  },
  data() {
    return {
      Customer: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
      },
      login: {
        password: '',
        email: '',
      },
      formSubmitted: false
    };
  },
  methods: {
    submitFormRegister() {
      this.formSubmitted = true;


      const api = "http://localhost:1990/api/v1/user";
      axios.post(`${api}` + "/register", this.user).then(response => {
        const data = response.data;
        const responseData = new Response(data.message, data.status_code, data.data);
        if (responseData.data.status_code === 200) {
          this.$router.push({name: 'login'});
        } else {
          alert("register fail"
          )
          this.$router.push({name: 'login'});
        }
      });
    },

    submitFormLogin() {
      const userCredentials = {
        email: this.login.email,
        password: this.login.password
      };
      this.formSubmitted = true;
      const api = "http://localhost:1990/api/v1/user";

      axios.post(`${api}/login`, userCredentials)
          .then(response => {
            const data = response.data;
            if (data && data.data) {
              const tokenData = new Token(data.data.access_token, data.data.refresh_token);
              const responseData = new Response(data.message, data.status_code, tokenData);

              if (responseData.status_code === 200) {
                alert("Login Ok")
                this.$router.push({name: 'home'});
                localStorage.setItem("token", responseData.data.access_token);
                Cookies.set('refresh_token', responseData.data.refresh_token, {
                  expires: 7,
                  secure: true,
                  sameSite: 'Strict',
                  path: '/'
                });
              } else {

                alert("Login failed")
                this.$router.push({name: 'login'}).then(() => {
                  window.location.reload();
                });
              }
            } else {
              alert("Login failed")
              this.$router.push({name: 'login'}).then(() => {
                window.location.reload();
              });
            }
          })

    }
  },
}
</script>
<template>
<Header/>
  <section id="aa-myaccount">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="aa-myaccount-area">
            <div class="row">
              <div class="col-md-6">
                <div class="aa-myaccount-login">
                  <h4>Login</h4>
                  <form @submit.prevent="submitFormLogin" class="aa-login-form">
                    <label for="email">email<span>*</span></label>
                    <input v-model="login.email" type="text" placeholder="Email" id="username" required />
                    <label for="password">Password<span>*</span></label>
                    <input v-model="login.password" type="password" placeholder="Password" id="password" required />
                    <button type="submit" class="aa-browse-btn">Login</button>
                    <label class="rememberme" for="rememberme"><input type="checkbox" id="rememberme"> Remember me </label>
                    <p class="aa-lost-password"><a href="#">Lost your password?</a></p>
                  </form>
                </div>
              </div>
              <div class="col-md-6">
                <div class="aa-myaccount-register">
                  <h4>Register</h4>
                  <form @submit.prevent="submitFormRegister" class="aa-login-form">
                    <label for="email">email<span>*</span></label>
                    <input v-model="Customer.email" type="text" placeholder="Email" id="username" required />

                    <label for="password">Password<span>*</span></label>
                    <input v-model="Customer.password" type="password" placeholder="Password" id="password" required />

                    <!-- Các trường khác -->
                    <label for="address">Address<span>*</span></label>
                    <input v-model="Customer.address" type="text" placeholder="Address" id="address" required />

                    <label for="phone">Phone<span>*</span></label>
                    <input v-model="Customer.phone" type="text" placeholder="Phone number" id="phone" required />

                    <label for="fullName">Full Name<span>*</span></label>
                    <input v-model="Customer.fullName" type="text" placeholder="Full Name" id="fullName" required />

                    <button type="submit" class="aa-browse-btn">Register</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<Footer/>
</template>

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
