class GoogleplacesController < ApplicationController
    skip_before_action :authorize, only: [:index]
   
    def index
   
     target="https://maps.googleapis.com/maps/api/place/textsearch/json?query=attraction&location=#{params[:lat]},#{params[:long]}&radius=8000&language=en&key=AIzaSyCcVOkgVrDp21og29vYjbnkFk8Eh2Gu2eA"
     render json:{
        # msg: {info: "plasess to visit"},
        data: JSON.parse(RestClient.get(target))
    }
    #  byebug
    end


end
