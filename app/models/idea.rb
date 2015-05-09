class Idea < ActiveRecord::Base
  validates :name, :presence => true
  #validates :date_created, :presence => true
  validates :description, :presence => true
  #validates :upvotes, :presence => true

  #NEED IMAGE URL
  #validates :image_url, :presence => true

  #this is a upvoting gem
  #acts_as_votable

  belongs_to :campaign

  def self.getCampaignIdeas(campaignid)
      ideas = Idea.where("campaign_id = '#{campaignid}'")
      return ideas
  end

  def self.upvote_an_idea
    #if the thumbs up image is clicked
    #increaase the upvotes variable by 1

    #current_upvotes =
    #get current number of votes
    #increment by 1
    #save

=begin
    current_upvotes =
    total_upvote = @idea.upvotes + 1
    return tot
=end

  end

  def self.getNumVotes
    # get the number of votes an idea has
    return self.votes_for.size
  end
end