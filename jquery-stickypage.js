// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "stickypage",
                defaults = {
                width: "100%",
                height: "200px"
        };

        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                // jQuery has an extend method which merges the contents of two or
                // more objects, storing the result in the first object. The first object
                // is generally empty as we don't want to alter the default options for
                // future instances of the plugin
                this.settings = $.extend( {}, defaults, options );
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
        }

        Plugin.prototype = {
                init: function () {
                        // Place initialization logic here
                        // You already have access to the DOM element and
                        // the options via the instance, e.g. this.element
                        // and this.settings
                        // you can add more functions like the one below and
                        // call them like so: this.yourOtherFunction(this.element, this.settings).
                        $(this.element).css("height", this.settings.height); 
                        $(this.element).css("width", this.settings.width); 

                        var wrapper = $("<div class='sticky-wrapper'/>");
                        $(this.element).wrap(wrapper);
                        var p = $(this.element).parent('.sticky-wrapper');
                        p.append("<div class='sticky-page-scroller'><div class='sticky-page-scroller-content'/></div>"); 

                        this.reposition();
                        var it = this;
                        $(window).resize(function() {
                            it.reposition.call(it);
                        });
                        p.find(".sticky-page-scroller").scroll(function(e) {
                            var size = this.scrollWidth;
                            var pos = this.scrollLeft;
                            var r = 1 - pos/size;
                            var stickies = $(it.element).find("li");
                            stickies.each(function(i, s) {
                                var sr = i / stickies.length;
                                if(sr <= r) {
                                    $(s).fadeIn("fast");
                                } else {
                                    $(s).fadeOut("fast");
                                }
                            });
                        });
                },
                //bit of responsiveness..
                reposition: function () {
                        var it = this;
                        $(this.element).find("li").each(function(i, s) {
                            var $s = $(s);
                            if($s.data("pos")) {
                                var xy = $s.data("pos").split(",");
                                var x = xy[0]*it.element.clientWidth/100;
                                var y = xy[1]*it.element.clientHeight/100;
                                var r = xy[2];
                                $s.css("left", x+"px");
                                $s.css("top", y+"px");
                                $s.css("transform", "rotate("+r+") translate3d(0,0,0)");
                            }
                        })
                }
        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                return this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });
        };

})( jQuery, window, document );
