require "logger"
require "kemal"
require "sqlite3"
require "crecto"
require "dotenv"
require "callbacks"

require "./models/*"
require "./controllers/application_controller"
require "./controllers/*"

module Hutchison::Animals
  VERSION = "0.1.0"

  # Load environment variables
  #
  Dotenv.load

  # Setup database logging
  #
  file = File.open("log/database.log", "w")
  file.sync = true
  Crecto::DbLogger.set_handler(file)

  # Index
  #
  get "/" do |env|
    env.response.content_type = "text/html"
    render "src/views/index.ecr", "src/views/layouts/layout.ecr"
  end

  # Animals
  #
  get "/manage/animals" do |env|
    env.response.content_type = "text/html"
    render "src/views/manage_animals.ecr", "src/views/layouts/layout.ecr"
  end

  # Groups
  #
  get "/manage/animals/:id/groups" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    render "src/views/manage_groups.ecr", "src/views/layouts/layout.ecr"
  end

  # Breeds
  #
  get "/manage/animals/:id/groups/:group_id/breeds" do |env|
    env.response.content_type = "text/html"
    animal_id = env.params.url["id"]
    group_id = env.params.url["group_id"]
    render "src/views/manage_breeds.ecr", "src/views/layouts/layout.ecr"
  end

  Kemal.run
end
