class GroupsController < ApplicationController
  # http --json GET http://localhost/groups_count -- print Hhb
  #
  # Index
  #
  get "/groups_count" do |env|
    count = Repo.aggregate(Group, :count, :id).as(Int64)
    {model: Group.to_s, count: count}.to_json
  end

  # http --json GET http://locahost/animals/:id/groups --print Hhb
  #
  # Index
  #
  get "/animals/:id/groups" do |env|
    animal = Repo.get(Animal, env.params.url["id"], Query.preload(:groups))
    if animal
      animal.groups.to_json
    else
      halt env, status_code: 404, response: "Resource not found"
    end
  end

  # http --json GET http://locahost/animals/:id/groups/:group_id --print Hhb
  #
  # Show
  #
  get "/animals/:id/groups/:group_id" do |env|
    group = Repo.get(Group, env.params.url["group_id"], Query.where("animal_id = ?", env.params.url["id"]))
    if group
      group.to_json
    else
      halt env, status_code: 404, response: "Resource not found"
    end
  end

  # http --json POST http://localhost:3000/animals/:id/groups name="long haired" --print Hhb
  #
  # Create
  #
  post "/animals/:id/groups" do |env|
    animal = Repo.get(Animal, env.params.url["id"])
    unless animal
      halt env, status_code: 404, response: "Resource not found"
    end

    group = Group.new
    group.name = env.params.json["name"].as(String)
    group.animal = animal

    changeset = Repo.insert(group)
    if changeset.valid?
      group.to_json
    else
      changeset.errors.to_json
    end
  end

  # http --json PATCH http://localhost:3000/animals/:id/group/:group_id name=dog --print Hhb
  #
  # Updated
  #
  patch "/animals/:id/groups/:group_id" do |env|
    group = Repo.get(Group, env.params.url["group_id"], Query.where("animal_id = ?", env.params.url["id"]))
    unless group
      halt env, status_code: 404, response: "Resource not found"
    end

    group.name = env.params.json["name"].as(String)

    changeset = Repo.update(group)
    if changeset.valid?
      group.to_json
    else
      changeset.errors.to_json
    end
  end

  # http --json DELETE http://localhost:3000/animals/:id/groups/:group_id --print Hhb
  #
  # Delete
  #
  delete "/animals/:id/groups/:group_id" do |env|
    group = Repo.get(Group, env.params.url["group_id"], Query.where("animal_id = ?", env.params.url["id"]))
    unless group
      halt env, status_code: 404, response: "Resource not found"
    end

    changeset = Repo.delete(group)
    if changeset.valid?
      "Deleted"
    else
      changeset.errors.to_json
    end
  end
end
