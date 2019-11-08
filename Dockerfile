FROM crystallang/crystal:0.31.1
WORKDIR /app

# install base dependencies
RUN apt-get update && \
  apt-get install -y libgconf-2-4 curl libreadline-dev && \
  # postgres 11 installation
  curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
  echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" | tee /etc/apt/sources.list.d/postgres.list && \
  apt-get update && \
  apt-get install -y postgresql-11 && \
  # Node dependency
  curl --silent --location https://deb.nodesource.com/setup_9.x | bash - && \
  apt-get install -y nodejs && \
  npm install -g yarn nodemon && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


COPY . /app
