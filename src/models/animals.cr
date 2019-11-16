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

  def to_json(json : JSON::Builder)
    json.raw(self.to_hash.to_json)
  end

  def to_hash
    {
      "id": id,
      "name": name,
      "createdAt": created_at,
      "updatedAt": updated_at
    }
  end
end
