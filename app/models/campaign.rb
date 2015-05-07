class Campaign < ActiveRecord::Base
	validates :name, :presence => true
  validates :street, :presence => true
 	validates :city, :presence => true
  validates :zipcode, :presence => true
  validates :description, :presence => true

  def self.createListing(params)
    campaign = Campaign.new(params)
    if campaign.save
       return campaign.id
    else
       errors = campaign.errors
       return -1 if errors[:name].any?
       return -2 if errors[:street].any?
       return -3 if errors[:city].any?
       return -4 if errors[:zipcode].any?
       return -5 if errors[:description].any?
       #Shouldn't reach here
       errors.each do |key, value|
          puts "#{key}:#{value}"
       end
    end
  end

  def self.getCampaigns(city)
    listings = Campaign.where("city = '#{city}'")
    return listings
  end

  def self.getCampaignDetails(id)
    campaign = Campaign.find(id)
    return campaign
 end

end
