window.onload = function () {
    /*存放全局数据*/
    function acitivity() {
        this.headerImg = "img/header.jpg"
        this.carTag = "<img src='img/car.png' class='car-img' id='carImg' style='opacity: 0'>"
        this.winH = document.body.clientHeight
        this.winW = document.body.clientWidth
    }

    /*阻止浏览器默认行为*/
    function preventDefault(e) {
        if (event.cancelable) {
            if (!event.defaultPrevented) {
                event.preventDefault()
            }
            event.stopPropagation()
        }
    }

    /*初始化页面*/
    acitivity.prototype.init = function () {
        this.start()
    }
    /*点击开始按钮*/
    acitivity.prototype.start = function () {
        var that = this
        $("#start").click(function (e) {
            e.preventDefault()
            $("#startHeader").css("backgroundImage", 'url(' + that.headerImg + ')').fadeIn(600)
            $("#startBtn").fadeOut(300)
            $("#titleText").animate({"margin-top": "-10rem"}, 600)
            window.setTimeout(function () {
                $("#titleText").hide()
                $("#contentText").fadeIn(300)
                $("#page3").append(that.carTag)
                $("#carImg").animate({"opacity": "1"}, 600)
                that.moveCar()
            }, 610)
        })
    }
    /*向右滑动小汽车*/
    acitivity.prototype.moveCar = function () {
        var that = this
        $("#carImg").on("touchstart", function (e) {
            e.preventDefault()
            var isMove = true, leftPOS = e.touches[0].clientX - $("#carImg").offset().left, moveUpFlag = false
            $(document).on("touchmove", function (e) {
                var marginLeft = e.touches[0].clientX - leftPOS,
                    marginRight = that.winW - e.touches[0].clientX
                if (marginLeft < 0 || marginRight <= 30) {
                    return
                }
                if (isMove) {
                    $("#carImg").css({"margin-left": marginLeft})
                }
                if (marginRight <= 40)
                    moveUpFlag = true
            })
            $(document).on("touchend", function (e) {
                e.preventDefault()
                isMove = false
                if (moveUpFlag) that.pageMoveUp(1)
            })
        })
    }
    /*页面向上翻转*/
    acitivity.prototype.pageMoveUp = function (moveUptimes) {
        $("#page3").animate({"margin-top": -(moveUptimes * this.winH)}, 600)
    }
    var acitivity = new acitivity()
    acitivity.init()
}
