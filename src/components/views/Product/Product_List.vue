<script>
import Header from "@/components/views/HomePage/Header.vue";

import {PageDto} from "@/model/product/PageDto.ts";
import {Product_Service} from "@/service/Prodct_Service.js";
import Footer from "@/components/views/HomePage/Footer.vue";

export default {
name: "Product_List",
  components: {Footer, Header},
  data(){
    return {
      category: "",
      isLoading: false,
      product:[],
      itemsPerPage: 12

    }
  },
  created() {

    this.category = this.$route.query.category || 'men';


  },
  methods :{
    async getProduct() {
      try {
        const pageDto = new PageDto("", "", this.category, 0, this.itemsPerPage);

        const responseData = await Product_Service.getAllProducts(pageDto);


        if (Array.isArray(responseData) && responseData.length > 0) {
          this.product = responseData;
          console.log("Fetched products:", this.product);
        } else {
          this.product = [];
        }

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    fetchProducts() {
      this.getProduct()
    },
    getFirstImageUrl(urlString) {
      if (!urlString) return ''; // Tránh trường hợp không có URL
      const urlArray = urlString.split(',');
      return urlArray[0];  // Trả về URL đầu tiên hoặc một chuỗi trống nếu không có
    },
  },

  mounted() {
  this.getProduct();
  }
}
</script>

<template>
  <Header/>
<!--  <Menu/>-->
  <section id="aa-product-category">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-md-9 col-sm-8 col-md-push-3">
          <div class="aa-product-catg-content">
            <div class="aa-product-catg-head">
              <div class="aa-product-catg-head-left">
                <form action="" class="aa-sort-form">
                  <label for="">Sort by</label>
                  <select name="">
                    <option value="1" selected="Default">Default</option>
                    <option value="2">Name</option>
                    <option value="3">Price</option>
                    <option value="4">Date</option>
                  </select>
                </form>
                <form action="" class="aa-show-form">
                  <label for="">Show</label>
                  <select v-model="itemsPerPage" @change="fetchProducts">
                    <option value="12" selected>12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                  </select>
                </form>
              </div>
              <div class="aa-product-catg-head-right">
                <a id="grid-catg" href="#"><span class="fa fa-th"></span></a>
                <a id="list-catg" href="#"><span class="fa fa-list"></span></a>
              </div>
            </div>
            <div class="aa-product-catg-body">
              <ul class="aa-product-catg">
                <li v-for="(product, index) in product" :key="index">
                  <figure>
                    <a class="aa-product-img" href="#">
                      <img
                          :src="getFirstImageUrl(product.url)"
                          :alt="product.product_name"
                          width="250"
                          height="300"
                      />
                    </a>

                    <a class="aa-add-card-btn" href="#">
                      <span class="fa fa-shopping-cart"></span> Add To Cart
                    </a>

                    <figcaption>
                      <h4 class="aa-product-title">
                        <a href="#">{{ product.product_name }}</a>
                      </h4>
                      <span class="aa-product-price">${{ product.product_price.toFixed(2) }}</span>
                    </figcaption>
                  </figure>

                  <div class="aa-product-hvr-content">
                    <a href="#" data-toggle="tooltip" data-placement="top" title="Add to Wishlist">
                      <span class="fa fa-heart-o"></span>
                    </a>
                    <a href="#" data-toggle="tooltip" data-placement="top" title="Compare">
                      <span class="fa fa-exchange"></span>
                    </a>
                    <a href="#" data-toggle="tooltip" data-placement="top" title="Quick View" data-target="#quick-view-modal">
                      <span class="fa fa-search"></span>
                    </a>
                  </div>
                </li>
              </ul>



              <!-- quick view modal -->
              <div class="modal fade" id="quick-view-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <div class="row">
                        <!-- Modal view slider -->
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <div class="aa-product-view-slider">
                            <div class="simpleLens-gallery-container" id="demo-1">
                              <div class="simpleLens-container">
                                <div class="simpleLens-big-image-container">
                                  <a class="simpleLens-lens-image" data-lens-image="img/view-slider/large/polo-shirt-1.png">
                                    <img src="/img/view-slider/medium/polo-shirt-1.png" class="simpleLens-big-image">
                                  </a>
                                </div>
                              </div>
                              <div class="simpleLens-thumbnails-container">
                                <a href="#" class="simpleLens-thumbnail-wrapper"
                                   data-lens-image="img/view-slider/large/polo-shirt-1.png"
                                   data-big-image="img/view-slider/medium/polo-shirt-1.png">
                                  <img src="/img/view-slider/thumbnail/polo-shirt-1.png">
                                </a>
                                <a href="#" class="simpleLens-thumbnail-wrapper"
                                   data-lens-image="img/view-slider/large/polo-shirt-3.png"
                                   data-big-image="img/view-slider/medium/polo-shirt-3.png">
                                  <img src="/img/view-slider/thumbnail/polo-shirt-3.png">
                                </a>

                                <a href="#" class="simpleLens-thumbnail-wrapper"
                                   data-lens-image="img/view-slider/large/polo-shirt-4.png"
                                   data-big-image="img/view-slider/medium/polo-shirt-4.png">
                                  <img src="/img/view-slider/thumbnail/polo-shirt-4.png">
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Modal view content -->
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <div class="aa-product-view-content">
                            <h3>T-Shirt</h3>
                            <div class="aa-price-block">
                              <span class="aa-product-view-price">$34.99</span>
                              <p class="aa-product-avilability">Avilability: <span>In stock</span></p>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis animi, veritatis quae repudiandae quod nulla porro quidem, itaque quis quaerat!</p>
                            <h4>Size</h4>
                            <div class="aa-prod-view-size">
                              <a href="#">S</a>
                              <a href="#">M</a>
                              <a href="#">L</a>
                              <a href="#">XL</a>
                            </div>
                            <div class="aa-prod-quantity">
                              <form action="">
                                <select name="" id="">
                                  <option value="0" selected="1">1</option>
                                  <option value="1">2</option>
                                  <option value="2">3</option>
                                  <option value="3">4</option>
                                  <option value="4">5</option>
                                  <option value="5">6</option>
                                </select>
                              </form>
                              <p class="aa-prod-category">
                                Category: <a href="#">Polo T-Shirt</a>
                              </p>
                            </div>
                            <div class="aa-prod-view-bottom">
                              <a href="#" class="aa-add-to-cart-btn"><span class="fa fa-shopping-cart"></span>Add To Cart</a>
                              <a href="#" class="aa-add-to-cart-btn">View Details</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
              </div>
            </div>
            <div class="aa-product-catg-pagination">
              <nav>
                <ul class="pagination">
                  <li>
                    <a href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li>
                    <a href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-4 col-md-pull-9">
          <aside class="aa-sidebar">
            <!-- single sidebar -->
            <div class="aa-sidebar-widget">
              <h3>Category</h3>
              <ul class="aa-catg-nav">
                <li><a href="#">Men</a></li>
                <li><a href="">Women</a></li>
                <li><a href="">Kids</a></li>
                <li><a href="">Electornics</a></li>
                <li><a href="">Sports</a></li>
              </ul>
            </div>
            <!-- single sidebar -->
            <div class="aa-sidebar-widget">
              <h3>Tags</h3>
              <div class="tag-cloud">
                <a href="#">Fashion</a>
                <a href="#">Ecommerce</a>
                <a href="#">Shop</a>
                <a href="#">Hand Bag</a>
                <a href="#">Laptop</a>
                <a href="#">Head Phone</a>
                <a href="#">Pen Drive</a>
              </div>
            </div>
            <!-- single sidebar -->
            <div class="aa-sidebar-widget">
              <h3>Shop By Price</h3>
              <!-- price range -->
              <div class="aa-sidebar-price-range">
                <form action="">
                  <div id="skipstep" class="noUi-target noUi-ltr noUi-horizontal noUi-background">
                  </div>
                  <span id="skip-value-lower" class="example-val">30.00</span>
                  <span id="skip-value-upper" class="example-val">100.00</span>
                  <button class="aa-filter-btn" type="submit">Filter</button>
                </form>
              </div>

            </div>
            <!-- single sidebar -->
            <div class="aa-sidebar-widget">
              <h3>Shop By Color</h3>
              <div class="aa-color-tag">
                <a class="aa-color-green" href="#"></a>
                <a class="aa-color-yellow" href="#"></a>
                <a class="aa-color-pink" href="#"></a>
                <a class="aa-color-purple" href="#"></a>
                <a class="aa-color-blue" href="#"></a>
                <a class="aa-color-orange" href="#"></a>
                <a class="aa-color-gray" href="#"></a>
                <a class="aa-color-black" href="#"></a>
                <a class="aa-color-white" href="#"></a>
                <a class="aa-color-cyan" href="#"></a>
                <a class="aa-color-olive" href="#"></a>
                <a class="aa-color-orchid" href="#"></a>
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  </section>
  <Footer/>


</template>

<style>

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
.aa-product-catg {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
}

/* Mỗi phần tử sản phẩm */
.aa-product-catg li {
  flex: 1 1 25%;

}

/* Đảm bảo rằng hình ảnh và nội dung sản phẩm được căn chỉnh đúng */




</style>


