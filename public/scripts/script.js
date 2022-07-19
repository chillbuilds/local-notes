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
    $('#title').val('')
    $('#text-input').val('')
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
    let fileArr = []
    fs.readdirSync(dir).forEach((file)=>{
        if(file.split('.')[file.split('.').length-1] == 'txt'){
            let stat = fs.statSync(dir + file)
            fileArr.push({
                title: file,
                tags: 'test',
                time: Math.floor(stat.mtimeMs),
            })
        }
    })

    // time sort (defaults to title sort)
    fileArr.sort(function(a, b) {
        return b.time - a.time
    })

    for(var i = 0; i < fileArr.length; i++) {
            if(i == fileArr.length-1){
                $('#note-tray').append(`
                    <div class="note last" tags="${fileArr[i].tags}" time="${fileArr[i].time}" id="note-${i+1}" style="border-bottom: none;">${fileArr[i].title.split('.')[0]}</div>
                `)
            }
            else{
                $('#note-tray').append(`
                    <div class="note" tags="${fileArr[i].tags}" time="${fileArr[i].time}" id="note-${i+1}">${fileArr[i].title.split('.')[0]}</div>
                `)
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

$('#delete').on('click', ()=>{
    $('#modal-element').html(`
        <style>
            .modal-btn {
                text-align:center;
                padding: 10px 20px;
                background: rgba(0,0,0,0.4);
                border-radius: 6px;
            }
        </style>
        <div style="text-align:center;">Are you sure you want to delete this note?</div>
        <span class="modal-btn"><img width="28" id="update" src="../assets/images/check.png"></span>
        <span class="modal-btn">No</span>
    `)
    $('.modal').attr('style', 'display:inline-block;')
})

var saveCheck = false

$('#text-input').on('keyup', ()=>{
    if(saveCheck == false){
        saveCheck = true
        setTimeout(()=>{
            console.log($('#title').val().split('').length)
            if($('#title').val().split('').length > 0){
                console.log('auto saved')
                fs.writeFileSync(dir + $('#title').val() + '.txt', $('#text-input').val())
            // v v v this is supurflous v v v
                notePop()
            }
            saveCheck = false
        }, 2000)
    }else{

    }
})

notePop()