var chatModule = chatModule || {};

chatModule.chatBox = (function(that) {

    var id = 0;
    template = $("#template").find('.chatBox'),
    userClass = chatModule.createUsers.User,
    userArray = [],
    msgDB = [];

    var retriveMsgs = function(userObj) {
        for (i in msgDB) {
            userObj.addMessage(msgDB[i]);
        }
    };

    var createUser = function(name, id, chatList) {

        var userObj = Object.create(userClass.prototype);
        userObj.name = name;
        userObj.id = id;
        userObj.chatList = chatList;
        userArray.push(userObj);
        retriveMsgs(userObj);

    };

    var createMsgBox = function(name) {
        var templateClone = template.clone(false),
            chatGroup = $(".chatGroup"),
            tempLi = $("<li></li>"),
            chatList = templateClone.find('.chatList'),
            userID = 'user_' + id;

        tempLi.data('name', name);
        tempLi.attr('id', userID);
        id++;

        templateClone.find('.header > span').text(name);
        templateClone.find(".msgBoxInp").attr('data-id', userID).attr('data-name', name);
        tempLi.append(templateClone);
        chatGroup.append(tempLi);

        createUser(name, userID, chatList);

    };

    var handleBroadcasting = function(msg, id, name) {
        var message = "";
        for (i in userArray) {
            if (userArray[i] && userArray[i].id && userArray[i].id === id) {
                message = "Me : " + msg;
            } else {
                message = name + " : " + msg;
            }
            userArray[i].addMessage(message);

        }
        msgDB.push(name + " : " + msg);
    };

    var broadCastMessage = function(event) {
        var inpObj = $(this).siblings('.msgBoxInp'),
            msg = inpObj.val(),
            id = inpObj.attr('data-id'),
            name = inpObj.attr('data-name');
        if (msg) {
            handleBroadcasting(msg, id, name);
            inpObj.val("");
        } else {
            return false;
        }

    };

    var bindEvents = function() {

        $(".chatGroup").on("click", ".msgBoxBtn", broadCastMessage);
        // $("document").on("messageRecived",);
    };

    bindEvents();

    return {
        createMsgBox: createMsgBox
    }

})();