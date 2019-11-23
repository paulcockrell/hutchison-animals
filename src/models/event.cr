require "crecto"

class Event < Crecto::Model
  enum Action
    CREATED
    UPDATED
    DELETED
    VIEWED
  end

  schema "events" do
    field :object_id, Int32
    field :object_class, String
    enum_field :action, Action, column_name: "action_type", column_type: Int32
  end

  validates :object_id,
      presence: true

  validates :object_class,
      presence: true

  def to_json(json : JSON::Builder)
    json.raw(self.to_hash.to_json)
  end

  def to_hash
    {
      "objectId": object_id,
      "objectClass": object_class,
      "actionType": action.to_s,
      "createdAt": created_at
    }
  end
end

