var chatModule = chatModule || {};

chatModule.chatBox = (function(that) {
    "use strict"
    var id = 0,
    template = $("#template > li"),
    userClass = chatModule.createUsers.User,
    userMap = {};

    var createUser = function(name, id, chatBox) {

        var userObj = new userClass(name, id, chatBox);
        userObj.subscribeforMessage();
        userMap[id] = userObj;
        userObj.retrivePreviousMsg();
    }

    var createMsgBox = function(name) {
        var templateClone = template.clone(false),
            chatGroup = $(".chatGroup"),
            chatList = templateClone.find('.chatList'),
            userID = 'user_' + id;

        templateClone.find('.header > span').text(name);
        templateClone.find('.subscriberBtn').attr('data-id', userID);
        templateClone.find(".msgBoxInp").attr('data-id', userID);
        chatGroup.append(templateClone);

        createUser(name, userID, templateClone);
        id++;

    };

    var handleMessage = function() {
        var inpObj = $(this).siblings('.msgBoxInp'),
            msg = inpObj.val(),
            id = inpObj.attr('data-id'),
            userObj = userMap[id];

        if (msg && userObj) {
            userObj.publishMessage(msg);
            inpObj.val("");

        } else {
            return false;
        }
    };

    var toggleSubscrption = function() {
        var subscriberBtn = $(this),
            id = $(this).attr('data-id'),
            userObj = userMap[id],
            status = subscriberBtn.attr('data-value'),
            newStatus = (status === "Join") ? userObj.subscribeforMessage() : userObj.unsubscribefromMessage();

        subscriberBtn.attr('data-value', newStatus);
        subscriberBtn.text(newStatus);

    };

    (function() {
        var chatGroup = $(".chatGroup");

        chatGroup.on("click", ".msgBoxBtn", handleMessage);
        chatGroup.on("click", ".subscriberBtn", toggleSubscrption);
        chatGroup.on("keyup",".msgBoxInp",function(event){
            var key = event.which;
            if(key && key=="13"){
                $(".msgBoxBtn").trigger('click');
            }
        })

    })();


    return {
        createMsgBox: createMsgBox
    }

})();