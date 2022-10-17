const CONFIG = {
    titleWeb: "20-10-2022 for dear",
    introTitle: 'Hello Oanh, my darling ',
    introDesc: `Cuối cùng cũng đến ngày 20/10 rồi ha? Em có háo hức không vậy 😄. Hì hì, chúc mừng sinh nhật mẹ em nha 😊. Cháu chúc bác luôn mạnh khỏe, hạnh phúc và gặp nhiều may mắn trong cuộc sống ạ! Cháu iu con gái bác lắm 😆. Còn về em thì:`,
    btnIntro: 'Thì seo?',
    title: 'Chúc người yêu anh có một ngày 20/10 thật đáng nhớ với nhiều sự đáng yêu nhaaa 🥳',
    desc: 'Thấy iu Shiba không nào ♥️ ? ',
    btnYes: 'Rất nhìu',
    btnNo: 'Hên xui',
    question: 'Tại sao lại iu Shiba zậy',
    btnReply: 'Gửi cho Shiba',
    reply: 'Iu thì iu mà không iu thì vẫn iu. Iu Shiba lắmmm 😍',
    mess: 'anh cũng thế iu em nhìu nhìu 😉',
    messDesc: 'Mong điều này sẽ thêm xíu dịu dàng cho ngày 20-10 của em. Người yêu ơi, với anh, ảnh nào của em anh cũng thấy rất xinh nhưng xinh nhất là những ảnh em cười, nên mong em cười nhiều lên nhớ💜, và là những nụ cười thật lòng nha. Mong rằng em hãy tin tưởng Shiba, với năng lượng em đã mang tới cho anh, người yêu em sẽ cố gắng nhiều hơn nữa cho tương lai bọn mình! Mong thời gian tới em sẽ chiếu cố Shiba nhiều hơn ạ 🤗',
    btnAccept: 'Sau đây là một bài nhạc anh rất yêu thích, tiết lộ cho mình em đấy 😉 ',
    messLink: 'https://www.facebook.com/npquans/'
}

$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    document.getElementById('titleWeb').innerHTML = CONFIG.titleWeb
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)

    var xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
    var xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
    var y = 0.75 * $(window).height();
    $('#yes').css("left", xYes);
    $('#yes').css("top", y);

    $('#no').css("left", xNo);
    $('#no').css("top", y);
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/logi.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
    }).then(function() {
        $('.content').show(200);
    })
}

// switch button position
function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button position
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (Math.random() < 0.5 || n == 1)
        switchButton();
    else
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})