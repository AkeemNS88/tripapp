class Newtrip < ApplicationRecord
  belongs_to :user
  has_many :adventures
  has_many :attractions, through: :adventures, dependent: :destroy
end
