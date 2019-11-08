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

  # http --json GET http://localhost/animals -- print Hhb
  get "/animals" do
    Repo.all(Animal).to_json
  end

  # http --json GET http://locahost/animals/1 --print Hhb
  get "/animals/:id" do |env|
    id = env.params.url["id"]
    animal = Repo.get(Animal, id)
    if animal
      animal.to_json
    else
      halt env, status_code: 404, response: "Resource not found with ID #{id}"
    end
  end

  # http --json POST http://localhost:3000/animals name=cat --print Hhb
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

  # http --json PATCH http://localhost:3000/animals/1 name=dog --print Hhb
  patch "/animals/:id" do |env|
    id = env.params.url["id"]
    animal = Repo.get(Animal, id)

    unless animal
      halt env, status_code: 404, response: "Resource not found with ID #{id}"
    end

    name = env.params.json["name"].as(String)
    animal.name = name
    changeset = Repo.update(animal)

    if changeset.valid?
      animal.to_json
    else
      changeset.errors.to_json
    end
  end

  # http --json DELETE http://localhost:3000/animals/1 --print Hhb
  delete "/animals/:id" do |env|
    id = env.params.url["id"]
    animal = Repo.get(Animal, id)

    unless animal
      halt env, status_code: 404, response: "Resource not found with ID #{id}"
    end

    changeset = Repo.delete(animal)

    if changeset.valid?
      "Deleted"
    else
      changeset.errors.to_json
    end
  end

  Kemal.run
end
