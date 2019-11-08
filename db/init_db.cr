require "sqlite3"

DB.open "sqlite3://./db/hutchison_animals.db" do |db|
  db.exec "CREATE TABLE IF NOT EXISTS animals (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
end
