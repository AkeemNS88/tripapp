class User < ApplicationRecord
   
    has_many :oldtrips, dependent: :destroy
    has_many :newtrips
    
    
    validates :full_name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

    has_secure_password
end