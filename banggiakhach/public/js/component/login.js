var SIGNIN = `
    mutation signin($identity: String, $secret: String) {
        authenticate: authenticateUserWithPassword(username: $identity, password: $secret) {
            item {
            id
            }
        }
    }
    `
var SIGNOUT = `
        mutation {
            unauthenticate: unauthenticateUser {
                success
            }
        }

    `
Vue.component("login", {
    props: ['phone'],
    data: function(){
        return {
            username: "",
            password: "",
            auth: false,
            user: {},
            type: "",
            content: "",
        }
    },
    methods: {
        setNotify: function(con, ty){
            this.content = con;
            this.type = ty;
        },
        logout: function(){
            var that = this;
            graphql(SIGNOUT).then(a=>{
                // console.log(a);
                if(a.data.unauthenticate.success){
                    that.auth = false;
                }
            })
        },
        login: function(){
            var that = this;
            that.setNotify("", "");
            graphql(SIGNIN, {
                identity: this.username,
                secret: this.password
            }).then(a => {
                if(!a.data.authenticate){
                    console.log("Đăng nhập sai");
                    that.setNotify("Tên đăng nhập hoặc mật khẩu bị sai", "ERROR");
                } else {
                    that.auth = true;
                    that.checkUser();
                    that.$emit('changestatus', 'SIGNED')
                }
            });
        },
        checkUser: function(){
            var that = this;
            fetch("/user/info").then(res=>res.json()).then(data=>{
                if(!data.message) {
                    that.user = data.data.User;
                    that.auth = true;
                } else {
                    that.auth = false;
                }
            })
        }
    },
    created: function(){
        this.checkUser();
    },
    template: `
        <div id="login">
            <notify :content="content" :type="type"></notify>
            <div v-if="!auth">
                <div class="mt-3 form-group">
                    <label>Tên đăng nhập</label>
                    <input class="form-control" v-model="username">
                </div>
                <div class="mt-3 form-group">
                    <label>Mật khẩu</label>
                    <input class="form-control" v-model="password" type="password">
                </div>
                <div class="mt-3 text-center">
                    <button class="btn btn-success" @click="login()">Đăng nhập</button>
                </div>
            </div>
            <div v-else>
                <div>
                    Chào: {{user.username}},
                    <a @click="logout()" href="">Đăng xuất</a>
                </div>
            </div>
        </div>
    `
})