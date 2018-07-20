const socket = io();

/**
 * sendCmdBtn_click
 */
function sendCmdBtn_click() {
    socket.emit('reqCmd', $('#cmdReq').val());
    $('#cmdResultView').append($('#cmdReq').val() + '\n');
    $('#cmdReq').text('');
};

/**
 * cmd_click
 * @param {*} cmd command
 * @param {*} syntax syntax
 */
function cmd_click(cmd, syntax) {   
    // let str = syntax.replace('&lt;', '<').replace('&gt;', '>');    
    console.log(syntax);    
    $('#command').text(`${cmd}`);
    $('#syntax').text(`${syntax}`);
    let str = syntax.replace('[<ctag>]', '123').replace('crlf', '');
    do {        
        let sp = str.indexOf('[');
        let ep = str.indexOf(']');
        if( sp > 0 && ep > 0) {
            str = str.substr(0, sp) + str.substr(ep+1);
        }        
    } while(str.indexOf('[') > 0 && str.indexOf(']') > 0);
    $('#cmdReq').val(str);
    // document.getElementById('syntax').innerHTML =
    // `${cmd}, Syntax: ${str}`;    
};

/**
 * clearRptBtn_click
 */
function clearRptBtn_click() {
    $('#reportView').text('');
};

/**
 * category change
 */
function category_change(e) {    
    console.log(e.value);
};

$('#cmdBox').on('submit', function(e) {
    console.log(e);
    socket.emit('reqCmd', $('#cmdReq').val());
    $('#cmdResultView').append($('#cmdReq').val() + '\n');
    $('#cmdReq').val('');
    e.preventDefault();
});
$('#cmdBox').on('clear', function(e) {
    $('#cmdResultView').clear();
});
$('#clearBtn').on('clear', function(e) {
    $('#reportView').clear();
});
socket.on('resCmd', function(msg) {
    $('#cmdResultView').append(msg + '\n');
    $('#cmdResultView').append('\n\n');
    $('#cmdResultView').scrollTop($('#cmdResultView')[0].scrollHeight);
});
socket.on('report', function(msg) {
    $('#reportView').append(msg + '\n');
    $('#reportView').append('\n\n');
    $('#reportView').scrollTop($('#reportView')[0].scrollHeight);
});


