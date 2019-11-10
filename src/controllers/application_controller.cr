require "./concerns/*"

abstract class ApplicationController < KemalController
  include Crecto::Repo

  module Repo
    extend Crecto::Repo

    config do |conf|
      conf.adapter = Crecto::Adapters::SQLite3
      conf.database = "./db/hutchison_animals.db"
    end
  end

  before_all do |env|
    env.response.content_type = "application/json"
  end
end
