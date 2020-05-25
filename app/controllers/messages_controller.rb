class MessagesController < ApplicationController
  def index
    # binding.pry
    @user = User.find(current_user.id)
  end
end
