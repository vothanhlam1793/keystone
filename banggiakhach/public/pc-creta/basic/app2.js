var QL_GET_LIST = `
# Write your query or mutation here
query {
  allFileLocals {
    name
    file {
      publicUrl
    }
  }
}
`
var mixin_app_add_product = {
    data: {
        eStatus: {
            DONT_SAVE: "1",
            SAVED: "2",
            NEW: "3"
        },
        eMachine: {
            NAME: 0x31,
            DESCRIPTION: 0x33,
            PRICE: 0x32,
        },
        eKey: {
            NAME: 0x31,
            DESCRIPTION: 0x33,
            PRICE: 0x32,
            CREATE: 0x39,
            SAVE: 0x30,
        },
        product: {
            name: "",
            nameRaw: "",
            description: [],
            price: "",
            brand: "",
            warranty: ""
        },
        status: "NEW"
    },
    methods: {
        keyCode(code){
            switch(code){
                case this.eKey.CREATE: {
                    this.createProduct();
                } break;
                case this.eKey.NAME: {
                    // Cập nhật tên
                    this.machine = this.eMachine.NAME;
                } break;
                case this.eKey.DESCRIPTION: {
                    this.machine = this.eMachine.DESCRIPTION;
                } break;
                case this.eKey.PRICE: {
                    this.machine = this.eMachine.PRICE;
                } break;
                case this.eKey.SAVE: {
                    this.saveProduct();
                } break;
            }
            this.$forceUpdate();
        },
        saveProduct(){
            
            this.status = this.eStatus.SAVED;
        },
        clearProduct(){
            this.product.name = "";
            this.product.nameRow = "";
            this.product.description = [];
            this.product.warranty =  "";
            this.product.price = "";
            this.product.brand = "";
        },
        createProduct(){
            if(this.status != this.eStatus.DONT_SAVE){
                this.clearProduct();
                this.status = this.eStatus.NEW;
            } else {
                alert("Cần save sản phẩm trước nha");
            }
        },
        pushData(data){
            console.log(data, data.length);
            if((data.length > 0) || (data > 0)){
                
            } else {
                return;
            }
            console.log(data, this.machine);
            switch(this.machine){
                case this.eMachine.NAME: {
                    this.product.nameRaw = data;
                    this.product.name = data;
                } break;
                case this.eMachine.DESCRIPTION: {
                    // Kiem tra trung nhau
                    if(this.product.description.indexOf(data) >= 0){

                    } else {
                        this.product.description.push(data);
                    }
                } break;
                case this.eMachine.PRICE: {
                    this.product.price = data;
                }
            }
            this.status = this.eStatus.DONT_SAVE;
        },
        colorMachine(m){
            if(this.machine == m){
                return "alert alert-success";
            } else {
                return "alert alert-secondary";
            }
        }
    }
}
var app2 = new Vue({
    el: "#lists",
    mixins: [mixin_app_add_product],
    data: {
        files: [],
        file: {},
        workbook: XLSX.utils.book_new(),
        worksheet: {},
        ws: ""
    },
    methods: {
        async loadFile(){
            var f = this.files[this.file];
            const url = f.file.publicUrl;
            const data = await (await fetch(url)).arrayBuffer();
            const workbook = XLSX.read(data);
            workbook.Props.Title = f.name;
            this.workbook = workbook;
        },
        loadWorksheet(){
            this.worksheet = XLSX.utils.sheet_to_json(this.workbook.Sheets[this.ws], {header: 1});   
        }
    },
    created(){
        var that = this;
        graphql(QL_GET_LIST).then(data=>{
            that.files = data.data.allFileLocals;
        })
    }
})