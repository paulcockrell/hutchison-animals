class GroupController < ApplicationController
  BASE = "/animals/:animal_id/groups"

  @animal : Animal?

  #get BASE, &method(:index)
  #get BASE + "/:id", &method(:show)

  def index
    animal!.groups.to_json
  end

  def show
    "Show"
  end

  # http --json GET http://locahost/animals/:id/groups --print Hhb
  # get "/animals/:animal_id/groups" do |env|
  #   id = env.params.url["animal_id"]
  #   animal = Repo.get(Animal, id, Query.preload(:groups))
  #   if animal
  #     animal.groups.to_json
  #   else
  #     halt env, status_code: 404, response: "Resource not found with ID #{id}"
  #   end
  # end

  # http --json POST http://localhost:3000/animals/:animal_id/groups name="short haired" --print Hhb
  post "/animals/:animal_id/groups" do |env|
    id = env.params.url["animal_id"]
    animal = Repo.get(Animal, id)
    unless animal
      halt env, status_code: 404, response: "Resource not found with ID #{id}"
    end

    name = env.params.json["name"].as(String)
    group = Group.new
    group.animal = animal
    group.name = name
    changeset = Repo.insert(group)

    if changeset.valid?
      group.to_json
    else
      changeset.errors.to_json
    end
  end

  private def animal
    @animal ||= Repo.get(Animal, params.url["id"])
  end

  private def animal!
    animal.not_nil!
  end
end
