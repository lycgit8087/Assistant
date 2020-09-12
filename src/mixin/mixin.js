export const mixin={
    data(){
        return {
            shareOptions: [
                { name: "微信", icon: "wechat" },
                { name: "QQ", icon: "qq" },
                { name: "复制链接", icon: "link" },
                { name: "分享海报", icon: "poster" },
                { name: "二维码", icon: "qrcode" },
              ],
        }
    },
    methods:{
        backTo(){
            this.$router.go(-1)
          },
          onSelect(option) {
            this.$Toast(option.name);
            this.showShare = false;
          },
          
    }
}