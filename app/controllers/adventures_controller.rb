class AdventuresController < ApplicationController


    def index
        anventures=Adventure.all
        render json:anventures
    end

def create
    adventure=Adventure.create(adventure_params)
    if adventure.valid?
    render json: adventure
    else
    render json: {error:"not found"}
    end
end 

private

    def adventure_params
        params.permit(:newtrip_id, :attraction_id)
    end
end
