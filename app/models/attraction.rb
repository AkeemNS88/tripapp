class Attraction < ApplicationRecord
    has_many :newtrips
    has_many :adventures, through: :newtrips
   

end
