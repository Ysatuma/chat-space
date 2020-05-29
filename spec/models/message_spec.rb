require 'rails_helper'

describe Message do
  describe '#create' do
    context '投稿内容を保存できる場合' do    
      it "メッセージがあれば登録できる" do
       message = build(:message, image: "")
       expect(message).to be_valid
      end

      it "画像があれば登録できる" do
        message = build(:message, content: "")
        expect(message).to be_valid
      end

      it "メッセージと画像があれば登録できる" do
        message = build(:message)
        expect(message).to be_valid
      end   
    end 

    context '投稿内容を保存できない場合' do    
      it "メッセージも画像も無ければ登録できない" do
       message = build(:message,content: "", image: "")
       expect(message).not_to be_valid
      end

      it "group_idが無ければ登録できない" do
        message = build(:message, group_id: "")
        expect(message).not_to be_valid
      end

      it "user_idが無ければ登録できない" do
        message = build(:message, user_id: "")
        expect(message).not_to be_valid
      end   
    end 
  end

end
