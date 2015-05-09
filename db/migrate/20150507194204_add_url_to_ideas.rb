class AddUrlToIdeas < ActiveRecord::Migration
  def change
    add_column :ideas, :image_url, :text
  end
end
