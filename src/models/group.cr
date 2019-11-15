require "crecto"

class Group < Crecto::Model
  schema "groups" do
    field :name, String
    belongs_to :animal, Animal
    has_many :breeds, Breed
  end

  validates :name,
      presence: true,
      format: {pattern: /[a-zA-Z]*/},
      length: {min: 2, max: 50}

  unique_constraint :name
end

