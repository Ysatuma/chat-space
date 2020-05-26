class MessagesController < ApplicationController
  before_action :set_group    

  def index
    @groups = Group.includes(:users).where(users: {id: current_user}) 
    @messages = @group.messages
    @message = Message.new
  end
  
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path, notice: 'メッセージを保存しました'
    else
      render :index, notice: 'メッセージを入力してください'
    end
  end


  private
  
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
