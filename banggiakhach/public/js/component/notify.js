Vue.component("notify", {
    props: ["content", "type"],
    methods: {
        getClass: function(){
            switch(this.$props.type){
                case "ERROR": {
                    return "alert alert-danger"
                }
                case "WARNING": {
                    return "alert alert-warning"
                }
                case "SUCCESS": {
                    return "alert alert-success"
                }
                case "INFO": {
                    return "alert alert-info"
                }
            }
        },
        getContent: function(){
            return this.$props.content;
        }
    },
    template: `
        <div>
            <div :class="getClass()">
                <p>{{getContent()}}</p>
            </div>
        </div>
    `
})