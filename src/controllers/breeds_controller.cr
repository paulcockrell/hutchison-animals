class BreedsController < ApplicationController

  # Website Breeds index page
  #
  get "/manage/animals/:id/groups/:group_id/breeds" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    group_id = env.params.url["group_id"]
    render "src/views/manage_breeds.ecr", "src/views/layouts/layout.ecr"
  end

  # Website Breeds show page
  #
  get "/manage/animals/:id/groups/:group_id/breeds/:breed_id" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    group_id = env.params.url["group_id"]
    breed_id = env.params.url["breed_id"]
    render "src/views/show_breed.ecr", "src/views/layouts/layout.ecr"
  end

  # API routes

  # http --json GET http://localhost/breeds_count -- print Hhb
  #
  # Index
  #
  get "/breeds_count" do |env|
    count = Repo.aggregate(Breed, :count, :id).as(Int64)
    {model: Breed.to_s, count: count}.to_json
  end

  # http --json GET http://locahost/animals/:id/groups/:group_id/breeds --print Hhb
  #
  # Index
  #
  get "/animals/:id/groups/:group_id/breeds" do |env|
    query = Query.preload(:breeds).where("groups.animal_id = ?", env.params.url["id"])
    group = Repo.get(Group, env.params.url["group_id"], query)
    if group
      group.breeds.to_json
    else
      halt env, status_code: 404, response: "Resource not found"
    end
  end

  # http --json GET http://locahost/animals/:id/groups/:group_id/breeds/:breed_id --print Hhb
  #
  # Show
  #
  get "/animals/:id/groups/:group_id/breeds/:breed_id" do |env|
    query = Query.join(:groups).where("groups.animal_id = ?", env.params.url["id"])
    breed = Repo.get(Breed, env.params.url["breed_id"], query)
    if breed
      record_event(breed, Event::Action::VIEWED)
      breed.to_json
    else
      halt env, status_code: 404, response: "Resource not found"
    end
  end

  # http --json POST http://localhost:3000/animals/:id/groups/group_id/breeds name="Norweigan" --print Hhb
  #
  # Create
  #
  post "/animals/:id/groups/:group_id/breeds" do |env|
    query = Query.where("animal_id = ?", env.params.url["id"])
    group = Repo.get(Group, env.params.url["group_id"], query)
    unless group
      halt env, status_code: 404, response: "Resource not found"
    end

    breed = Breed.new
    breed.name = env.params.json["name"].as(String)
    breed.group = group

    changeset = Repo.insert(breed)
    if changeset.valid?
      record_event(changeset.instance, Event::Action::CREATED)
      changeset.instance.to_json
    else
      halt env, status_code: 404, response: changeset.errors.to_json
    end
  end

  # http --json PATCH http://localhost:3000/animals/:id/group/:group_id/breeds/:breed_id name="Norweigan mountain cat" --print Hhb
  #
  # Updated
  #
  patch "/animals/:id/groups/:group_id/breeds/:breed_id" do |env|
    breed = Repo.get(Breed, env.params.url["breed_id"], Query.join(:groups).where("groups.animal_id = ?", env.params.url["id"]))
    unless breed
      halt env, status_code: 404, response: "Resource not found"
    end

    breed.name = env.params.json["name"].as(String)

    changeset = Repo.update(breed)
    if changeset.valid?
      record_event(changeset.instance, Event::Action::UPDATED)
      changeset.instance.to_json
    else
      changeset.errors.to_json
    end
  end

  # http --json DELETE http://localhost:3000/animals/:id/groups/:group_id/breeds/:breed_id --print Hhb
  #
  # Delete
  #
  delete "/animals/:id/groups/:group_id/breeds/:breed_id" do |env|
    breed = Repo.get(Breed, env.params.url["breed_id"], Query.join(:groups).where("groups.animal_id = ?", env.params.url["id"]))
    unless breed
      halt env, status_code: 404, response: "Resource not found"
    end

    changeset = Repo.delete(breed)
    if changeset.valid?
      record_event(changeset.instance, Event::Action::DELETED)
      {deleted: true}.to_json
    else
      changeset.errors.to_json
    end
  end
end
