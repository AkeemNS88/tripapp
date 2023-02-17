class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :newtrip_id, :attraction_id
#  belongs_to :attraction
#  belongs_to :newtrip
end
