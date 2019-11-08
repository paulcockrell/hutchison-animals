# TODO: Write documentation for `Hutchison::Animals`
require "kemal"
require "sqlite3"
require "crecto"

module Repo
  extend Crecto::Repo

  config do |conf|
    conf.adapter = Crecto::Adapters::SQLite3
    conf.database = "./db/hutchison_animals.db"
  end
end

class Animal < Crecto::Model
  schema "animals" do
    field :name, String
  end

  validates :name,
      presence: true,
      format: {pattern: /[a-zA-Z]*/},
      length: {min: 2, max: 50}
end

module Hutchison::Animals
  VERSION = "0.1.0"

  get "/" do |env|
    "Hello, World"
  end

  get "/animals" do
    Repo.all(Animal).to_json
  end

  # http --json http://localhost:3000/animals name=cat --print Hhb
  post "/animals" do |env|
    name = env.params.json["name"].as(String)
    animal = Animal.new
    animal.name = name
    changeset = Repo.insert(animal)

    if changeset.valid?
      animal.to_json
    else
      changeset.errors.to_json
    end
  end

  patch "/animals/:id" do |env|
  end

  Kemal.run
end
