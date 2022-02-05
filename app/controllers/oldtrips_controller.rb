class OldtripsController < ApplicationController
   # skip_before_action :authorize, only: [:index, :create, :update ]

    def index
     trips=Oldtrip.all
     render json: trips
    end

    def create
   #  byebug
     trip= Oldtrip.new(oldtrip_params)
     trip[:user_id]=session[:user_id]
     trip.save;
     if trip.valid?
        render json: trip, status: :created
     else
        render json: {error: trip.errors.full_messages}, status: :unprocessable_entity
     end
    end


    def update
      # byebug
      trip = Oldtrip.find_by(id: params[:id])
      if trip
         trip.update(trip_params)
      if trip.valid?
         render json: trip, status: :ok
      else
         render json:{error: [trip.errors.full_messages]}, status: :unprocessable_entity
      end
      else
          render json: {error: ["Not found"]}, status: :not_found
      end
    end


  



    private

    def oldtrip_params
      # byebug
      params.permit(:title, :description, :rating, :comments, :image, :latitude, :longitude, :visitDate,:user_id  )
    end

    def trip_params
      params.permit(:title, :description, :rating, :comments, :image, :latitude, :longitude, :visitDate, :user_id, :id)
    end

end
