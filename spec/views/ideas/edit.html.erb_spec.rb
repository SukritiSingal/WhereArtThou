require 'rails_helper'

RSpec.describe "ideas/edit", type: :view do
  before(:each) do
    @idea = assign(:idea, Idea.create!(
      :name => "MyString",
      :description => "MyText",
      :upvotes => 1
    ))
  end

  it "renders the edit idea form" do
    render

    assert_select "form[action=?][method=?]", idea_path(@idea), "post" do

      assert_select "input#idea_name[name=?]", "idea[name]"

      assert_select "textarea#idea_description[name=?]", "idea[description]"

      assert_select "input#idea_upvotes[name=?]", "idea[upvotes]"
    end
  end
end
