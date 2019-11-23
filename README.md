# hutchison-animals

Hutchison Animals is a simple Animal management application.

It has a basic UI, built with ReactJS for users to manage their lists of Animals, groups and breeds.

The backend service is a simple Crystal application making use of the Kemal framework.

The data is persisted in a Postgres database.

## Prerequisits

Install `Docker` and `Docker compose`

## Development

Start the application within the docker container:

```
docker-compose up app
```

Now you can develop the files from your host machine and the app will
automatically recompile the server and view components.

To view the application visit:

```
http://localhost:3000
```

## For production

Visit

```
https://hutchison-animals.herokuapp.com/
```

## Usage

The Hutchison Animal Management System comes with a simple UI for managing the animal records. The site has a management tab in the menu bar which is where you go to perform the admin of your animal records.

Once you have click on Management, you will be presented with an 'animal' management interface. You must add an animal before you can administer the associated group and breed records.

Each animal, group and breed management pages follow the same design fo consitency. Where there is:
* Breadcrumb for navigation
* Form for adding/editing records
* Table showing you records, where you can edit, view, delete. Also if there is an association, you will be presented with an action button to view the associated records, for example Animal records will have a Group action button, taking you through to the groups.

Every time an action is taken (add, edit, delete and view) an event is recorded. This allows you to see the historical interactions with the site. This can be viewed on the home page and events page.

There is a basic help page giving the user guidance on how to use the site.

## What I haven't done but if time permitted would have done in a real life scenario

First of all, I would have used a more fully fledged framework, like (Lucky)[https://luckyframework.org/]. I chose not to do this, as I think (practically) anyone can make use of frameworks, and their generators to put in place all the required elements to complete this test with almost no knowledge of what is going on. I used a very basic framework called Kemal, where you are 'close to the metal' and must implement most functionality yourself, and has no generators or convensions.

Secondly, I absolutely would have written a lot of tests. This is paramamount for delivering reliable systems with confidence. Again I just don't have time with work and personal commitments to do this for this case.

Thirdly, there is no security present. For the user or the API request. I would have implemented Authentication and Authorisation, along with user management. The requests would have been protected with CORS.

Lastly, I would have implemented an import mechanism/feature. This would allow you to take the example JSON document and import it against a given Animal.

## Thanks

Thanks for giving me the opportunity to put something together for you.

## Contributors

- [Paul Cockrell](https://github.com/paulcockrell) - creator and maintainer
