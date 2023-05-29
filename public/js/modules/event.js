export function Event() {
    this.handlers = [];
}

Event.prototype = {
    subscribe: function(fn)
    {
        // Add subscriber callback function pointer to handlers
        this.handlers.push(fn);
    },

    unsubscribe: function(fn)
    {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    raise: function(data, thisObj)
    {
        let scope = thisObj || window;
        this.handlers.forEach(function(handler) {
            handler.call(scope, data);
        })
    }
}