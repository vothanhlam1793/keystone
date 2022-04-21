const ModuleLogin = {
    state: {
        user: {

        },
        auth: false,
        state: "LOGIN",
        counter: 0
    },
    actions: {
        checkUser(context){
            fetch("/user/info").then(res=>res.json()).then(data=>{
                if(!data.message) {
                    localStorage.setItem("SIGNED", true);
                    context.commit("setAuth", true);
                    context.commit("setUser", data.data.User);
                } else {
                    localStorage.setItem("SIGNED", false);
                    context.commit("setAuth", false);
                }
            })
        },
        changeState(context, payload){
            context.commit("changeState", payload);
        },
        counterCal(context, payload){
            if(payload.type){
                context.commit("counterAdd", payload.number);
            } else {
                context.commit("counterSub", payload.number);
            }
        },
        logout(context, payload){
            graphql(`
            mutation {
                unauthenticate: unauthenticateUser {
                    success
                }
            }
    
            `).then(a=>{
                if(a.data.unauthenticate.success){
                    context.commit("setAuth", false);
                    localStorage.setItem("SIGNED", false);
                }
            })
        }
    },
    mutations: {
        setAuth(state, payload){
            state.auth = payload;
        },
        setUser(state, payload){
            state.user = payload;
        },
        changeState(state, payload){
            state.state = payload;
        },
        counterAdd(state, payload){
            state.counter += payload;
        },
        counterSub(state, payload){
            state.counter -= payload;
        }
    }
}
const VMLogin = {
    store: new Vuex.Store(ModuleLogin),
    data: {

    },
    methods: {

    },
    computed: {
        auth(){
            return this.$store.state.auth;
        },
        user(){
            return this.$store.state.user;
        },
        state(){
            return this.$store.state.state;
        },
        counter(){
            return this.$store.state.counter;
        }
    },
    beforeCreate(){

    },
    created(){
        this.$store.dispatch("checkUser");
    }
}