const fs = require('fs')
const { BlockList } = require('net')
const { join } = require('path')
const path = require('path')

var dir = fs.readFileSync(path.join(__dirname,'../assets/text/dir.txt'), 'utf-8')

if(dir.split('').length == 0){
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
    let files = fs.readdirSync(dir)
    files.forEach(file => {
        if(file.split('.')[file.split('.').length-1] == 'txt'){
             $('#note-tray').append(`
             <div class="note">${file.split('.')[0]}</div>
             `)
        }
    })
    $('#note-tray').append(`
        <script>
            $('.note').on('click', function(e) {
                $('#title').val($(e.target).text())
                $('#text-input').html('')
                let noteData = fs.readFileSync(dir+$(e.target).text()+'.txt', 'utf-8')
                $('#text-input').val(noteData)
                console.log(noteData)
                console.log('text-input apparently updated 🤨')
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