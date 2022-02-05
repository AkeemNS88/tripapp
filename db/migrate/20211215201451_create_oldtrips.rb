class CreateOldtrips < ActiveRecord::Migration[6.1]
  def change
    create_table :oldtrips do |t|
      t.string :title
      t.string :description
      t.integer :rating
      t.string :comments
      t.string :image
      t.float :latitude 
      t.float :longitude
      t.string :visitDate
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
