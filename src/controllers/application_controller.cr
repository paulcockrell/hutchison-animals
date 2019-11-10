require "./concerns/*"

abstract class ApplicationController
  include Crecto::Repo

  module Repo
    extend Crecto::Repo

    config do |conf|
      conf.adapter = Crecto::Adapters::SQLite3
      conf.database = "./db/hutchison_animals.db"
    end
  end
end
