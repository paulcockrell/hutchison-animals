require "crecto"

class Animal < Crecto::Model
  schema "animals" do
    field :name, String
    has_many :groups, Group
  end

  validates :name,
      presence: true,
      format: {pattern: /[a-zA-Z]*/},
      length: {min: 2, max: 50}

  unique_constraint :name
end
