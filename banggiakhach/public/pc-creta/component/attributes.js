Vue.component('attributes',{
    props: ['type', 'product', 'ver'],
    data: function(){
        var id = Math.round(Math.random()*100000).toString();
        return {
            value: [],
            remove: [],
            id: id
        }
    },
    methods: {
        change: function(){
            var that = this;
            this.remove = [];
            this._props.type.getAttributes().forEach(function(att){
                if(that.value.indexOf(att.id)< 0){
                    that.remove.push(att.id);
                }
            });
            this._props.product.addAttributes(this.value);
            this._props.product.removeAttributes(this.remove);
        },
        add: function(id){
            this.value.push(id);
            this.change();
        },
        del: function(id){
            this.value.splice(this.value.indexOf(id),1);
            this.change();
        }
    },
    created(){
        var that = this;
        this._props.product.getAttributes().forEach(function(attribute){
            // console.log(that._props.type.id)
            try {
                if(attribute.type.id == that._props.type.id){
                    that.value.push(attribute.id);
                }
            } catch (e) {
                return;
            }
        })
    },
    template: `
        <div>
            <div v-if="type.getSelect() == 'CHECKBOX'">
                <div class="d-flex flex-wrap">
                    <div class="p-2" v-for="attribute in type.getAttributes()">
                        <input type="checkbox" 
                            :value="attribute.id"
                            v-model="value"
                            @change='change'
                            :id="'idcb' + attribute.id"
                        >
                        <label :for="'idcb' + attribute.id">{{attribute.label}}</label>
                    </div>
                </div>
            </div>
            <div v-if="type.getSelect() == 'RADIO'">
            
            </div>
        </div>
    `
})

Vue.component("attributes-manage", {
    props: ['type', 'product'],
    data: function(){
        var id = Math.round(Math.random()*100000).toString();
        return {
            id: id,
            s: "+"
        }
    },
    methods: {
        show(){
            $("#" + this.id).show();
        },
        hide(){
            $("#" + this.id).hide();
        }
    },
    template: `
    <div class="border border-primary rounded">
        <div class="p-2">
            <div class="d-flex">
                <div class="p-2 mr-auto"><h3>{{type.getName()}}</h3></div>
                <div><button class="btn btn-primary" @click="show()">+</button></div>    
            </div>
        </div>
        <div :id="id" class="collapse">
            <div>
                <div class="form-group">
                        <input class="form-control" type="text" v-model="type.value" placeholder="Giá trị">
                        <input class="form-control" type="text" v-model="type.label" placeholder="Hiển thị ngắn">
                    <div class="my-2">
                        <button class="btn btn-danger" @click="hide()">Đóng</button>
                        <button class="btn btn-success" @click="type.add(type.value, type.label); type.value=''; type.label='';">Tạo</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2">
            <attributes :type="type" :product="product"></attributes>
        </div>
    </div>
    `
})