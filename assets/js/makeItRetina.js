(function(a) {
    a.makeItRetina = function(b) {
        var d = {
            retinaSuffix: "_2x",
            checkExistenceBefore: true,
            checkifAlreadyRetina: true,
            retinaBackgrounds: true,
            retinaBackgroundsTags: "*",
            tryEavenforExternalImages: false,
            consoleDebugMessages: false,
            makeItRetinaAnyway: false
        };
        if (b) {
            a.extend(d, b)
        }
        var c = window.devicePixelRatio > 1 ? true: false;
        a.fn.changeWithRetina = function(g, f) {
            switch (f) {
            case"img":
                this.attr("src", g);
                break;
            case"background":
                this.css({
                    "background-image": "url(" + g + ")"
                });
                break
            }
        };
        a.fn.addSuffix = function(f, k) {
            var h = this;
            switch (k) {
            case"img":
                var e = h.attr("src");
                break;
            case"background":
                var e = h.css("background-image").replace("url(", "").replace(")", "").replace("'", "").replace('"', "").replace(/\"$/, "");
                break
            }
            var g = e;
            var j = e.split(".");
            if (f.checkifAlreadyRetina) {
                if (j[j.length - 2].indexOf(f.retinaSuffix) >= 0) {
                    if (f.consoleDebugMessages) {
                        console.log("The image " + e + " is already retina;")
                    }
                }
            }
            j[j.length - 1] = f.retinaSuffix + "." + j[j.length - 1];
            j[j.length - 2] = j[j.length - 2] + j[j.length - 1];
            j.splice(j.length - 1);
            e = j.join(".");
            if (f.checkExistenceBefore) {
                a.ajax({
                    url: e,
                    type: "HEAD",
                    async: true,
                    error: function() {
                        if (f.consoleDebugMessages) {
                            console.log("Can not load the image: " + g + ";")
                        }
                    },
                    success: function() {
                        h.changeWithRetina(e, k)
                    }
                })
            } else {
                h.changeWithRetina(e, k)
            }
        };
        a.fn.makeMeRetina = function(g, f) {
            switch (f) {
            case"img":
                var h = this.attr("src");
                break;
            case"background":
                var h = this.css("background-image").replace("url(", "").replace(")", "").replace("'", "").replace('"', "").replace(/\"$/, "");
                break
            }
            if (h.indexOf("http") >= 0) {
                if (h.indexOf(location.origin) >= 0) {
                    this.addSuffix(g, f)
                } else {
                    if (g.tryEavenforExternalImages) {
                        this.addSuffix(g, f)
                    }
                }
            } else {
                this.addSuffix(g, f)
            }
        };
        if (c || d.makeItRetinaAnyway == true) {
            a(window).load(function() {
                a("img").each(function(e) {
                    if (a(this).is(":visible")) {
                        a(this).css({
                            width: a(this).width(),
                            height: a(this).height()
                        })
                    } else {
                        $img2 = a(this).clone();
                        $img2.hide().appendTo("body");
                        a(this).css({
                            width: $img2.width(),
                            height: $img2.height()
                        });
                        $img2.remove()
                    }
                    var f = a(this).attr("src");
                    if (f != "none") {
                        a(this).makeMeRetina(d, "img")
                    }
                });
                if (d.retinaBackgrounds) {
                    a(d.retinaBackgroundsTags).each(function(f, h) {
                        var e = a(h).css("background-image");
                        var g = a(h).css("background-size");
                        if (e != "none" && e.indexOf("http") > 0) {
                            if (g == "auto" || g == "auto auto") {
                                var e = a(h).css("background-image").replace("url(", "").replace(")", "").replace("'", "").replace('"', "").replace(/\"$/, "");
                                var j = a("<img />");
                                j.hide().attr("src", e);
                                a("body").append(j);
                                j.bind("load", function() {
                                    a(this).attr("data-height", a(this).height());
                                    a(this).attr("data-width", a(this).width());
                                    var i = a(this).attr("data-width") + "px " + a(this).attr("data-height") + "px";
                                    a(h).css({
                                        "background-size": i
                                    }).makeMeRetina(d, "background");
                                    a(this).remove()
                                })
                            } else {
                                a(h).makeMeRetina(d, "background")
                            }
                        }
                    })
                }
            })
        }
    }
})(jQuery);

