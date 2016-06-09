/*!
	Autosize 3.0.14
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);c=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),f="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(f)&&(f=0),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,c=t,u&&(e.style.overflowY=t),o()}function o(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+f;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",v=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;o();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==c&&n("visible"):"hidden"!==c&&n("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var d=void 0===arguments[1]?{}:arguments[1],s=d.setOverflowX,l=void 0===s?!0:s,a=d.setOverflowY,u=void 0===a?!0:a;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!r.has(e)){var f=null,c=null,v=e.clientWidth,p=function(){e.clientWidth!==v&&i()},h=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",i,!1),e.removeEventListener("keyup",i,!1),e.removeEventListener("autosize:destroy",h,!1),e.removeEventListener("autosize:update",i,!1),r["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",h,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",i,!1),e.addEventListener("autosize:update",i,!1),r.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(d=function(e){return e},d.destroy=function(e){return e},d.update=function(e){return e}):(d=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},d.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},d.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=d});
$(function () {

    $(document).on('submit', '.form1', function () {
            var form = $(this);
            var el = form.find('input[type="submit"]');

            var email_obj_list = $(this).closest('form').find('input[type="email"]');
            var email_obj=email_obj_list[0];
            var email=email_obj.value;

            var iframesrc="https://tross.typeform.com/to/vjmqmH?email="+email+"?iframe=true";
                

            $.ajax({
                url: form.attr('action'),
                data: $(this).serialize(),
                type: form.attr('method'),
                dataType: 'json',
                success: function (response) {

                    console.log(response);

                    if (response.success) {
                        el.fadeOut(function () {
                            setTimeout(function () {
                                el.next().fadeIn();
                            }, 100);
                        });
                        form[0].reset();
                        
                        fbq('track', 'Lead'); 
                        ga('send', 'event', 'Email', 'signup', 'supermeat');
                        $("#typeform").attr("src", iframesrc);
                        $("#typemodal").modal();

                        return true;

                    } else {
                        if (response.errors) {
                            $.each(response.errors, function (field, error) {
                                alert(error);
                            });
                        } else {
                            alert(response.message);
                        }
                        return false;
                    }
                },
                error: function (response) {
                    console.log(response);
                    alert('Error while submitting the form, please try again later');
                }
            });
            return false;
        })


        .on('click', '.form1 input[type="submit"]', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var email="";
            var email_obj_list = $(this).closest('form').find('input[type="email"]');
            var email_obj=email_obj_list[0];
            var email=email_obj.value;

            if(email=="")
            {
                alert("This field can not be blank");
                return;
            }else{
                $(this).closest('form').submit();
            }
            
        });

    autosize($('textarea'));
});

