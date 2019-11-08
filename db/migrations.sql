CREATE TABLE IF NOT EXISTS animals(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
CREATE UNIQUE INDEX animals_4ijlkjdf ON animals (id);

CREATE TABLE IF NOT EXISTS groups(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER references animals(id),
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
CREATE UNIQUE INDEX groups_df8sdd ON groups (id);

CREATE TABLE IF NOT EXISTS breeds(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  breed_id INTEGER references groups(id),
  name varchar(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
CREATE UNIQUE INDEX breeds_sdf342ds ON breeds (id);