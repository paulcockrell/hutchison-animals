require "./concerns/*"

abstract class ApplicationController
  include Crecto::Repo

  module Repo
    extend Crecto::Repo

    config do |conf|
      conf.adapter = Crecto::Adapters::Postgres
      conf.uri = ENV.fetch("DATABASE_URL")
    end
  end

  before_all do |env|
    env.response.content_type = "application/json"
  end

  def self.record_event(object, action)
    event = Event.new
    event.object_id = object.id.as(Int32)
    event.object_class = object.class.to_s
    event.action = action

    Repo.insert(event)
  end
end
