class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :name
      t.text :description
      t.integer :upvotes

      t.timestamps null: false
    end
  end
end
