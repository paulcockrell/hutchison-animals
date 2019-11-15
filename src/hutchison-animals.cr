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

  # Web Application
  get "/" do |env|
    env.response.content_type = "text/html"
    render "src/views/index.ecr"
  end

  Kemal.run
end
