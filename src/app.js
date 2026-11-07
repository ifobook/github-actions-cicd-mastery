const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    application: "GitHub Actions CI/CD Mastery",
    version: "1.0.0",
    message: "Automated CI/CD pipeline is working"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "github-actions-cicd-mastery"
  });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Application running on port ${port}`);
  });
}

module.exports = app;
