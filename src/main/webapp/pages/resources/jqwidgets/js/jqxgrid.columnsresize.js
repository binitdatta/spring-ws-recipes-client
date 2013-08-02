/*
jQWidgets v2.7.0 (2013-Feb-08)
Copyright (c) 2011-2013 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxGrid.prototype,{autoresizecolumns:function(t){if(t!="cells"&&t!="all"&&t!="column"){t="all"}var u=this;var k=this.getrows();if(this.pageable){k=this.dataview.rows}var e=k.length;if(e==undefined&&k!=undefined){var o=new Array();a.each(k,function(i){o.push(this)});k=o;e=k.length}var q=a("<span></span>");q.addClass("jqx-grid-cell");a(document.body).append(q);var c=[];var f=[];var b=[];var l=u.host.width();if(u.vScrollBar[0].style.visibility!="hidden"){l-=this.scrollbarsize+5}if(l<0){l=0}for(var r=0;r<e;r++){var h=k[r];for(var p=0;p<this.columns.records.length;p++){var d=this.columns.records[p];if(d.hidden){continue}if(f[d.displayfield]==undefined){f[d.displayfield]=0}if(b[d.displayfield]==undefined){b[d.displayfield]=""}var n=h[d.displayfield];if(d.cellsformat!=""){if(a.jqx.dataFormat){if(a.jqx.dataFormat.isDate(n)){n=a.jqx.dataFormat.formatdate(n,d.cellsformat,this.gridlocalization)}else{if(a.jqx.dataFormat.isNumber(n)){n=a.jqx.dataFormat.formatnumber(n,d.cellsformat,this.gridlocalization)}}}}else{if(d.cellsrenderer){var m=d.cellsrenderer(r,d,n);if(m!=undefined){n=m.toString()}}}if(t==undefined||t=="cells"||t=="all"){if(n!=null){var c=n.toString().length;if(c>f[d.displayfield]){f[d.displayfield]=c;b[d.displayfield]=n}}}if(t=="column"||t=="all"){if(d.text.toString().length>f[d.displayfield]){b[d.displayfield]=d.text}}}}for(var p=0;p<this.columns.records.length;p++){var d=this.columns.records[p];if(b[d.displayfield]==undefined){b[d.displayfield]=d.text}q[0].innerHTML=b[d.displayfield];var s=q.outerWidth()+20;if(q.children().length>0){s=q.children().outerWidth()+20}if(a.jqx.browser.msie&&a.jqx.browser.version<8){s+=10}if(s>d.maxwidth){s=d.maxwidth}if(d._width!=undefined){d.__width=d._width}d._width=null;if(d.maxwidth=="auto"||s<=d.maxwidth){var g=d.width;d.width=s;if(d._percentagewidth!=undefined){d._percentagewidth=(d.width/l)*100}this._raiseEvent(14,{columntext:d.text,column:d.getcolumnproperties(),datafield:d.datafield,displayfield:d.displayfield,oldwidth:g,newwidth:s})}}q.remove();this._updatecolumnwidths();this._updatecellwidths();this._renderrows(this.virtualsizeinfo);for(var p=0;p<this.columns.records.length;p++){var d=this.columns.records[p];if(d.__width!=undefined){d._width=d.__width}}},autoresizecolumn:function(f,b){if(b!="cells"&&b!="all"&&b!="column"){b="all"}if(f==undefined){return false}var r=this.getrows();if(this.pageable){r=this.dataview.rows}var g=this.getcolumn(f);if(g==undefined){return false}var e=r.length;var m=a("<span></span>");m.addClass("jqx-grid-cell");a(document.body).append(m);var d=0;var l="";var k=this;var c=k.host.width();if(k.vScrollBar[0].style.visibility!="hidden"){c-=this.scrollbarsize+5}if(c<0){c=0}if(b==undefined||b=="cells"||b=="all"){for(var h=0;h<e;h++){var o=r[h][g.displayfield];if(g.cellsformat!=""){if(a.jqx.dataFormat){if(a.jqx.dataFormat.isDate(o)){o=a.jqx.dataFormat.formatdate(o,g.cellsformat,this.gridlocalization)}else{if(a.jqx.dataFormat.isNumber(o)){o=a.jqx.dataFormat.formatnumber(o,g.cellsformat,this.gridlocalization)}}}}else{if(g.cellsrenderer){var q=g.cellsrenderer(h,g,o);if(q!=undefined){o=q.toString()}}}if(o!=null){var p=o.toString().length;if(p>d){d=p;l=o}}}}if(b=="column"||b=="all"){if(g.text.toString().length>d){l=g.text}}if(l==undefined){l=g.text}m[0].innerHTML=l;var n=m.outerWidth()+10;if(a.jqx.browser.msie&&a.jqx.browser.version<8){n+=5}m.remove();if(n>g.maxwidth){n=g.maxwidth}if(g.maxwidth=="auto"||n<=g.maxwidth){var j=g.width;g.width=n;if(g._width!=undefined){g.__width=g._width}g._width=null;if(g._percentagewidth!=undefined){g._percentagewidth=(g.width/c)*100}this._updatecolumnwidths();this._updatecellwidths();this._raiseEvent(14,{columntext:g.text,column:g.getcolumnproperties(),datafield:f,displayfield:g.displayfield,oldwidth:j,newwidth:n});this._renderrows(this.virtualsizeinfo);if(g._width!=undefined){g._width=g.__width}}},_handlecolumnsresize:function(){var c=this;if(this.columnsresize){var b=false;if(c.isTouchDevice()){b=true}var g="mousemove.resize"+this.element.id;var d="mousedown.resize"+this.element.id;var h="mouseup.resize"+this.element.id;if(b){var g=a.jqx.mobile.getTouchEventName("touchmove")+".resize"+this.element.id;var d=a.jqx.mobile.getTouchEventName("touchstart")+".resize"+this.element.id;var h=a.jqx.mobile.getTouchEventName("touchend")+".resize"+this.element.id}this.removeHandler(a(document),g);this.addHandler(a(document),g,function(l){var m=a.data(document.body,"contextmenu"+c.element.id);if(m!=null){return true}if(c.resizablecolumn!=null&&!c.disabled&&c.resizing){if(c.resizeline!=null){var o=c.host.offset();var t=parseInt(c.resizestartline.offset().left);var j=t-c._startcolumnwidth;var u=c.resizablecolumn.column.minwidth;if(u=="auto"){u=0}else{u=parseInt(u)}var k=c.resizablecolumn.column.maxwidth;if(k=="auto"){k=0}else{k=parseInt(k)}var p=l.pageX;if(b){var r=c.getTouches(l);var q=r[0];p=q.pageX}j+=u;var s=k>0?t+k:0;var n=k==0?true:c._startcolumnwidth+p-t<k?true:false;if(c.rtl){var n=true}if(n){if(!c.rtl){if(p>=o.left&&p>=j&&p<=o.left+c.host.width()){if(s!=0&&l.pageX<s){c.resizeline.css("left",p)}else{if(s==0){c.resizeline.css("left",p)}}if(b){return false}}}else{if(p>=o.left&&p<=o.left+c.host.width()){c.resizeline.css("left",p);if(b){return false}}}}}}if(!b&&c.resizablecolumn!=null){return false}});this.removeHandler(a(document),d);this.addHandler(a(document),d,function(l){var k=a.data(document.body,"contextmenu"+c.element.id);if(k!=null){return true}if(c.resizablecolumn!=null&&!c.disabled){var j=c.resizablecolumn.columnelement;if(j.offset().top+j.height()+5<l.pageY){c.resizablecolumn=null;return}c._startcolumnwidth=c.resizablecolumn.column.width;c.resizablecolumn.column._width=null;a(document.body).addClass("jqx-disableselect");c._mouseDownResize=new Date();c.resizing=true;c._resizecolumn=c.resizablecolumn.column;c.resizeline=c.resizeline||a('<div style="position: absolute;"></div>');c.resizestartline=c.resizestartline||a('<div style="position: absolute;"></div>');c.resizebackground=c.resizebackground||a('<div style="position: absolute; left: 0; top: 0; background: #000;"></div>');c.resizebackground.css("opacity",0.01);c.resizebackground.css("cursor","col-resize");c.resizeline.css("cursor","col-resize");c.resizestartline.css("cursor","col-resize");c.resizeline.addClass(c.toThemeProperty("jqx-grid-column-resizeline"));c.resizestartline.addClass(c.toThemeProperty("jqx-grid-column-resizestartline"));a(document.body).append(c.resizeline);a(document.body).append(c.resizestartline);a(document.body).append(c.resizebackground);var m=c.resizablecolumn.columnelement.offset();c.resizebackground.css("left",c.host.offset().left);c.resizebackground.css("top",c.host.offset().top);c.resizebackground.width(c.host.width());c.resizebackground.height(c.host.height());c.resizebackground.css("z-index",999999999);var n=function(p){if(!c.rtl){p.css("left",parseInt(m.left)+c._startcolumnwidth)}else{p.css("left",parseInt(m.left))}var s=c._groupsheader();var r=s?c.groupsheader.height():0;var u=c.showtoolbar?c.toolbarheight:0;r+=u;var o=c.showstatusbar?c.statusbarheight:0;r+=o;var q=0;if(c.pageable){q=c.pagerheight}var t=c.hScrollBar.css("visibility")=="visible"?17:0;p.css("top",parseInt(m.top));p.css("z-index",9999999999);p.height(c.host.height()-q-r-t);if(c.enableanimations){p.show("fast")}else{p.show()}};n(c.resizeline);n(c.resizestartline);c.dragmousedown=null}});var e=function(){a(document.body).removeClass("jqx-disableselect");if(!c.resizing){return}c._mouseUpResize=new Date();var n=c._mouseUpResize-c._mouseDownResize;if(n<200){c.resizing=false;if(c._resizecolumn!=null&&c.resizeline!=null&&c.resizeline.css("display")=="block"){c._resizecolumn=null;c.resizeline.hide();c.resizestartline.hide();c.resizebackground.remove()}return}c.resizing=false;if(c.disabled){return}var l=c.host.width();if(c.vScrollBar[0].style.visibility!="hidden"){l-=20}if(l<0){l=0}if(c._resizecolumn!=null&&c.resizeline!=null&&c.resizeline.css("display")=="block"){var o=parseInt(c.resizeline.css("left"));var k=parseInt(c.resizestartline.css("left"));var j=c._startcolumnwidth+o-k;if(c.rtl){var j=c._startcolumnwidth-o+k}var m=c._resizecolumn.width;c._closemenu();c._resizecolumn.width=j;if(c._resizecolumn._percentagewidth!=undefined){c._resizecolumn._percentagewidth=(j/l)*100}c._updatecolumnwidths();c._updatecellwidths();c._raiseEvent(14,{columntext:c._resizecolumn.text,column:c._resizecolumn.getcolumnproperties(),datafield:c._resizecolumn.datafield,oldwidth:m,newwidth:j});c._renderrows(c.virtualsizeinfo);if(c.autosavestate){if(c.savestate){c.savestate()}}c._resizecolumn=null;c.resizeline.hide();c.resizestartline.hide();c.resizebackground.remove();c.resizablecolumn=null}else{c.resizablecolumn=null}};if(window.frameElement){if(document.referrer!=""||window.top!=null){var i="";if(window.parent&&document.referrer){i=document.referrer}if(i.indexOf(document.location.host)!=-1){var f=function(j){e()};if(window.top.document.addEventListener){window.top.document.addEventListener("mouseup",f,false)}else{if(window.top.document.attachEvent){window.top.document.attachEvent("onmouseup",f)}}}}}this.removeHandler(a(document),h);this.addHandler(a(document),h,function(k){var j=a.data(document.body,"contextmenu"+c.element.id);if(j!=null){return true}e()})}}})})(jQuery);