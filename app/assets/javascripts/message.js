$(function(){
  function buildHTML(message) {
     if (message.image) {
      var html =
        ` <div class="wrapper__chat-main__content__message" > 
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
        ` <div class="wrapper__chat-main__content__message" > 
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
});