

(function(window,undefined){
    "use strict"
    window.MessageEventPubSub = {

        subscribers: {},
        msgDB: [],

        subscribe: function(id, listner, context) {

            this.subscribers[id] = {
                "callBack": listner,
                "context": context
            }

        },

        publish: function(id, name, data) {
            data = data || "";

            if (!this.subscribers[id] || !this.subscribers[id].callBack) {
                return;
            }
            var subscribers = this.subscribers,
                user;

            for (var i in subscribers) {
                if (subscribers.hasOwnProperty(i)) {
                    user = subscribers[i];
                    user["callBack"].call(user["context"], data, name, id);
                }
            }
            this.msgDB.push({
                "msg": data,
                "name": name,
                "id": id
            });

        },

        unsubscribe: function(id) {
            if (!this.subscribers[id]) {
                console.log("User not Subscribed");
                return;
            }
            delete this.subscribers[id];
        },

        retrivePreviousMsg: function(id) {
            var user = this.subscribers[id],
                msgDB = this.msgDB;
            for (var i in msgDB) {

                user["callBack"].call(user["context"], msgDB[i]["msg"], msgDB[i]["name"], msgDB[i]["id"]);

            }
        }
    };
})(window);