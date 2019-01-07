/**
 * Created by lenovo on 2019/1/5.
 */


//时间戳转换时间
function timedat(res) {   //res 为传入的时间戳   例：1509091800000

    var time = new Date(res);

    var y = time.getFullYear();

    var m = time.getMonth() + 1;

    var d = time.getDate();

    return y + '-' + m + '-' + d;    //返回格式  "2017-10-27" 字符串
};


//获取当前一周星期
thisday = (Date.now());
function getWeek(day) {
    const dateOfToday = day;
    const dayOfToday = (new Date(timedat(day)).getDay() + 7 - 1) % 7

    var week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const daysOfThisWeek = Array.from(new Array(7))
        .map((_, i) => {
            const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
            return week[i] + date.getFullYear() +
                '-' +
                String(date.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(date.getDate()).padStart(2, '0')
        })
    return daysOfThisWeek;
}

/*获取当前周时间*/

function getWeekDate(){
    thisday=Date.now();
    var names = $('.weekDayNames th');

    for (var i = 1; i < names.length; i++) {

        if(getWeek(Date.now())[i - 1] != undefined){
            names[i].innerText = getWeek(Date.now())[i - 1].substring(0, 3) + '(' + getWeek(Date.now())[i - 1].substring(8, 10) + '.' + getWeek(Date.now())[i - 1].substring(11, 13) + ')'

        }

    }
}


/*点击 本周 事件*/
$('.this-week').on('click', function (e) {
    getWeekDate()
})


/*点击 下一周 事件*/
$('.next-week').on('click', function (e) {
    thisday = thisday + 24 * 7 * 60 * 60 * 1000;
    var names = $('.weekDayNames th');
    for (var i = 1; i < names.length; i++) {
        if(getWeek(Date.now())[i - 1] != undefined) {
            names[i].innerText = getWeek(thisday)[i - 1].substring(0, 3) + '(' + getWeek(thisday)[i - 1].substring(8, 10) + '.' + getWeek(thisday)[i - 1].substring(11, 13) + ')'
        }
        }
})



/*下一步操作*/
$('.next').on('click', function (e) {


    var timelists = []

    $.each( $('.box tr') ,function(index,content) {
        var timeIdLists = $(this).attr("id");
        var begin=$($("#"+timeIdLists+" .chooseTime.chooseTimeBegin")[0]).val()
        var end=$($("#"+timeIdLists+" .chooseTime.chooseTimeEnd")[0]).val()

        timelists.push("begin="+begin+"end="+end)
    })

    console.log(timelists);



    $('.table-box-empty').remove()
    $('.table-box').show()
    getWeekDate()

})


/*删除操作*/

function deleteTr(){
    $('.delete-time').on('click', function (e) {
        $(this).parents("tr").remove()
        console.log("delete")
    })
}



/*结束时间是否大于开始时间*/
function checkTime(timeboxid,par){
    $("input[type='text']").on('change', function (e) {
        //do something;

        if (par.children('.chooseTimeEnd').val() <= par.children('.chooseTimeBegin').val()) {
            par.children('.sui-msg').remove();

            $('<div class="sui-msg msg-error"><div class="msg-con">开始时间不能大于或等于结束时间!</div><s class="msg-icon"></s></div>').insertAfter('#'+timeboxid+' .delete-time')
        } else {
            par.children('.sui-msg').remove();
        }
    });
}