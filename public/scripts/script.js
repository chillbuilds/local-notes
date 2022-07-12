const fs = require('fs')
const { BlockList } = require('net')
const path = require('path')

var dir = fs.readFileSync(path.join(__dirname,'../assets/text/dir.txt'), 'utf-8')


if(dir.split('').length == 0){
    $('#modal-element').html(`
        <div style="text-align:center;">
            please enter note directory<br><br>
        </div>
        <input style="width:100%;" id="dir"></input>
        <img class="icon" id="update" style="position:relative;float:right;" src="../assets/images/check.png">
        <script>
        $('#update').on('click', ()=>{
            let valSplit = $('#dir').val().split('')
            if(valSplit[valSplit.length-1] == '/'){
                fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#dir').val())
            }
            else{
                fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#dir').val()+'/')
            }
            $('.modal').attr('style', 'display:none;')
        })
        </script>
    `)
    $('.modal').attr('style', 'display:inline-block;')
    dir = fs.readFileSync(path.join(__dirname,'../assets/text/dir.txt'), 'utf-8')
    document.getElementById("note-dir").value = dir
}else{
    document.getElementById("note-dir").value = dir
}


$('#myBtn').on('click', ()=>{
    $('.modal').attr('style', 'display:inline-block;')
})

$('.close').on('click', ()=>{
    $('.modal').attr('style', 'display:none;')
})
