CREATE TABLE IF NOT EXISTS animals(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT name_unique UNIQUE (name)
);
CREATE UNIQUE INDEX IF NOT EXISTS animals_4ijlkjdf ON animals (id);

CREATE TABLE IF NOT EXISTS groups(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER references animals(id),
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT name_unique UNIQUE (name)
);
CREATE UNIQUE INDEX IF NOT EXISTS groups_df8sdd ON groups (id);

CREATE TABLE IF NOT EXISTS breeds(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER references groups(id),
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT name_unique UNIQUE (name)
);
CREATE UNIQUE INDEX IF NOT EXISTS breeds_sdf342ds ON breeds (id);

CREATE TABLE IF NOT EXISTS events(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  object_id INTEGER NOT NULL,
  object_class INTEGER NOT NULL,
  action_type INTEGER NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
CREATE UNIQUE INDEX IF NOT EXISTS events_sdfk3234 ON events (id);
