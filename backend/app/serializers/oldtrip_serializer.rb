class OldtripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating, :comments, :image, :latitude, :longitude, :visitDate
 
end
