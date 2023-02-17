class NewtripSerializer < ActiveModel::Serializer
  attributes :id, :city, :date, :hotel
  # has_many :adventures
  has_many :attractions, through: :adventures
end
