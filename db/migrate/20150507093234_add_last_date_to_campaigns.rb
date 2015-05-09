class AddLastDateToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :lastdate, :date
  end
end
