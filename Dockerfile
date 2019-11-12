FROM crystallang/crystal:0.31.1
WORKDIR /app

# install base dependencies
RUN apt-get update && apt-get install -y \
      libgconf-2-4 \
      curl \
      libreadline-dev \
      libssl-dev \
      libevent-dev \
      libevent-extra-2.0-5 \
      libevent-openssl-2.0-5 \
      libevent-pthreads-2.0-5 \
      libssl-dev \
      libsqlite3-dev \
      sqlite3 && \
      # Node dependency
      curl --silent --location https://deb.nodesource.com/setup_9.x | bash - && \
      apt-get install -y nodejs && \
      npm install -g yarn foreman nodemon && \
      rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /app
