var chatModule = chatModule || {};
chatModule.createUsers = (function() {

    var User = function() {
        this.name = "";
        this.id = 0;
        this.chatList = null;
    }

    User.prototype.MessageArray = [];

    User.prototype.addMessage = function(msg) {
        var tempLi = $("<li></li>");
        tempLi.text(msg);
        this.chatList.append(tempLi);
    };
    return {
        User: User
    }

})();