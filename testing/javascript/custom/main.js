$(document).ready(function() {
    $("#addBtn").on('click', function(event) {
        event.preventDefault();

        var userName = $("#name").val();

        if (userName) {
            chatModule.chatBox.createMsgBox(userName);
        } else {
            alert("Please enter your name");
        }

    });
    $("#name").on("keyup",function(event){
        var key = event.which;
        if(key && key=="13"){
            $("#addBtn").trigger('click');
        }
    })
});