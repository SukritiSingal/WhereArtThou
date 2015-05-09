class AddCampaignIdToIdeas < ActiveRecord::Migration
  def change
    add_column :ideas, :campaign_id, :integer
  end
end
