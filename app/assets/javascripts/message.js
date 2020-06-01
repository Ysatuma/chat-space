$(function(){

  //最新の投稿メッセージのidを送信する
  var reloadMessages = function() {
    var last_message_id = $('.wrapper__chat-main__content__message:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages/",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.wrapper__chat-main__content').append(insertHTML);
        $('.wrapper__chat-main__content').animate({ scrollTop: $('.wrapper__chat-main__content')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };


  //新規投稿されたメッセージ用のHTMLを生成する
  function buildHTML(message) {
    
    if (message.image) {
      var html =
        ` <div class="wrapper__chat-main__content__message" data-message-id=${message.id}> 
            <div class="wrapper__chat-main__content__message__info">
              <div class="wrapper__chat-main__content__message__info__contributor">
                ${message.user_name}
              </div>
              <div class="wrapper__chat-main__content__message__info__timeline">
                ${message.createtime}
              </div>
            </div>
            <div class="wrapper__chat-main__content__message__text"> 
              ${message.content}
            </div>
            <div class="wrapper__chat-main__content__message__image">
              <img src=${message.image} >
            </div>
          </div>    ` 
      return html;
    } else{
      var html = 
        ` <div class="wrapper__chat-main__content__message" data-message-id=${message.id}> 
            <div class="wrapper__chat-main__content__message__info">
              <div class="wrapper__chat-main__content__message__info__contributor">
                ${message.user_name}
              </div>
              <div class="wrapper__chat-main__content__message__info__timeline">
                ${message.createtime}
              </div>
            </div>
            <div class="wrapper__chat-main__content__message__text"> 
              ${message.content}
            </div>
          </div>    ` 
      return html;
    }
  }

  //メッセージ投稿ボタンが押された時にメッセージ一覧を自動更新させる
  $('.wrapper__chat-main__message-form__content__form').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.wrapper__chat-main__content').append(html);
      $('.wrapper__chat-main__content').animate({ scrollTop: $('.wrapper__chat-main__content')[0].scrollHeight});
      $('.wrapper__chat-main__message-form__content__form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.wrapper__chat-main__message-form__content__form__send').prop('disabled', false);
    });
  })

  //定期的にreloadMessagesを呼び出す
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});