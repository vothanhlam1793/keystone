var CREATE_USER = `
mutation createUser($username: String, $password: String){
    createUser(data: { 
        phone: $username
        username: $username,
        password: $password
    }) {
        id phone
    }
}
`
var CHECK_USER = `
query checkUser($phone: String!){
    queryPhoneRister(phone: $phone){
        activate
        username
        id
        phone
    }
}
`

var RECOVERY = `
mutation findUserByEmail($username: String!) {
    startPasswordRecovery( username: $username ) {
        accessedAt
    }
}
`
Vue.component('register', {
    props: ['forgot'],
    data: function(){
        return {
            obj: {}
        }
    },
    methods: {
        recovery: function(user){
            let s_user = user || this.obj.username;
            graphql(RECOVERY, {
                username: s_user
            }).then(a=>{
                this.$emit("notify", {
                    content: "Xác thực qua điện thoại - chờ cuộc gọi đến ...",
                    type: "INFO"
                })
                this.$emit('changemode', "OTP");
            });
            localStorage.setItem("call_back_otp", s_user);
        },
        checkUser: function(){
            var that = this;
            if(this.obj.username.length != 10){
                return this.$emit("notify", {
                    content: "Nhập số điện thoại 10 số",
                    type: "ERROR"
                })
            }
            graphql(CHECK_USER, {
                phone: this.obj.username
            }).then((a)=>{
                console.log(a);
                if(!a.data.queryPhoneRister){
                    // Chua dang ky
                    console.log("chưa đang ký")
                    that.register();
                } else if (!a.data.queryPhoneRister.activate){
                    // Da dang ky
                    console.log("Chưa xác thực");
                    that.recovery();
                } else {
                    console.log(this.$props);
                    if(this.$props.forgot == 1){
                        that.recovery(a.data.queryPhoneRister.username);
                    } else {
                        this.$emit("notify", {
                            content: "Số điện thoại đã đăng ký!. Vào trang đăng nhập!.",
                            type: "WARNING"
                        })
                        // alert("Số điện thoại đã đăng ký!. Vào trang đăng nhập!.");
                        this.$emit('changemode', "LOGIN");
                    }
                }
            })
        },
        register: function(){
            if(!this.obj.username){
                this.$emit("notify", {
                    content: "Đừng để trống đăng nhập chứ!",
                    type: "WARNING"
                })
                return;
            }
            graphql(CREATE_USER, {
                username: this.obj.username,
                phone: this.obj.username,
                password: Math.round(Math.random()*10000000000).toString()
            }).then(a => {
                console.log(a);
                if(a.data.createUser.id){
                    // Đăng ký thành công
                    this.$emit("notify", {
                        content: "Xác thực qua điện thoại - chờ cuộc gọi đến ...",
                        type: "INFO"
                    })
                    this.$emit('changemode', "OTP");
                } else {
                    // Đăng ký thất bại
                }
            });
        },
        input: function(){
            this.obj.username = this.obj.username.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        },
    },
    template:`
    <div id="register" class="">
        <div class="">
            <label>Nhập số điện thoại</label>
            <input class="form-control" v-model="obj.username" type="text" @keyup="input()">
        </div>
        <div class="mt-2">
            <button class="btn btn-warning" @click="checkUser()">Tiếp tục</button>
        </div>
    </div>
    `
})
