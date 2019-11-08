# TODO: Write documentation for `Hutchison::Animals`
require "kemal"
require "sqlite3"
require "crecto"

require "./models/*"

require "./controllers/application_controller"
require "./controllers/*"

module Hutchison::Animals
  VERSION = "0.1.0"

  get "/" do |env|
    "Hello, World!"
  end

  Kemal.run
end
