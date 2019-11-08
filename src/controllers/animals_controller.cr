class AnimalsController < ApplicationController
  # http --json GET http://localhost/animals -- print Hhb
  #
  # Index
  #
  get "/animals" do |env|
    Repo.all(Animal).to_json
  end

  # http --json GET http://locahost/animals/:id --print Hhb
  #
  # Show
  #
  get "/animals/:id" do |env|
    animal = Repo.get(Animal, env.params.url["id"])
    if animal
      animal.to_json
    else
      halt env, status_code: 404, response: "Resource 'Animal' not found"
    end
  end

  # http --json POST http://localhost:3000/animals name=cat --print Hhb
  #
  # Create
  #
  post "/animals" do |env|
    animal = Animal.new
    animal.name = env.params.json["name"].as(String)

    changeset = Repo.insert(animal)
    if changeset.valid?
      animal.to_json
    else
      changeset.errors.to_json
    end
  end

  # http --json PATCH http://localhost:3000/animals/:id name=dog --print Hhb
  #
  # Update
  #
  patch "/animals/:id" do |env|
    animal = Repo.get(Animal, env.params.url["id"])
    unless animal
      halt env, status_code: 404, response: "Resource 'Animal' not found"
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

  # http --json DELETE http://localhost:3000/animals/:id --print Hhb
  #
  # Delete
  #
  delete "/animals/:id" do |env|
    animal = Repo.get(Animal, env.params.url["id"])
    unless animal
      halt env, status_code: 404, response: "Resource 'Animal' not found"
    end

    changeset = Repo.delete(animal)

    if changeset.valid?
      "Deleted"
    else
      changeset.errors.to_json
    end
  end
end
