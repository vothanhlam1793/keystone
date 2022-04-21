var QL_UPLOAD_FILE = `
    mutation uploadFileLocal($file: Upload!, $name: String!, $description: String!){
        createFileLocal(data: {
            file: $file,
            name: $name,
            description: $description
        }) {
            name
            file {
                publicUrl
            }
        }
    }
`

function createFileLocal(file, name, description){
    const body = new FormData();
    body.append(
        'operations', 
        JSON.stringify({
            operationName: 'uploadFileLocal',
            query: QL_UPLOAD_FILE,
            variables: {
                file: null,
                name: name,
                description: description
            }
        })
    );
    body.append('map', JSON.stringify({"1": ['variables.file']}));
    body.append("1", file , name);
    return fetch('/admin/api', { // Use your API endpoint /admin/api
        method: "POST",
        body: body,
    }).then(function(result) {
        return result.json();
    });
}
var app = new Vue({
    el: "#app",
    data: {
        counter: 0,
        wbs: [],
        files: []
    },
    methods: {
        uploadWorkbook(workbook){
            var wopts = { bookType:"xlsx", bookSST:false, type:"array" };
            var wbout = XLSX.write(workbook,wopts);
            var file = new Blob([wbout],{type:"application/octet-stream"});
            file.name = workbook.Props.Title || "NONAME_" + (new Date()).getTime();
            createFileLocal(file, workbook.Props.Title || "NONAME_" + (new Date()).getTime(), "File báo giá mềm").then(data=>{
                console.log(data);
            })
        },
        async handleFileSelect(event) {
            console.log(event);
            this.files = event.target.files;
            for(var i = 0; i < this.files.length; i++){
                console.log(i);
                var temp = await this.files[i].arrayBuffer();
                var wb = XLSX.read(temp);
                wb.Props.Title = this.files[i].name;
                this.wbs.push(wb);
            }
        }
    },
    created(){

    },
    mounted(){
        document.getElementById("files").addEventListener('change', this.handleFileSelect, false);
    }
})