class GoogleplacesController < ApplicationController
    skip_before_action :authorize, only: [:index]
   
    def index
   
    target="https://maps.googleapis.com/maps/api/place/textsearch/json?query=attraction&location=#{params[:lat]},#{params[:long]}&radius=8000&language=en&key=#{ENV["API_KEY"]}"
    # target="https://maps.googleapis.com/maps/api/place/textsearch/json?query=attraction&location=41.902782,12.496365&radius=2000&language=en&key=AIzaSyD_noLsHZQbJc7tAFC-u031AbdX4c3vGcs"
    render json:{
        # msg: {info: "plasess to visit"},
        data: JSON.parse(RestClient.get(target))
    }
    #  byebug
    end


end
