require "crecto"

class Breed < Crecto::Model
  schema "breeds" do
    field :name, String
    belongs_to :group, Group
  end

  validates :name,
      presence: true,
      format: {pattern: /[a-zA-Z]*/},
      length: {min: 2, max: 50}

  unique_constraint :name
end
