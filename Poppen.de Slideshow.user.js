// ==UserScript==
// @name         Poppen.de Slideshow
// @namespace    https://github.com/Asta714/
// @include      http://www.poppen.de/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://malsup.github.io/jquery.cycle.js
// @version      0.1
// @description  Eine neue Slideshow für die Startseite
// @author       Asta714
// @match        http://www.poppen.de/
// @grant        none
// @run-at document-end
// ==/UserScript==
$(function() {
    var circling = jQuery('.circling-content:first');
    var urls = [];
    circling.each(function(){
        $(this).find('li').each(function(){
            // cache jquery var
            var current = $(this);
            // check if our current li has children (sub elements)
            // if it does, skip it
            if(current.children().size() > 0) {return true;}
            // add current text to our current urls
            urls.push(current.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'));
        });
    });
    var newhtml = '<div class="cycle-slideshow">';
    var i;
    for (i = 0; i < urls.length; ++i) {
        newhtml += "<img src='" + urls[i] + "'/>";
    }
    newhtml += '</div>';
    circling.replaceWith(newhtml);
    jQuery('.cycle-slideshow').cycle({ 
        fx:    'fade', 
        speed:  2500,
        timeout:  2000,
        slideResize:   1,
    });
});
