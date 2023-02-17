class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    
    def create
    #  byebug
    user=User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
        session[:user_id]=user.id
        render json: user, status: :created
    else
        render json: { errors: ["Invalid Credentials. Try again!"]}, status: :unauthorized
    end
   end



    def destroy
        # byebug
      session.delete :user_id
      head :no_content
    end

end
