class MessagesController < ApplicationController
  before_action :move_to_login_menu
  before_action :set_group 

  def index
    @groups = Group.includes(:users).where(users: {id: current_user}) 
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
  
  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージを保存しました'
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end


  private

  def move_to_login_menu
    redirect_to new_user_session_path unless user_signed_in?
  end
  
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
