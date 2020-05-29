$(function(){
  function  appendUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.nickname}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.nickname}">追加</div>
              </div>
              `
              console.log(html)
   $("#user-search-result").append(html);
  }

  function  appendnoUser(){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $("#user-search-result").append(html);
  }

  $(".chat-group-form__field").on("keyup", function(){
    var input = $("#user-search-field.chat-group-form__input").val();    //フォームの値を取得して変数に代入する

    $.ajax({
      type: 'GET',    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: { keyword: input }   //テキストフィールドに入力された文字を設定する
    })
    .done(function(users){

      $("#user-search-result").empty()
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user)  

        });
      }
      else{
        appendnoUser()
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  })



});