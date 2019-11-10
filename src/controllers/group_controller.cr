class GroupController < ApplicationController
  # http --json GET http://locahost/animals/:id/groups --print Hhb
  get "/animals/:id/groups" do |env|
    id = env.params.url["id"]
    animal = Repo.get(Animal, id, Query.preload(:groups))
    if animal
      animal.groups.to_json
    else
      halt env, status_code: 404, response: "Resource not found with ID #{id}"
    end
  end
end
