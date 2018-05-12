var gulp = require('gulp');
let path = {
  root: "../node_modules/",
  paths: {
    angular: {
      directory: ["angular/"],
      filesname: ["angular.min.js"]
    },
    angularMaterial: {
      directory: ["angular-material/"],
      filesname: ["angular-material.min.js", "angular-material.min.css"]
    },
    angularAnimate: {
      directory: ["angular-animate/"],
      filesname: ["angular-animate.min.js"]
    },
    angularAria: {
      directory: ["angular-aria/"],
      filesname: ["angular-aria.min.js"]
    },
    angularMessages: {
      directory: ["angular-messages/"],
      filesname: ["angular-messages.min.js"]
    }
  },
  getfilePaths: function () {
    let resultPath = [];
    for (var key in this.paths) {
      if (this.paths.hasOwnProperty(key)) {
        for (let i = this.paths[key].filesname.length; i-- > 0;) {
          resultPath.push(this.root + this.paths[key].directory + this.paths[key].filesname[i]);
        }
      }
    }
    return resultPath;
  }
}
gulp.task('get-angular-material', function () {
  let resultPath = path.getfilePaths();
  console.log("resultPath: ", resultPath);
  return gulp.src(resultPath).pipe(gulp.dest('../front/libs/angular/'))
});
gulp.task('default', ['get-angular-material']);
