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
var mixin_login = {
    props: ['phone'],
    data: function(){
        return {
            username: "",
            password: "",
            auth: false,
            user: {},
            type: "",
            content: "",
            form: false
        }
    },
    methods: {
        setNotify: function(con, ty){
            this.content = con;
            this.type = ty;
            this.$emit("notify", {
                content: con,
                type: ty
            });
        },
        logout: function(){
            var that = this;
            graphql(SIGNOUT).then(a=>{
                console.log(a);
                if(a.data.unauthenticate.success){
                    that.auth = false;
                }
            })
        },
        login: function(){
            console.log("HERE");
            var that = this;
            that.setNotify("", "");
            graphql(SIGNIN, {
                identity: this.username,
                secret: this.password
            }).then(a => {
                console.log(a);
                if(!a.data.authenticate){
                    console.log("ERROR");
                    that.setNotify("Tên đăng nhập hoặc mật khẩu bị sai", "ERROR");
                } else {
                    that.auth = true;
                    that.checkUser();
                    that.$emit('changestatus', 'SIGNED');
                    that.setNotify("Đăng nhập thành công", "SUCCESS");
                }
            });
        },
        checkUser: function(){
            var that = this;
            fetch("/user/info").then(res=>res.json()).then(data=>{
                console.log(data);
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
}
Vue.component("login-menu", {
    mixins: [mixin_login],
    template: `
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-if="!auth && !form">
                    <a class="nav-link" href="#" @click="form=true">Đăng nhập</a>
                </li>
                <li class="nav-item" v-if="!auth && !form">
                    <a class="nav-link" href="#" @click="$emit('notify', {type: 'REGISTER'})">Đăng ký</a>
                </li>
                <li class="nav-item" v-if="!auth && form">
                    <input class="form-control" type="text" placeholder="Số điện thoại" name="username"  v-model="username">
                </li>
                <li class="nav-item mx-2" v-if="!auth && form">
                    <input class="form-control" type="password" placeholder="Mật khẩu" v-model="password" >
                </li>
                <li class="nav-item" v-if="!auth && form">
                    <button class="btn btn-primary" type="submit" @click="login()"><i class="material-icons">login</i></button>
                </li>
                <li class="nav-item" v-if="auth">
                    <a class="nav-link">Chào: <span class="badge badge-success">{{user.username}}</span></a>
                </li>
                <li class="nav-item" v-if="auth">
                    <a @click="logout()" class="nav-link "><i class="material-icons">logout</i></a>
                </li>
            </ul>
    `
}) 
Vue.component("login", {
    mixins: [mixin_login],
    template: `
        <div id="login">
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
                    <a @click="logout()" href=""><i class="material-icons">logout</i></a>
                </div>
            </div>
        </div>
    `
})