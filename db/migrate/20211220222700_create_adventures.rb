class CreateAdventures < ActiveRecord::Migration[6.1]
  def change
    create_table :adventures do |t|
      t.belongs_to :newtrip, null: false, foreign_key: true
      t.belongs_to :attraction, null: false, foreign_key: true

      t.timestamps
    end
  end
end
