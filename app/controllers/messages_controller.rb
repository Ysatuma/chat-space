class MessagesController < ApplicationController
  before_action :set_group 
  before_action :set_groups   
  before_action :set_messages

  def index
    @message = Message.new
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
  
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_groups
    @groups = Group.includes(:users).where(users: {id: current_user}) 
  end 

  def set_messages
    @messages = @group.messages.includes(:user)
  end 
end
