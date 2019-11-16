class AnimalsController < ApplicationController
  PAGE_LIMIT = 10

  # http --json GET http://localhost/animals_count -- print Hhb
  #
  # Index
  #
  get "/animals_count" do |env|
    count = Repo.aggregate(Animal, :count, :id).as(Int64)
    {model: Animal.to_s, count: count}.to_json
  end

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
      record_event(animal, Event::Action::VIEWED)
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
      record_event(changeset.instance, Event::Action::CREATED)
      changeset.instance.to_json
    else
      halt env, status_code: 404, response: changeset.errors.to_json
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
      record_event(changeset.instance, Event::Action::UPDATED)
      changeset.instance.to_json
    else
      halt env, status_code: 404, response: changeset.errors.to_json
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
      record_event(changeset.instance, Event::Action::DELETED)
      {deleted: true}.to_json
    else 
      halt env, status_code: 404, response: changeset.errors.to_json
    end
  end
end
