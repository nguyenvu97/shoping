<script >

import {PageDto} from "@/model/product/PageDto.ts";
import {Product_Service} from "@/service/Prodct_Service.js";
import {ProductResponse} from "@/model/product/ProductResponse.ts";

export default {
  data(){
    return {
      category: "men",
      isLoading: false,
      product:[],
      activeCategory:"men"
    }
  },
  methods: {
    async getProduct() {
      try {
        const pageDto = new PageDto("", "", this.category, 0, 8);

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
    goToProducts(category) {

      this.$router.push({ name: 'products', query: { category } });
    },
    setCategory(newCategory) {
      this.category = newCategory;
      this.activeCategory = newCategory;
      this.getProduct();
    },
    getFirstImageUrl(urlString) {
      if (!urlString) return ''; // Tránh trường hợp không có URL
      const urlArray = urlString.split(',');
      return urlArray[0];  // Trả về URL đầu tiên hoặc một chuỗi trống nếu không có
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<template>
  <section id="aa-product">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="aa-product-area">
              <div class="aa-product-inner">
                <!-- start prduct navigation -->
                <ul class="nav nav-tabs aa-products-tab">
                  <li :class="{ active: activeCategory === 'men' }">
                    <a href="#" @click.prevent="setCategory('men')">Men</a>
                  </li>
                  <li :class="{ active: activeCategory === 'women' }">
                    <a href="#" @click.prevent="setCategory('women')">Women</a>
                  </li>
                  <li :class="{ active: activeCategory === 'sports' }">
                    <a href="#" @click.prevent="setCategory('sports')">Sports</a>
                  </li>
                  <li :class="{ active: activeCategory === 'electronics' }">
                    <a href="#" @click.prevent="setCategory('electronics')">Electronics</a>
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                  <!-- Start men product category -->
                  <div class="tab-pane fade" :class="{ 'in': activeCategory === 'men', 'active': activeCategory === 'men' }" id="men">

                    <ul class="aa-product-catg" v-if="product.length >0">
                      <li v-for="(product, index) in product" :key="index">
                        <figure>
                          <!-- Hình ảnh sản phẩm -->
                          <a class="aa-product-img" href="#">
                            <img
                                :src="getFirstImageUrl(product.url)"
                                :alt="product.product_name"
                                width="250"
                                height="300"
                            />
                          </a>

                          <!-- Nút Add To Cart -->
                          <a class="aa-add-card-btn" href="#">
                            <span class="fa fa-shopping-cart"></span> Add To Cart
                          </a>

                          <figcaption>
                            <!-- Tên sản phẩm -->
                            <h4 class="aa-product-title">
                              <a href="#">{{ product.product_name }}</a>
                            </h4>

                            <!-- Giá sản phẩm -->
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

                        <!-- Product Badge -->
                        <span class="aa-badge aa-sale" href="#">SALE!</span>
                      </li>
                    </ul>
                    <button @click="goToProducts('men')" class="aa-browse-btn" v-if="product.length > 0">
                      Browse all Products <span class="fa fa-long-arrow-right"></span>
                    </button>
                    <div v-else class="no-products-message">
                      <p>No products available</p>
                    </div>

                  </div>
                  <!-- / men product category women -->
                  <!-- start women product category -->
                  <div class="tab-pane fade" :class="{ 'in': activeCategory === 'women', 'active': activeCategory === 'women' }" id="women">

                    <ul class="aa-product-catg" v-if="product.length >0">
                      <li v-for="(product, index) in product" :key="index">
                        <figure>
                          <!-- Hình ảnh sản phẩm -->
                          <a class="aa-product-img" href="#">
                            <img
                                :src="getFirstImageUrl(product.url)"
                                :alt="product.product_name"
                                width="250"
                                height="300"
                            />
                          </a>

                          <!-- Nút Add To Cart -->
                          <a class="aa-add-card-btn" href="#">
                            <span class="fa fa-shopping-cart"></span> Add To Cart
                          </a>

                          <figcaption>
                            <!-- Tên sản phẩm -->
                            <h4 class="aa-product-title">
                              <a href="#">{{ product.product_name }}</a>
                            </h4>

                            <!-- Giá sản phẩm -->
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

                        <!-- Product Badge -->
                        <span class="aa-badge aa-sale" href="#">SALE!</span>
                      </li>
                    </ul>
                    <button @click="goToProducts('women')" class="aa-browse-btn" v-if="product.length > 0">
                      Browse all Products <span class="fa fa-long-arrow-right"></span>
                    </button>
                    <div v-else class="no-products-message">
                      <p>No products available</p>
                    </div>

                  </div>
                  <!-- / women product category  sports-->
                  <!-- start sports product category -->
                  <div class="tab-pane fade" :class="{ 'in': activeCategory === 'sports', 'active': activeCategory === 'sports' }" id="sports">

                    <ul class="aa-product-catg" v-if="product.length >0">
                      <li v-for="(product, index) in product" :key="index">
                        <figure>
                          <!-- Hình ảnh sản phẩm -->
                          <a class="aa-product-img" href="#">
                            <img
                                :src="getFirstImageUrl(product.url)"
                                :alt="product.product_name"
                                width="250"
                                height="300"
                            />
                          </a>

                          <!-- Nút Add To Cart -->
                          <a class="aa-add-card-btn" href="#">
                            <span class="fa fa-shopping-cart"></span> Add To Cart
                          </a>

                          <figcaption>
                            <!-- Tên sản phẩm -->
                            <h4 class="aa-product-title">
                              <a href="#">{{ product.product_name }}</a>
                            </h4>

                            <!-- Giá sản phẩm -->
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

                        <!-- Product Badge -->
                        <span class="aa-badge aa-sale" href="#">SALE!</span>
                      </li>
                    </ul>
                    <button @click="goToProducts('sports')" class="aa-browse-btn" v-if="product.length > 0">
                      Browse all Products <span class="fa fa-long-arrow-right"></span>
                    </button>
                    <div v-else class="no-products-message">
                      <p>No products available</p>
                    </div>

                  </div>
                  <!-- / sports product category electronics-->
                  <!-- start electronic product category -->
                  <div class="tab-pane fade" :class="{ 'in': activeCategory === 'electronics', 'active': activeCategory === 'electronics' }" id="electronics">
                    <ul class="aa-product-catg">
                      <li v-for="(product, index) in product" :key="index">
                        <figure>
                          <!-- Hình ảnh sản phẩm -->
                          <a class="aa-product-img" href="#">
                            <img
                                :src="getFirstImageUrl(product.url)"
                                :alt="product.product_name"
                                width="250"
                                height="300"
                            />
                          </a>

                          <!-- Nút Add To Cart -->
                          <a class="aa-add-card-btn" href="#">
                            <span class="fa fa-shopping-cart"></span> Add To Cart
                          </a>

                          <figcaption>
                            <!-- Tên sản phẩm -->
                            <h4 class="aa-product-title">
                              <a href="#">{{ product.product_name }}</a>
                            </h4>

                            <!-- Giá sản phẩm -->
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

                        <!-- Product Badge -->
                        <span class="aa-badge aa-sale" href="#">SALE!</span>
                      </li>
                    </ul>
                    <button @click="goToProducts('electronics')" class="aa-browse-btn" v-if="product.length > 0">
                      Browse all Products <span class="fa fa-long-arrow-right"></span>
                    </button>
                    <div v-else class="no-products-message">
                      <p>No products available</p>
                    </div>
                  </div>
                </div>
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
                </div><!-- / quick view modal -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
.no-products-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Adjust the height as per your design */
  font-size: 18px;
  color: #333;
  text-align: center;
  border: 1px dashed #ddd; /* Optional: add border to visually indicate no products */
  background-color: #f9f9f9; /* Optional: background color for the message area */
}

</style>

