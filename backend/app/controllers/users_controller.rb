class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
 
    
    def create 
        user = User.create(user_params)
        if user.valid?
            # NewUserEmailMailer.notify_user(user).deliver
            session[:user_id] = user.id
            render json: user, status: :created 
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
        end 
    end


    def show 
        user=User.find_by(id: session[:user_id])
        if user
           
            render json: user, status: :ok
        else 
            render json: {error: ["Not found"]}, status: :not_found
        end 
    end

    def my_trips
        user = User.find_by(id: session[:user_id])
        user_trip = user.oldtrips
        render json: user_trip   
    end

    def my_newtrips
        user = User.find_by(id: session[:user_id])
        user_trip = user.newtrips
        render json: user_trip   
    end

    def count
        user = User.find_by(id: session[:user_id])
        user_trip = user.oldtrips.count
        render json: user_trip
    end

    def newtripcount
        user = User.find_by(id: session[:user_id])
        user_trip = user.newtrips.count
        render json: user_trip
    end

    private 

    def user_params 
        params.permit(:full_name, :email, :password)
    end


end
