$(function () {
    setwindow();

    $(".list").bind("click", function () {
        var tbtn = $(this); //��ǰ�ĵ���İ�ť
        var tid = tbtn.attr("id");
        var opt_mmenu = $(".opt-mmenu,.pop-query"); //����jquery����

        opt_mmenu.hide();
        opt_mmenu.each(function (i, d) {
            var tp = tbtn.position();

            var current = $(this);
            current.css({ "left": tp.left, "top": tp.top + tbtn.height() })

            if (current.attr("rel") == tid) {
                current.slideDown('fast').bind("click", function () {
                    if (current.attr('class').indexOf("pop-query") > 1) {
                        return false;
                    }
                    else {
                        current.hide();
                    }
                })

                $(document).one("click", function () {
                    opt_mmenu.hide();
                });
            }
        });
        return false; //��ֹð��
    });

    $("table tr th input[type=checkbox]").bind("click", function () {
        $("table tr input[type=checkbox]").attr("checked", $(this).attr("checked"));

        if ($(this).attr("checked")) {
            $("table tr").each(function () {
                if ($(this).attr("rel") == "item")
                    $(this).addClass("focus");
            });
        }
        else
            $("table tr").removeClass("focus");
    });

    $("table tr td input[type=checkbox]").bind("click", function () {
        if ($(this).attr("checked")) {
            $(this).parents("tr").addClass("focus");
        }
        else {
            $(this).parents("tr").removeClass("focus");
        }
    });

    $(".pop-box .close").click(function () {
        $(".pop-box").slideUp('fast');
        $("#frame_content").remove();
        $("#mask").hide();
    });

    $(".back").click(function () {
        var url = $(this).attr("rel")
        if (url)
            parent.go2(url);
    });
});

function setwindow() {
    var h = $(document).height() - $("#bottom").height();
    $("#contents").height(h);
    $("#main").height(h - 35);
}

  
$(window).resize(setwindow);

$(document).ajaxStart(function () { parent.$.jshowtip("\u6570\u636e\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019\u002e\u002e\u002e", "loading") });
$(document).ajaxError(function () { parent.$.jshowtip("\u7cfb\u7edf\u6b63\u5fd9\uff0c\u8bf7\u7a0d\u5019\u518d\u6267\u884c\u6b64\u64cd\u4f5c\uff01", "error") });



//��������¼� ��ֹ���˼���Backspace��������С������ı������  
function banBackSpace(e) {
    var ev = e || window.event; //��ȡevent����     
    var obj = ev.target || ev.srcElement; //��ȡ�¼�Դ     

    var t = obj.type || obj.getAttribute('type'); //��ȡ�¼�Դ����    

    //��ȡ��Ϊ�ж��������¼�����  
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //����nullֵ���  
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;

    //����Backspace��ʱ���¼�Դ����Ϊ������С������ı��ģ�  
    //����readonly����Ϊtrue��enabled����Ϊfalse�ģ����˸��ʧЧ  
    var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea")
                && (vReadOnly == true || vEnabled != true)) ? true : false;

    //����Backspace��ʱ���¼�Դ���ͷ�������С������ı��ģ����˸��ʧЧ  
    var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
                ? true : false;

    //�ж�  
    if (flag2) {
        return false;
    }
    if (flag1) {
        return false;
    }
}

//��ֹ���˼� ������Firefox��Opera  
document.onkeypress = banBackSpace;
//��ֹ���˼�  ������IE��Chrome  
document.onkeydown = banBackSpace;  