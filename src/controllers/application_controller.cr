require "./concerns/*"

abstract class ApplicationController
  include Crecto::Repo

  module Repo
    extend Crecto::Repo

    config do |conf|
      conf.adapter = Crecto::Adapters::SQLite3
      conf.database = ENV.fetch("DB_PATH") { "./db/hutchison_animals.db" }
    end
  end

  before_all do |env|
    env.response.content_type = "application/json"
  end

  def self.record_event(object, action)
    event = Event.new
    event.object_id = object.id.as(Int64)
    event.object_class = object.class.to_s
    event.action = action

    Repo.insert(event)
  end
end
