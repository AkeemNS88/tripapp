class AttractionsController < ApplicationController

    def index
        attractions=Attraction.all
        render json: attractions
    end
    
    def create
        attraction = Attraction.find_or_create_by(attraction_params)
        if attraction.valid?
         render json: attraction
        else
          render json:{error:"Not found"}
        end
      end


      private 

      def attraction_params
         params.permit(:name)
      end

end
