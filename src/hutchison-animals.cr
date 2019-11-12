# TODO: Write documentation for `Hutchison::Animals`
require "kemal"
require "sqlite3"
require "crecto"
require "dotenv"

require "./models/*"

require "./controllers/application_controller"
require "./controllers/*"

module Hutchison::Animals
  VERSION = "0.1.0"

  Dotenv.load

  get "/" do |env|
    env.response.content_type = "text/html"
    render "src/views/index.ecr"
  end

  get "/env" do |env|
    ENV["DB_PATH"]
  end

  Kemal.run
end
