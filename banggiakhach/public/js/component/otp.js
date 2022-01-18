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
                this.$emit('notify', {
                    content: "OTP có 6 ký tự",
                    type: "DANGER"
                })
            }
            this.step = 2;
        },
        changePass: function(){
            if(this.password.length < 8){
                return this.$emit('notify', {
                    content: "Mật khẩu ít nhất có 8 kí tự nhé",
                    type: "WARNING"
                })
            }
            graphql(CHANGE_PASSWORD, {
                token: this.code,
                password: this.password
            }).then(a => {
                if(!a.data.changePasswordWithToken){
                    this.$emit('notify', {
                        content: "Có vẻ bạn đã nhập sai OTP, hoặc hệ thống bị lỗi - Thử lại nhé",
                        type: "FAILURE"
                    });
                    this.step = 1;
                } else {
                    this.$emit('notify', {
                        content: "Thay đổi mật khẩu thành công - đăng nhập nhé!",
                        type: "SUCCESS"
                    })
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