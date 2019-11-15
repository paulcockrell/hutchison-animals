class EventsController < ApplicationController
  # http --json GET http://localhost/events_count -- print Hhb
  #
  # Index
  #
  get "/events_count" do |env|
    count = Repo.aggregate(Event, :count, :id).as(Int64)
    {model: Event.to_s, count: count}.to_json
  end

  # http --json GET http://localhost/events -- print Hhb
  #
  # Index
  #
  get "/events" do |env|
    limit = env.params.query["limit"]?
    query = if limit
      Query.limit(limit.to_i).order_by("created_at desc")
    else
      Query.where("1=1").order_by("created_at desc")
    end
    Repo.all(Event, query).to_json
  end

  get "/events/action_types" do |env|
    res = {} of String => String
    Event::Action.each do |member, value|
      res[value.to_s] = member.to_s
    end

    res.to_json
  end

  # http --json GET http://locahost/events/:id --print Hhb
  #
  # Show
  #
  get "/events/:id" do |env|
    event = Repo.get(Event, env.params.url["id"])
    if event
      record_event(event, Event::Action::VIEWED)
      event.to_json
    else
      halt env, status_code: 404, response: "Resource 'Event' not found"
    end
  end
end
