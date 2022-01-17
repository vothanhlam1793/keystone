var CHANGE_PASSWORD = `
    mutation changePassword($token: String!, $password: String!) {
        changePasswordWithToken(token: $token, password: $password){
            id
        }
    }
    `
Vue.component("otp", {
    props: [],
    data: function(){
        return {
            code: "",
            password: "",
            step: 1
        }
    },
    methods: {
        otp: function(){
            console.log(this.code);
            if(this.code.length != 6){
                return alert("OTP có 6 chữ số");
            }
            this.step = 2;
        },
        changePass: function(){
            if(this.password.length < 8){
                return alert("Mật khẩu phải có ít nhất 8 kí tự");
            }
            graphql(CHANGE_PASSWORD, {
                token: this.code,
                password: this.password
            }).then(a => {
                if(!a.data.changePasswordWithToken){
                    console.log("Reset thất bại");
                } else {
                    location.href="/user/login";
                    console.log("Reset thành công");
                }
            })
        },
        input: function(){
            this.code = this.code.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        }
    },
    template: `
        <div class="mt-3" id="otp">
            <div v-if="step == 1">
                <div>
                    <label>Nhập OTP</label>
                    <input class="form-control" v-model="code" type="text" @keyup="input">
                </div>
                <div class="mt-2">
                    <button class="btn btn-warning" @click="otp()">Tiếp tục</button>
                </div>
            </div>
            <div v-if="step == 2">
                <div>
                    <label>Nhập mật khẩu mới</label>
                    <input class="form-control" v-model="password" type="password">
                </div>
                <div class="mt-2">
                    <button class="btn btn-primary" @click="changePass()">Hoàn tất</button>
                </div>
            </div>
        </div>
    `
})