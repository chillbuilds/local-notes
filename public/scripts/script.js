function callTest() {

    $.ajax({
        url: `http://localhost:8080/test`,
        method: 'POST',
        // data: $('#text-input').val(),
        // data: 'balls',
        success: () => {
                console.log('post success')
             },
        error: () => {console.log('post failed')}
    })
}

$('#save').on('click', function() {
    callTest()
})