require "crecto"

class Event < Crecto::Model
  enum Action
    CREATED
    UPDATED
    DELETED
    VIEWED
  end

  schema "events" do
    field :object_id, Int64
    field :object_class, String
    enum_field :action, Action, column_name: "action_type", column_type: Int32
  end

  validates :object_id,
      presence: true

  validates :object_class,
      presence: true
end

