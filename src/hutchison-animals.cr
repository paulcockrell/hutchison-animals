# TODO: Write documentation for `Hutchison::Animals`
require "kemal"

module Hutchison::Animals
  VERSION = "0.1.0"

  get "/" do
    "Hello, World"
  end

  Kemal.run
end
