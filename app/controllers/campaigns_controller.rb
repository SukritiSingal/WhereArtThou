class CampaignsController < ApplicationController
  before_action :set_campaign, only: [:show, :edit, :update, :destroy]
  
  # GET /campaigns
  # GET /campaigns.json
  def index
    @campaigns = Campaign.all
  end

  # GET /campaigns/1
  # GET /campaigns/1.json
  def show
    require 'date'
    diff = @campaign.lastdate - Date.today
    @time = diff.to_i
    @ideas = ::Idea.getCampaignIdeas(@campaign.id)
    @numideas = @ideas.count
  end

  def viewcampaigns
    @campaigns = Campaign.all
    @campaigns.each do |campaign|
      diff = campaign.lastdate - Date.today
      time = diff.to_i
      ideas = ::Idea.getCampaignIdeas(campaign.id)
      numideas = ideas.count
      campaign.numideas = numideas
      campaign.time = time
    end
  end 

  # GET /campaigns/new
  def new
    @campaign = Campaign.new
  end

  # GET /campaigns/1/edit
  def edit
  end

  def root 
  end

  def works
  end

  # POST /campaigns
  # POST /campaigns.json
  def create
    @campaign = Campaign.new(campaign_params)

    respond_to do |format|
      if @campaign.save
        format.html { redirect_to @campaign, notice: 'Campaign was successfully created.' }
        format.json { render :show, status: :created, location: @campaign }
      else
        format.html { render :new }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /campaigns/1
  # PATCH/PUT /campaigns/1.json
  def update
    respond_to do |format|
      if @campaign.update(campaign_params)
        format.html { redirect_to @campaign, notice: 'Campaign was successfully updated.' }
        format.json { render :show, status: :ok, location: @campaign }
      else
        format.html { render :edit }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  def about
  end 

  def business
  end 

  def howit
  end

  # DELETE /campaigns/1
  # DELETE /campaigns/1.json
  def destroy
    @campaign.destroy
    respond_to do |format|
      format.html { redirect_to campaigns_url, notice: 'Campaign was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def getCampaigns
    campaigns = Campaign.getCampaigns(listings_params[:city])
    render :json => { status: 1, campaigns: campaigns }
   end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = Campaign.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def campaign_params
      params.require(:campaign).permit(:name, :street, :city, :zipcode, :description, :promotion, :lastdate)
    end
end
