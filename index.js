"use strict";

const fileSystem = require("fs");

const wlcomePage = fileSystem.readFileSync("./index.html");

const requestListener = (req, res) => {
  console.log(req);

  console.log(req.url);

  console.log(req.method);

  res.end("Hi :)");
};
const http = require("http");

const server = http.createServer((req, res) => {
  /////////////////GET////////////////////
  if (req.url === "/about" && req.method === "GET") {
    res.end("about :)");
  } else if (req.url === "/setting" && req.method === "GET") {
    res.end("setting :)");
  } else if (req.url === "/notifi" && req.method === "GET") {
    res.end("notifi :)");
  } else if (req.url === "/" && req.method === "GET") {
    res.end("home :)");
  } else if (req.url === "/welcome" && req.method === "GET") {
    res.end(wlcomePage);
  }

  /////////////////USERS////////////////////
  // 1- GetAllUsers
  else if (req.url === "/users" && req.method === "GET") {
    const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));
    res.end(JSON.stringify(users));
  }

  // 2- AddUser
  else if (req.url === "/add-user" && req.method === "POST") {
    req.on("data", (chunk) => {
      const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));

      users.push(JSON.parse(chunk));

      fileSystem.writeFileSync("./data/users.json", JSON.stringify(users));

      res.end(chunk);
    });
  }
  // Get all users sorted alphabetically by name
  else if (req.url === "/sorted-users" && req.method === "GET") {
    const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));

    res.end(JSON.stringify(users.sort((a, b) => a.name.localeCompare(b.name))));
  }

  //4- delete user
  else if (req.url === "/del-user" && req.method === "DELETE") {
    req.on("data", (chunk) => {
      const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));
      const delUser = JSON.parse(chunk);
      const newUsers = users.filter((user) => user.id !== delUser.id);
      fileSystem.writeFileSync("./data/users.json", JSON.stringify(newUsers));
      res.end(JSON.stringify(newUsers));
    });
  }
  //5- update user
  else if (req.url === "/up-user" && req.method === "PUT") {
    req.on("data", (chunk) => {
      const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));
      const upUser = JSON.parse(chunk);

      const newUsers = users.map((user) => {
        if (user.id === upUser.id) {
          user = upUser;
        }
        return user;
      });
      fileSystem.writeFileSync("./data/users.json", JSON.stringify(newUsers));
      res.end(JSON.stringify(newUsers));
    });
  }

  //6- search user by id
  else if (req.url.includes("users/") && req.method === "GET") {
    const users = JSON.parse(fileSystem.readFileSync("./data/users.json"));
    const [urlSegment] = req.url.split("/").reverse();
    const targetUser = urlSegment[0].toUpperCase() + urlSegment.slice(1);
    res.end(JSON.stringify(users.find((user) => user.id === +targetUser)));
  }

  //////////////////////// POSTS/////////////////////////////
  // 1- GetAllposts
  else if (req.url === "/posts" && req.method === "GET") {
    const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));
    res.end(JSON.stringify(posts));
  }

  // 2- AddPost
  else if (req.url === "/add-post" && req.method === "POST") {
    req.on("data", (chunk) => {
      const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));

      posts.push(JSON.parse(chunk));

      fileSystem.writeFileSync("./data/posts.json", JSON.stringify(posts));

      res.end(chunk);
    });
  }
  // Get all posts sorted alphabetically by name
  else if (req.url === "/sorted-posts" && req.method === "GET") {
    const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));

    // posts.sort();

    res.end(JSON.stringify(posts.sort((a, b) => a.id - b.id)));
  }

  //4- delete post
  else if (req.url === "/del-post" && req.method === "DELETE") {
    req.on("data", (chunk) => {
      const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));
      const delPost = JSON.parse(chunk);
      const newPosts = posts.filter((user) => user.id !== delPost.id);
      fileSystem.writeFileSync("./data/posts.json", JSON.stringify(newPosts));
      res.end(JSON.stringify(newPosts));
    });
  }
  //5- update post
  else if (req.url === "/up-post" && req.method === "PUT") {
    req.on("data", (chunk) => {
      const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));
      const upPost = JSON.parse(chunk);

      const newPosts = posts.map((post) => {
        if (post.id === upPost.id) {
          post = upPost;
        }
        return post;
      });
      fileSystem.writeFileSync("./data/posts.json", JSON.stringify(newPosts));
      res.end(JSON.stringify(newPosts));
    });
  }

  //6- search post by id
  else if (req.url.includes("posts/") && req.method === "GET") {
    const posts = JSON.parse(fileSystem.readFileSync("./data/posts.json"));
    const [urlSegment] = req.url.split("/").reverse();
    const targetUser = urlSegment[0].toUpperCase() + urlSegment.slice(1);
    res.end(JSON.stringify(posts.find((post) => post.id === +targetUser)));
  }
  //////////////////////////////////////////////////////
  else {
    res.end("not fount :)");
  }
});

server.listen(3000);
