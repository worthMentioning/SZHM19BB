<template>
    <div class="details">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 在数据回来之后才创建 v-show是不可以的(元素一直都在)
                                    这个别人写好的这个组件 没有帮我们实现 数据更新 自动生成的功能
                                 -->
                                 <ProductZoomer
                                 v-if="imglist.length!=0"
                                :base-images="images"
                                :base-zoomer-options="zoomerOptions"
                                />
                                <!-- <ProductZoomer v-if="imglist.length!=0" :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer> -->
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.market_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li >
                                        <a @click="isShowDec = true;" href="javascript:;" :class="{selected:isShowDec}">商品介绍</a>
                                    </li>
                                    <li >
                                        <a @click="isShowDec = false;" href="javascript:;"  :class="{selected:!isShowDec}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- <div class="tab-content entry" style="display: block;">
                                内容
                            </div> -->
                            <div v-html="goodsinfo.content" v-show="isShowDec"></div>
                            <div class="tab-content"  v-show="!isShowDec" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea
                                                 v-model.trim ="commentContent"
                                                 id="txtContent" 
                                                 name="txtContent" 
                                                 sucmsg=" " 
                                                 datatype="*10-1000" 
                                                 nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input 
                                                :plain="true"
                                                @click="submitComment"
                                                id="btnSubmit" 
                                                name="submit" 
                                                type="submit" 
                                                value="提交评论" 
                                                class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0"  style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
    
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <Page 
                                         placement="top"
                                         :page-size	="pageSize"
                                         :total="totalcount" 
                                         show-sizer 
                                         show-elevator
                                         @on-change="pageChange($event)" 
                                         @on-page-size-change="pageSizeChange($event)"
                                         :page-size-opts="[5,10,15,20]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsinfo/`+item.id">                                        
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsinfo/`+item.id"> {{item.title}} </router-link>
                                            <span>{{item.add_time | cutTime }}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductZoomer from 'vue-product-zoomer'
import $ from 'jquery';

export default {
    data:function(){
        return {
            goodsinfo:{},
            hotgoodslist:[],
            imglist: [],
            isShowDec : true,
            pageIndex:1,
            pageSize:5,
            totalcount:0,
            // 轮播图的数据
            images: {
                normal_size: []
            },
            // 轮播图的配置
            zoomerOptions: {              
                // zoomFactor: 2,
                // pane: "container-round",
                // hoverDelay: 300,
                // namespace: "zoomer-bottom",
                // move_by_click: false,
                // scroll_items: 4,
                // choosed_thumb_border_color: "#dd2c00",
                "scroller_position": "bottom",
                // zoomer_pane_position: "right"
                 "zoomFactor": 4,
                "pane": "container-round",
                "hoverDelay": 300,
                "namespace": "zoomer-bottom",
                "move_by_click":true,
                "scroll_items": 5,
                "choosed_thumb_border_color": "#bbdefb"
            },
            messageList:[],
            commentContent:"",
        };
    },
    methods:{
        getgoodsInfo(){
             // 强制初始化
            this.imglist = [];
            // 清空预览图片的数组
            this.images.normal_size = [];
            this.axios
            .get(`/site/goods/getgoodsInfo/${this.$route.params.id}`)
            .then(response=>{
                // console.log(response);
                this.goodsinfo = response.data.message.goodsinfo;
                this.hotgoodslist = response.data.message.hotgoodslist;
                this.imglist = response.data.message.imglist;
                //再赋值到images 中
                this.imglist.forEach((v,i)=>{
                    this.images.normal_size.push({
                        id: v.id,
                        url: v.original_path
                    })                   
                });               
            }).catch(error=>{ });
        },
        //获取评论信息
        getcomments(){
            this.axios
            .get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
                this.pageIndex
                }&pageSize=${this.pageSize}`)
            .then(response=>{
                console.log(response);
                this.messageList = response.data.message;
                this.totalcount = response.data.totalcount;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        submitComment(){
            if(this.commentContent==""){
                this.$message({
                    message:"评论内容不能为空，请输入内容！！",
                    center: true
                });
                return;
            }else{
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
                    commenttxt:this.commentContent
                })
                .then(response=>{
                    console.log(response);
                    
                }).catch(err=>{
                    console.log(err);
                    
                });
            }
        },
        pageChange(v){
            console.log(v);
            //页面改变
            this.pageIndex = v;
            // 重新获取评论信息
            this.getcomments();

        },
        pageSizeChange(sizechange){
            this.pageSize = sizechange;
            this.getcomments();

        }
    },

    created() {
    // 获取商品详情
    this.getgoodsInfo();
    // 获取评论信息
    this.getcomments();
    // 打印vuex的值
    console.log('goodsinfo组件')
    // console.log(this.$store);
  },
}
</script>

<style lang="scss">
.goods-box{
    height: 480px;
}
.pic-box img {
    width: 360px;
}

.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list {
  img {
    height: 78px !important;
    width: 78px !important;
    margin: 5px;
  }
}
.control i {
  text-align: center;
}
.moveImg{
    width: 40px;
    position: absolute;
    top: 0;
    right: 50px;
}
.moveImg.move{
    transform: scale(.5,.5) rotateZ(3600deg);
    opacity: .4;
    transition: transform 1s,opacity  1s;
}
</style>

