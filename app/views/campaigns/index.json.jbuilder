json.array!(@campaigns) do |campaign|
  json.extract! campaign, :id, :name, :street, :city, :zipcode, :description, :promotion
  json.url campaign_url(campaign, format: :json)
end
