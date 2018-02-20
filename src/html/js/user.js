/**
 * Personium
 * Copyright 2017 FUJITSU LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const TYPE = {
    INFO: 0,
    EVENT: 1
}

const SEX = {
    ALL: 0,
    MALE: 1,
    FEMALE: 2
}

const AGE = {
    ALL: 0,
    OVER_EIGHTY: 1,
    SEVENTY: 2,
    SIXTY: 3,
    UNDER_FIFTY: 4
}

const REPLY = {
    CONSIDER: 0,
    JOIN: 1
}

Object.freeze(TYPE);
Object.freeze(SEX);
Object.freeze(AGE);
Object.freeze(REPLY);

const APP_URL = "https://demo.personium.io/app-fst-community-user/";
const APP_BOX_NAME = 'io_personium_demo_app-fst-community-user';
const ORGANIZATION_CELL_URL = 'https://demo.personium.io/fst-community-organization/'

getEngineEndPoint = function () {
    return Common.getAppCellUrl() + "__/html/Engine/getAppAuthToken";
};

additionalCallback = function () {
    Common.setIdleTime();
    getArticleList('topEvent');
}

getNamesapces = function () {
    return ['common', 'glossary'];
};

var nowViewMenu = "top";

function view(menuId) {
    if(menuId == "monitoring"){
        $("a.header-text").addClass('collapsed');
        $("div.panel-collapse").removeClass('in');
    }
	$("#" + nowViewMenu).addClass('hidden');
	$("#" + menuId).removeClass('hidden');
    $("#" + menuId).localize();
	nowViewMenu = menuId;
	window.scrollTo(0, 0);
}


var helpAuthorized = false;

function openNfcReader() {
	helpAuthorized = false
    $('#modal-nfcReader').localize();
    $('#modal-nfcReader').modal('show');
}

function openPersonalInfo() {
    $('#modal-personalInfo').localize();
    $('#modal-personalInfo').modal('show');
}

function openPersonalInfo2() {
    $('#modal-personalInfo2').localize();
    $('#modal-personalInfo2').modal('show');
}

function openPersonalInfo3() {
    $('#modal-personalInfo3').localize();
    $('#modal-personalInfo3').modal('show');
}
function openClubHistory() {
    $('#modal-clubHistory').localize();
    $('#modal-clubHistory').modal('show');
}

function authorizedNfcReader() {
	helpAuthorized = true;
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	$('#modal-nfcReader').modal('hide');
}


function openHelpConfirm() {
    $('#modal-helpConfirm').localize();
    $('#modal-helpConfirm').modal('show');
}

function closeHelpConfirm(f) {
	if(f) {
		$(".endHelpOp").addClass('hidden');
		$(".startHelpOp").removeClass("hidden");
		$('header').css('background-color', '#008F00');
		$('h1').css('background-color', '#008F00');
		$('#during_help').addClass('hidden');
	}
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	$('#modal-helpConfirm').modal('hide');
}

function viewInfoDisclosureDetail(type){
    $("#modal-inforDisclosureHistory .title_text").attr("data-i18n", "profile." + type);
    $('#modal-inforDisclosureHistory').localize();
    $('#modal-inforDisclosureHistory').modal('show');
}
function openInforDisclosureHistoryPer(type) {
    $("#modal-inforDisclosureHistoryPer .title_text").html(type);
    $('#modal-inforDisclosureHistoryPer').localize();
    $('#modal-inforDisclosureHistoryPer').modal('show');
}

// load html
$(function() {
    $("#top").load("top.html");
    $("#monitoring").load("monitoring.html", function () {
        $("#myhealth").load("myhealth.html", function() {
            var topBtn = $('.scrollToTop');
            topBtn.hide();
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    topBtn.fadeIn();
                } else {
                    topBtn.fadeOut();
                }
            });
            topBtn.click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });

            // prevent the propagation of events to the parent element (prevent to open the accordion)
            $(".list-group-item .watching").on("click", function(e) {
                e.stopPropagation();
            });
        });
    });
    $("#profileEdit").load("profileEdit.html");
    $("#opHistory").load("opHistory.html");
    $("#helperOpHistory").load("helperOpHistory.html");
    $("#consentHistory").load("consentHistory.html");
    $("#viewHistory").load("viewHistory.html");
    $("#viewInforDisclosureHistory1").load("viewInforDisclosureHistory1.html", function(){
        $("#modal-inforDisclosureHistoryPer").load("modal-inforDisclosureHistoryPer.html");
    });
    $("#viewInforDisclosureHistory2").load("viewInforDisclosureHistory2.html", function(){
        $("#modal-inforDisclosureHistory").load("modal-inforDisclosureHistory.html");
    });
    $("#viewDataPortability").load("viewDataPortability.html");
    $("#viewDataExport").load("viewDataExport.html");
    $("#viewQRCode").load("viewQRCode.html");
    $("#articleDetail").load("articleDetail.html");
    $("#articleComment").load("articleComment.html", function(){
        $("#modal-comment").load("modal-comment.html");
    });
    $("#eventList").load("eventList.html");
    $("#infoList").load("infoList.html");
    $("#eventHistoryList").load("eventHistoryList.html");

    $("#modal-nfcReader").load("modal-nfcReader.html");
    $("#modal-helpConfirm").load("modal-helpConfirm.html");
    $("#modal-personalInfo").load("modal-personalInfo.html");
    $("#modal-personalInfo2").load("modal-personalInfo2.html");
    $("#modal-personalInfo3").load("modal-personalInfo3.html");
    $("#modal-startHelpOp").load("modal-startHelpOp.html");
    $("#modal-clubHistory").load("modal-clubHistory.html");

	$('#modal-nfcReader').on('hidden.bs.modal', function () {
		if(helpAuthorized) {
            $('#modal-startHelpOp').localize();
			$('#modal-startHelpOp').modal('show');

			$(".startHelpOp").addClass('hidden');
			$(".endHelpOp").removeClass("hidden");

			$('header').css('background-color', '#FF0000');
			$('h1').css('background-color', '#FF0000');

			$("#during_help").removeClass("hidden");
		}
	});
    $('#dvOverlay').on('click', function() {
        $(".overlay").removeClass('overlay-on');
        $(".slide-menu").removeClass('slide-on');
    });

    $("#profileBasic").collapse('hide');

});

function getArticleList(divId) {
    callArticleFunction(function (token){
        var base = 'https://demo.personium.io';
        var cell = 'fst-community-organization';
        var box = 'app-fst-community-user';
        var oData = 'test_article';
        var entityType = 'provide_information';

        $.ajax({
            // get current time on japan
            type: 'GET',
            url: 'https://ntp-b1.nict.go.jp/cgi-bin/json'
        }).done(function(res){
            $.ajax({
                type: "GET",
                url: base + '/' + cell + '/' + box + '/' + oData + '/' + entityType,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept" : "application/json"
                }
            }).done(function(data) {
                $('#' + divId).empty();
                var list = [];
                var results = data.d.results;
                for(result of results){
                    var dateTime = new Date(parseInt(result.__updated.substr(6)));
                    var date = dateTime.getFullYear() + '/' +
                    ('0' + (dateTime.getMonth() + 1)).slice(-2) + '/' +
                    ('0' + (dateTime.getDate())).slice(-2);

                    if (moment(result.end_date) < moment(res.st * 1000)) continue;

                    var div = '<div data-href="javascript:getArticleDetail(\'' + result.__id + '\')">';
                    div += '<div class="col-xs-4 col-md-2 block_img">'
                        + '<span id="' + result.__id +'" class="cover"></span>'
                        + '</div>';
                    div += '<div class="col-xs-8 col-md-4 block_description">'
                            + '<table class="stealth_table">'
                                + '<tr class="date"><td>' + (result.start_date||date) + '</td></tr>'
                                + '<tr class="title"><td>' + result.title + '</td></tr>'
                            + '</table>'
                        + '</div>';
                    div += '</div>';
                    list.push(div);
                    getArticleListImage(result.__id, token);
                }
                $('#' + divId).html(list.join(''));

                // Add a link to the table row
                $(function ($) {
                    $('div[data-href]').addClass('clickable').click(function () {
                        window.location = $(this).attr('data-href');
                    }).find('a').hover(function () {
                        $(this).parents('div').unbind('click');
                    }, function () {
                        $(this).parents('div').click(function () {
                            window.location = $(this).attr('data-href');
                        });
                    });
                });
            })
            .fail(function() {
                alert('failed to get article list');
            });
        });
    }, divId);
}

function getArticleListImage(id, token) {
    var base = 'https://demo.personium.io';
    var cell = 'fst-community-organization';
    var box = 'app-fst-community-user';
    var DAV = 'test_article_image';

    $.ajax({
        type: 'GET',
        url: base + '/' + cell + '/' + box + '/' + DAV + '/' + id,
        dataType: 'binary',
        processData: false,
        responseType: 'blob',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .done(function(res) {
        var reader = new FileReader();
        reader.onloadend = $.proxy(function (event) {
            var binary = '';
            var bytes = new Uint8Array(event.currentTarget.result);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            window.btoa(binary);
            image =  "data:image/jpg;base64," + btoa(binary);
            $('#' + id).css('background-image', 'url(\'' + image + '\')');
        }, this);
        reader.readAsArrayBuffer(res);
    })
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);
    });
}

function getArticleDetail(id) {

    callArticleFunction(function (token) {
        var base = 'https://demo.personium.io';
        var cell = 'fst-community-organization';
        var box = 'app-fst-community-user';
        var oData = 'test_article';
        var entityType = 'provide_information';
        var DAV = 'test_article_image';

        var err = [];

        $.when(
            // get text
            $.ajax({
                type: 'GET',
                url: base + '/' + cell + '/' + box + '/' + oData + '/' + entityType + "('" + id + "')",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                },
                success: function (res) {
                    return res;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    err.push(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);
                }
            }),

            // get image
            $.ajax({
                type: 'GET',
                url: base + '/' + cell + '/' + box + '/' + DAV + '/' + id,
                dataType: 'binary',
                processData: false,
                responseType: 'blob',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (res) {
                    return res;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    err.push(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);
                }
            }),

            // get reply info
            $.ajax({
                type: 'GET',
                url: base + '/' + cell + '/' + box + "/test_reply/reply_history",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                },
                data: {
                    "\$filter": "provide_id eq '" + id + "'"
                },
                success: function (res) {
                    return res;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    err.push(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);
                }
            })
        )
        .done(function (text, image, reply) {
            var article = text[0].d.results;

            if (article.type == TYPE.EVENT && article.start_date && article.end_date) {
                var term = article.start_date + ' ' + article.start_time + ' ~ ' + (article.end_date == article.start_date ? '' : article.end_date) + ' ' + article.end_time;
            }

            link = $('<a></a>').attr('href', article.url);
            link.text(article.url);

            var venue = article.venue ? '開催場所: ' + article.venue : '';
            $('#articleDetail .term')[0].style.display = venue ? '' : 'none';

            var img = $('<img>').attr('src', article.previewImg).addClass('thumbnail');

            $('#articleDetail .title').html(article.title);
            $('#articleDetail .url').html(link);
            $('#articleDetail .venue').html(venue);
            $('#articleDetail .date').html(term);
            $('#articleDetail .text').html(article.detail);

            var reader = new FileReader();
            reader.onloadend = $.proxy(function (event) {
                var binary = '';
                var bytes = new Uint8Array(event.currentTarget.result);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                window.btoa(binary);
                getImage = "data:image/jpg;base64," + btoa(binary);
                var img_src = $('<img>').attr('src', getImage).addClass('thumbnail');
                $('#articleDetail .img').html(img_src);
            }, this);
            reader.readAsArrayBuffer(image[0]);

            var replys = reply[0].d.results
            var join = 0, consider = 0;
            for(reply of replys) {
                switch(reply.entry_flag){
                    case REPLY.JOIN: join++; break;
                    case REPLY.CONSIDER: consider++; break;
                }
            }
            $('#joinNum').html(join);
            $('#considerNum').html(consider);

            // get reply information
            $.when(
                $.ajax({
                    type: 'GET',
                    url: Common.getCellUrl() + box + "/test_reply/reply_history",
                    headers: {
                        "Authorization": "Bearer " + Common.getToken(),
                        "Accept": "application/json"
                    },
                    data: {
                        "\$filter": "provide_id eq '" + article.__id + "'"
                    }
                }),
                $.ajax({
                    type: 'GET',
                    url: base + '/' + cell + '/' + box + "/test_reply/reply_history",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Accept": "application/json"
                    },
                    data: {
                        "\$filter": "provide_id eq '" + article.__id + "' and user_id eq '" + Common.getCellUrl() /* dummy ID */ + "'"
                    }
                })
            )
            .done(function(res1, res2) {
                var userCell = res1[0].d ? res1[0].d.results[0] : null;
                var orgCell = res2[0].d ? res2[0].d.results[0] : null;
                if (userCell && orgCell){
                    updateReplyLink(userCell.entry_flag, article.__id, userCell.__id, orgCell.__id);
                } else {
                    $('#joinEvent').attr('href', "javascript:replyEvent(" + REPLY.JOIN + ", '" + article.__id + "')");
                    $('#considerEvent').attr('href', "javascript:replyEvent(" + REPLY.CONSIDER + ", '" + article.__id + "')");
                }
            })
            .fail(function() {
                alert('error: get reply information');
            });

            view('articleDetail');

        })
        .fail(function () {
            alert('failed to get article detail\n\n' + err.join('\n'));
        });
    }, id);
}

function callArticleFunction(callback, id) {
    if (Common.getCellUrl() == ORGANIZATION_CELL_URL) {
        callback(Common.getToken(), id);
    } else {
        $.when(Common.getTranscellToken(ORGANIZATION_CELL_URL), Common.getAppAuthToken(ORGANIZATION_CELL_URL))
            .done(function (result1, result2) {
                let tempTCAT = result1[0].access_token; // Transcell Access Token
                let tempAAAT = result2[0].access_token; // App Authentication Access Token
                Common.perpareToCellInfo(ORGANIZATION_CELL_URL, tempTCAT, tempAAAT, function (cellUrl, boxUrl, token) {
                    callback(token, id);
                });
            })
            .fail(function () {
                alert('failed to get token');
            });
    }
}

/**
 *
 * @param reply REPLY.JOIN or REPLY.CONSIDER
 * @param articleId
 * @param userReplyId if id is exist, this func's role is the update
 * @param orgReplyId
 */
function replyEvent(reply, articleId, userReplyId, orgReplyId) {
    if(reply == null) {
        alert('already done it');
        return;
    }
    var box = 'app-fst-community-user';
    var oData = 'test_reply';
    var entityType = 'reply_history';

    callArticleFunction(function(token) {
        var err = [];
        var saveToUserCell = function(){
            var method = 'POST';
            var url = Common.getCellUrl() + box + '/' + oData + '/' + entityType;
            if(userReplyId) {
                method = 'PUT';
                url += "('" + userReplyId + "')";
            }

            return $.ajax({
                type: method,
                url: url,
                headers: {
                    "Authorization": "Bearer " + Common.getToken()
                },
                data: JSON.stringify({
                    // 'update_user_id'
                    'user_id': Common.getCellUrl(), // dummy ID
                    'provide_id': articleId,
                    'entry_flag': reply
                })
            })
            .then(
                function(res) {
                    return userReplyId || res;
                },
                function (XMLHttpRequest, textStatus, errorThrown) {
                    err.push(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);
                }
            )
        };

        var saveToOrganizationCell = function(res) {
            var base = 'https://demo.personium.io';
            var cell = 'fst-community-organization';
            var res = res.d ? res.d.results.__id : res;

            var method = 'POST';
            var url = base + '/' + cell + '/' + box + '/' + oData + '/' + entityType;
            if (orgReplyId) {
                method = 'PUT';
                url += "('" + orgReplyId + "')";
            }

            return $.ajax({
                type: method,
                url: url,
                headers: {
                    "Authorization": "Bearer " +  token
                },
                data: JSON.stringify({
                    // 'update_user_id'
                    'user_id': Common.getCellUrl(), // dummy ID
                    'provide_id': articleId,
                    'entry_flag': reply,
                    'user_reply_id': res
                })
            })
            .then(
                function (res) {
                    return res;
                },
                function (XMLHttpRequest, textStatus, errorThrown) {
                    err.push(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown);

                    // delete the reply on user cell
                    $.ajax({
                        type: 'DELETE',
                        url: Common.getCellUrl() + box + '/' + oData + '/' + entityType + "('" + res + "')",
                        headers: {
                            'Authorization': 'Bearer ' + Common.getToken()
                        }
                    })
                    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('delete failed');
                    })
                    .done(function() {
                        alert('delete done');
                    });

                    return Promise.reject();
                }
            )
        }

        saveToUserCell().then(saveToOrganizationCell)
        .fail(function(){
            alert('faild to send reply\n' + err.join('\n'));
        })
        .done(function(res) {
            var userId = userReplyId || res.d.results.user_reply_id;
            var orgId = orgReplyId || res.d.results.__id;
            alert('done');
            updateReplyLink(reply, articleId, userId, orgId);

            var join = $('#joinNum').html();
            var consider = $('#considerNum').html();
            if(reply == REPLY.JOIN) {
                join++;
                consider--;
            } else {
                join--;
                consider++;
            }
            $('#joinNum').html(join);
            $('#considerNum').html(consider);
        })
    }, userReplyId);
}


function updateReplyLink(reply, articleId, userReplyId, orgReplyId){
    var argJoin = '';
    var argConsider = '';
    switch (reply) {
        case REPLY.JOIN:
            argConsider += REPLY.CONSIDER + ",'" + articleId + "', '" + userReplyId + "', '" + orgReplyId + "'";
            break;

        case REPLY.CONSIDER:
            argJoin += REPLY.JOIN + ",'" + articleId + "', '" + userReplyId + "', '" + orgReplyId + "'";
            break;

        default:
            // data is not exist
            alert('error: read reply information');
            break;
    }
    $('#joinEvent').attr('href', "javascript:replyEvent(" + argJoin + ")");
    $('#considerEvent').attr('href', "javascript:replyEvent(" + argConsider + ")");
}
