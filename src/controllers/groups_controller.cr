class GroupsController < ApplicationController

  # Website Groups index page
  #
  get "/manage/animals/:id/groups" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    render "src/views/manage_groups.ecr", "src/views/layouts/layout.ecr"
  end

  # Website Groups show page
  #
  get "/manage/animals/:id/groups/:group_id" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    group_id = env.params.url["group_id"]
    render "src/views/show_group.ecr", "src/views/layouts/layout.ecr"
  end

  # API routes

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
      record_event(group, Event::Action::VIEWED)
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
      record_event(changeset.instance, Event::Action::CREATED)
      changeset.instance.to_json
    else
      halt env, status_code: 404, response: changeset.errors.to_json
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
      record_event(changeset.instance, Event::Action::UPDATED)
      changeset.instance.to_json
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
      record_event(changeset.instance, Event::Action::DELETED)
      {deleted: true}.to_json
    else
      changeset.errors.to_json
    end
  end
end
