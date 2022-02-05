class CreateNewtrips < ActiveRecord::Migration[6.1]
  def change
    create_table :newtrips do |t|
      t.string :city
      t.string :date
      t.string :hotel
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
