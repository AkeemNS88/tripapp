class NewtripsController < ApplicationController
     
    def index
        newtrips=Newtrip.all 
        render json:newtrips
    end

    def create   
        newtrip=Newtrip.new(newtrip_params)
        newtrip[:user_id]=session[:user_id]
        newtrip.save

        if newtrip.valid?
            render json: newtrip, status: :created
        else
            render json: {error: newtrip.errors.full_messages}
        end
    end

    def destroy
        newtrip=Newtrip.find_by(id: params[:id])
        if newtrip
            newtrip.destroy
            head :no_content
        else 
            render json: {error: ["Not found"]}, status: :not_found
        end
    end

    def count
        newtrips=Newtrip.all.count
        render json: newtrips
    end

    private

    def newtrip_params
        params.permit(:city, :date, :hotel)
    end

    
    

end
