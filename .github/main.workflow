workflow "Build and Deploy" {
  on = "push"
  resolves = ["Build Gatsby"]
}

action "Install" {
  uses = "actions/npm@6309cd9"
  runs = "ci"
}

action "Build Gatsby" {
  uses = "actions/npm@6309cd9"
  needs = ["Install"]
  runs = "build"
}
