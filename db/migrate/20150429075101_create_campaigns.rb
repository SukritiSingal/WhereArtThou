class CreateCampaigns < ActiveRecord::Migration
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :street
      t.string :city
      t.integer :zipcode
      t.text :description
      t.text :promotion

      t.timestamps null: false
    end
  end
end
