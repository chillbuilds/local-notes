const fs = require('fs')
const { BlockList } = require('net')
const { join } = require('path')
const path = require('path')

var dir = fs.readFileSync(path.join(__dirname,'../assets/text/dir.txt'), 'utf-8')

if(dir.split('').length <= 1){
    $('#modal-element').html(`
        <div style="text-align:center;">
            please enter note directory<br><br>
        </div>
        <input style="width:100%;" id="dir"></input>
        <img class="icon" id="modal-update" style="position:relative;float:right;" src="../assets/images/check.png">
        <script>
        $('#modal-update').on('click', ()=>{
            let valSplit = $('#dir').val().split('')
            if(valSplit[valSplit.length-1] == '/'){
                fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#dir').val())
                $('#note-dir').val($('#dir').val())
                dirUpdate()
            }
            else{
                fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#dir').val()+'/')
                $('#note-dir').val($('#dir').val())
                dirUpdate()
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

function dirUpdate() {
    let valSplit = $('#note-dir').val().split('')
    if(valSplit[valSplit.length-1] == '/'){
        fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#note-dir').val())
    }
    else{
        fs.writeFileSync(path.join(__dirname,'../assets/text/dir.txt'), $('#note-dir').val()+'/')
    }
    dir = fs.readFileSync(path.join(__dirname,'../assets/text/dir.txt'), 'utf-8')
    document.getElementById("note-dir").value = dir
    notePop()
}

function notePop() {
    $('#note-tray').html('')
    let fileArr = fs.readdirSync(dir)
    for(var i = 0; i < fs.readdirSync(dir).length; i++) {
        if(fileArr[i].split('.')[fileArr[i].split('.').length-1] == 'txt'){
            if(i == fileArr.length-1){
                $('#note-tray').append(`
                    <div class="note last" id="note-${i+1}" style="border-bottom: none;">${fileArr[i].split('.')[0]}</div>
                `)
            }
            else{
                $('#note-tray').append(`
                    <div class="note" id="note-${i+1}">${fileArr[i].split('.')[0]}</div>
                `)
            }
        }
        }
    $('#note-tray').append(`
        <script>
            $('.note').on('click', function(e) {
                $('#title').val($(e.target).text())
                $('#text-input').val(fs.readFileSync(dir+$(e.target).text()+'.txt', 'utf-8'))
                $('.note').attr('style', 'background: rgba(0,0,0,0)')
                $(this).attr('style', 'background: rgba(0,0,200,0.03); border-radius: 4px;')
            })
        </script>`)
}

$('#update').on('click', ()=>{
    dirUpdate()
})

$('.close').on('click', ()=>{
    $('.modal').attr('style', 'display:none;')
})

$('#save').on('click', ()=>{
    fs.writeFileSync(dir + $('#title').val() + '.txt', $('#text-input').val())
    $('#modal-element').html(`
        <div style="text-align:center;">note saved as hell</div>
    `)
    $('.modal').attr('style', 'display:inline-block;')
    notePop()
})

notePop()