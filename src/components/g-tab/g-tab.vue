<template>
<div class="g-tab">
    <div class="hometab">
        <ul class="f-tc f-cb">
            <li class="tab">
                <router-link :to="{path:'/product'}" tag="a" class="f-blk">
                    <img src="../../common/image/smyy.png">
                    <span class="f-thide">数码影音</span>
                </router-link>
                <em class="line"></em>
            </li>
            <li class="tab">
                <router-link :to="{path:'/product'}" tag="a" class="f-blk">
                    <img src="../../common/image/ipzb.png">
                    <span class="f-thide">IP周边</span>
                </router-link>
                <em class="line"></em>
            </li>
            <li class="tab">
                <router-link :to="{path:'/product'}" tag="a" class="f-blk">
                    <img src="../../common/image/hot.png">
                    <span class="f-thide">热销爆品</span>
                </router-link>
                <em class="line"></em>
            </li>
            <li>
                <router-link :to="{path:'/product'}" tag="a" class="f-blk">
                    <div class="left"></div>
                    <div class="right">
                        <div class="txt s-fc1">积分商城</div>
                        <span class="count">50</span>
                        <span class="jifen">积分</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
.g-tab {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.hometab {
    width: 1100px;
    margin: 0 auto;
}
.hometab ul {
    width: 100%;
    height: 80px;
}
.f-tc {
    text-align: center;
}
.hometab ul .tab {
    float: left;
    width: 275px;
    height: 80px;
}
.hometab ul li a {
    float: left;
    width: 250px;
    padding: 0 10px;
    height: 80px;
    text-align: center;
    font-size: 0;
}
.hometab ul li img {
    display: inline-block;
    width: 48px;
    height: 48px;
    vertical-align: top;
    padding-top: 16px;
}
.hometab .tab span {
    display: inline-block;
    max-width: 190px;
    height: 80px;
    padding-left: 12px;
    line-height: 80px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
}
.f-thide {
    word-wrap: normal;
}
.hometab .line {
    display: inline-block;
    height: 48px;
    width: 1px;
    margin: 16px 0 16px 0;
    background-color: #000000;
    opacity: 0.1;
}
.hometab .left {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-top: 15px;
    background: url(../../common/image/jifen.png) no-repeat;
}
.hometab .right {
    display: inline-block;
    height: 80px;
    padding-left: 8px;
    vertical-align: top;
}
.hometab .right .txt {
    padding-top: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
}
.hometab .right .count {
    display: inline-block;
    font-size: 14px;
    color: #d33a31;
}
.hometab .right .jifen {
    display: inline-block;
    padding: 2px 0 0 4px;
    font-size: 12px;
    color: #d33a31;
}
</style>
