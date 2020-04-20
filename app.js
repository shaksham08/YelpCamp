const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;

var campgrounds = [
  {
    name: "Salmon Greek",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "mount california",
    image:
      "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Norway",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Salmon Greek",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "mount california",
    image:
      "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Norway",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Salmon Greek",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "mount california",
    image:
      "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Norway",
    image:
      "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds: campgrounds });
});

//* getting data from the form
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image,
  };
  campgrounds.push(newCampground);

  res.redirect("./campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log(`Server is runnning ${port}`);
});
