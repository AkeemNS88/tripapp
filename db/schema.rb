# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_22_152755) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adventures", force: :cascade do |t|
    t.bigint "newtrip_id", null: false
    t.bigint "attraction_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attraction_id"], name: "index_adventures_on_attraction_id"
    t.index ["newtrip_id"], name: "index_adventures_on_newtrip_id"
  end

  create_table "attractions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "newtrips", force: :cascade do |t|
    t.string "city"
    t.string "date"
    t.string "hotel"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_newtrips_on_user_id"
  end

  create_table "oldtrips", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "rating"
    t.string "comments"
    t.string "image"
    t.float "latitude"
    t.float "longitude"
    t.string "visitDate"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_oldtrips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "adventures", "attractions"
  add_foreign_key "adventures", "newtrips"
  add_foreign_key "newtrips", "users"
  add_foreign_key "oldtrips", "users"
end
