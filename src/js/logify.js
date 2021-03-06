/* global require, module */

var Logify = (function(global, undefined) {

    "use strict";

    var document = global.document, Logify;

    Logify = function() {

        var elLog;
        var transitionType;
        var transitionSupported = false;

        /**
         * Shorthand for document.getElementById()
         *
         * @param  {String} id    A specific element ID
         * @return {Object}       HTML element
         */
        function $(id) {
            return document.getElementById(id);
        }

        /**
         * Removes a Log Message
         *
         * @param  {String} el    The log element to remove
         * @return {undefined}
         */
        function removeLogElement(el) {
            if ("undefined" !== typeof elLog && el.parentNode === elLog) {
                elLog.removeChild(el);
            }
        }

        /**
         * Return the proper transitionend event
         * @return {String}    Transition type string
         */
        function getTransitionEvent() {

            if (! transitionType) {
                var el = document.createElement("fakeelement");
                var transitions = {
                    "WebkitTransition": "webkitTransitionEnd",
                    "MozTransition": "transitionend",
                    "OTransition": "otransitionend",
                    "transition": "transitionend"
                };

                for (var t in transitions) {
                    if (transitions.hasOwnProperty(t)) {
                        if (el.style[t] !== undefined) {
                            transitionType = transitions[t];
                            transitionSupported = true;
                            break;
                        }
                    }
                }
            }

            return {
                type: transitionType,
                supported: transitionSupported
            };

        }

        /**
         * Logify private object
         * @type {Object}
         */
        var _logify = {

            /**
             * Labels object
             * @type {Object}
             */
            defaultMaxLogItems: 3,

            maxLogItems: this.defaultMaxLogItems,

            /**
             * Delay number
             * @type {Number}
             */
            delay: 5000,
            defaultDelay: 5000,

            /**
             * Set the transition event on load
             * @type {[type]}
             */
            transition: undefined,

            closeLogOnClick: false,

            closeLogOnClickDefault: false,

            setCloseLogOnClick: function(bool) {
                this.closeLogOnClick = !! bool;
            },

            /**
             * Close the log messages
             *
             * @param  {Object} elem    HTML Element of log message to close
             * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
             *
             * @return {undefined}
             */
            close: function(elem, wait) {

                // Unary Plus: +"2" === 2
                var timer = (wait && !isNaN(wait)) ? +wait : this.delay;
                var self = this;
                var hideElement;
                var transitionDone;

                // set click event on log messages
                if (this.closeLogOnClick) {
                  elem.addEventListener("click", function() {
                      hideElement(elem);
                  });
                }

                // Hide the dialog box after transition
                // This ensure it doens't block any element from being clicked
                transitionDone = function(event) {
                    event.stopPropagation();
                    // unbind event so function only gets called once
                    this.removeEventListener(self.transition.type, transitionDone);
                    removeLogElement(this);
                };

                // this sets the hide class to transition out
                // or removes the child if css transitions aren't supported
                hideElement = function(el) {

                    var time = 1;

                    if (typeof el !== "undefined" && el.parentNode === elLog) {

                        // whether CSS transition exists
                        if (self.transition.supported) {
                            el.addEventListener(self.transition.type, transitionDone);
                            el.className += " logify-log-hide";
                            time = 500;
                        }

                        setTimeout(function () {
                            removeLogElement(el);
                        }, time || 1);

                    }
                };
                // never close (until click) if wait is set to 0
                if (wait === 0) {
                    return;
                }
                // set timeout to auto close the log message
                setTimeout(function() {
                    hideElement(elem);
                }, timer);

            },

            /**
             * Initialize Logify
             * Create the 2 main elements
             *
             * @return {undefined}
             */
            init: function() {

                if ($("logify-logs") === null) {
                    elLog = document.createElement("div");
                    elLog.setAttribute("id", "logify-logs");
                    elLog.className = "logify-logs";
                    document.body.appendChild(elLog);
                }

                // set transition type
                this.transition = getTransitionEvent();

            },

            /**
             * Show a new log message box
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Optional type of log message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
             *
             * @return {Object}
             */
            log: function(message, type, click) {

                this.init();
                elLog.className = "logify-logs";

                var diff = elLog.childNodes.length - this.maxLogItems;
                if(diff >= 0) {
                  for (var i = 0, _i = diff + 1; i < _i; i++) {
                    this.close(elLog.childNodes[i], 1);
                  }
                }

                this.notify(message, type, click);

            },
            
            content: function(content) {
                if(elLog.childNodes.length==0) return;
                if(typeof content === "undefined"){
                    return elLog.childNodes[elLog.childNodes.length-1].innerHTML;
                }
                elLog.childNodes[elLog.childNodes.length-1].innerHTML = content;
            },

            /**
             * Add new log message
             * If a type is passed, a class name "logify-log-{type}" will get added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Type of log message
             * @param  {Function} click    [Optional] Callback for Click event handler
             *
             * @return {undefined}
             */
            notify: function(message, type, click) {

                var log = document.createElement("div");
                log.className = "logify-log logify-log-" + (type || "default");
                log.innerHTML = message;

                // Add the click handler, if specified.
                if ("function" === typeof click) {
                    log.addEventListener("click", click);
                }

                elLog.appendChild(log);
                setTimeout(function() {
                    log.className += " logify-log-show";
                }, 50);

                this.close(log, this.delay);

            },

            setDelay: function(time) {
              var dur = parseInt(time || 0, 10);
              this.delay = isNaN(dur) ? this.defultDelay : time;
              return this;
            },

            setMaxLogItems: function(num) {
              this.maxLogItems = parseInt(num || this.defaultMaxLogItems);
            },

            reset: function() {
              this.setMaxLogItems();
              this.delay = this.defaultDelay;
              this.setCloseLogOnClick(this.closeLogOnClickDefault);
            }
        };

        return {
            //Should belong to Logify Global:
            reset: function() {
                _logify.reset();
                return this;
            },
            maxLogItems: function(num) {
                _logify.setMaxLogItems(num);
                return this;
            },

            //Should return a Log Object
            log: function(message, click) {
                _logify.log(message, "default", click);
                return this;
            },
            success: function(message, click) {
                _logify.log(message, "success", click);
                return this;
            },
            warning: function(message, click) {
                _logify.log(message, "warning", click);
                return this;
            },
            error: function(message, click) {
                _logify.log(message, "error", click);
                return this;
            },
            
            //Should set default when called on Logify Global, set for instance on Logs
            closeLogOnClick: function(bool) {
                _logify.setCloseLogOnClick(!! bool);
                return this;
            },
            delay: function(time) {
                _logify.setDelay(time);
                return this;
            },

            //Should belong exclusively to Log Objects
            hide: function(){},
            show: function(){},
            destroy: function(){},
            content: function(content){
                var ret = _logify.content(content);
                if(typeof content === "undefined"){
                    return ret;
                }
                return this;
            }
        };
    };

    // AMD, window, and NPM support
    if ("undefined" !== typeof module && !! module && !! module.exports) {
        module.exports = Logify;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return new Logify();
        });
    } else {
        global.logify = new Logify();
    }

}(typeof window !== "undefined" ? window : {}));
