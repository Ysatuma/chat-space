class MessagesController < ApplicationController
  def index
    
    @groups = Group.includes(:users).where(users: {id: current_user})
    @group = Group.find(params[:group_id])
  end
end
