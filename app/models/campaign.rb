class Campaign < ActiveRecord::Base
  has_many :ideas
  attr_accessor :numideas
  attr_accessor :time

	validates :name, :presence => true
    validates :street, :presence => true
   	validates :city, :presence => true
    validates :zipcode, :presence => true
    validates :description, :presence => true
    validates :lastdate, :presence => true

    def self.getCampaignDetails(id)
      campaign = Campaign.find(id)
      return campaign
   end
end
