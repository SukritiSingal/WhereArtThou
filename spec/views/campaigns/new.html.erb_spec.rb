require 'rails_helper'

RSpec.describe "campaigns/new", type: :view do
  before(:each) do
    assign(:campaign, Campaign.new(
      :name => "MyString",
      :street => "MyString",
      :city => "MyString",
      :zipcode => 1,
      :description => "MyText",
      :promotion => "MyText"
    ))
  end

  it "renders new campaign form" do
    render

    assert_select "form[action=?][method=?]", campaigns_path, "post" do

      assert_select "input#campaign_name[name=?]", "campaign[name]"

      assert_select "input#campaign_street[name=?]", "campaign[street]"

      assert_select "input#campaign_city[name=?]", "campaign[city]"

      assert_select "input#campaign_zipcode[name=?]", "campaign[zipcode]"

      assert_select "textarea#campaign_description[name=?]", "campaign[description]"

      assert_select "textarea#campaign_promotion[name=?]", "campaign[promotion]"
    end
  end
end
