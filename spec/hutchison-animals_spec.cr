require "./spec_helper"

describe Hutchison::Animals do
  it "renders /" do
    get "/"
    response.body.should eq "Hello World!"
  end
end
