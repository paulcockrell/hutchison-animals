require "logger"
require "kemal"
require "pg"
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
  Crecto::DbLogger.set_handler(STDOUT)

  # Website Index page
  #
  get "/" do |env|
    env.response.content_type = "text/html"
    render "src/views/index.ecr", "src/views/layouts/layout.ecr"
  end

  # Website Help page
  #
  get "/help" do |env|
    env.response.content_type = "text/html"
    render "src/views/help.ecr", "src/views/layouts/layout.ecr"
  end

  Kemal.run
end
