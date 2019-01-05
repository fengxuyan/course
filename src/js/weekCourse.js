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


//获取当前一周
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

/*点击 本周 事件*/
$('.this-week').on('click', function (e) {
    thisday=Date.now();
    var names = $('.weekDayNames th');
    for (var i = 1; i < names.length; i++) {
        names[i].innerText = getWeek(Date.now())[i - 1].substring(0, 3) + '(' + getWeek(Date.now())[i - 1].substring(8, 10) + '.' + getWeek(Date.now())[i - 1].substring(11, 13) + ')'
    }
})


/*点击 下一周 事件*/
$('.next-week').on('click', function (e) {
    thisday = thisday + 24 * 7 * 60 * 60 * 1000;
    var names = $('.weekDayNames th');
    for (var i = 1; i < names.length; i++) {
        names[i].innerText = getWeek(thisday)[i - 1].substring(0, 3) + '(' + getWeek(thisday)[i - 1].substring(8, 10) + '.' + getWeek(thisday)[i - 1].substring(11, 13) + ')'
    }
})




