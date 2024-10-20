const biz9_config = require("./biz9_config");
const async=require("async");
const prompt=require('prompt-sync')();
const { exec } = require('child_process');
class Print {
    static show_header(title) {
        console.log('############');
        console.log(title);
        console.log('############');
    }
  static show_footer(title) {
      if(!title){
          title='';
      }
        console.log('############');
        console.log('END');
        console.log(new Date().toLocaleString());
        console.log('############');
    }
}
module.exports.framework_git_init = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Git Init');
            call();
        },
        function(call){
            exec('git init', (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            exec('git checkout -b ' + biz9_config.BRANCH,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            Print.show_footer();
            call();
        },
    ],
        function(err, result){
        });
};
module.exports.framework_git_commit = function () {
    let commit_note='';
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Git Commit');
            call();
        },
        function(call){
            commit_note = prompt('Enter Commit notes: ');
            call();
        },
      function(call){
            exec('git add -A .', (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            exec("git commit -m "+commit_note, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },

        function(call){
            exec('npm version patch', (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
       function(call){
            var pjson = require('./package.json');
           console.log('new version');
            console.log(pjson.version);
        },
        function(call){
        },
        function(call){
        },
        function(call){
            Print.show_footer();
            call();
        },
    ],
        function(err, result){
        });
    //git add -A .
    //git commit -m  "${commit_notes}"

};


module.exports.framework_info = function () {
    Print.show_header('BiZ9 Framework Info');
    console.log("Title: "+biz9_config.TITLE);
    console.log("Version: "+biz9_config.VERSION);
    console.log("Repo: "+biz9_config.REPO);
    console.log("Branch: "+biz9_config.BRANCH);
    Print.show_footer();
};
module.exports.framework_git_commit_cool = function () {
    console.log('framework_git_commit');
    /*
source ./.biz9_config.sh
echo "#################"
echo "BiZ9 App Git Commit"
echo "#################"
INCREMENT_VERSION ()
{
}
echo 'Enter notes:'
read commit_notes
APP_VERSION_NEW=$(INCREMENT_VERSION ${APP_VERSION});
#cms
echo "----------------------------------"
echo "Framework Product: ${FRAMEWORK_TITLE}"
echo "Framework Version: ${FRAMEWORK_VERSION}"
echo "GIT Branch: ${BIZ9_GIT_BRANCH}"
echo "GIT Repo: ${GIT_REPO}"
echo "Project-ID: ${PROJECT_ID}"
echo "App Title: ${APP_TITLE}"
echo "App-Title-ID: ${APP_TITLE_ID}"
echo "App Version: ${APP_VERSION_NEW}"
echo "Commit Notes: ${commit_notes}"
echo "Done!"
exit
*/
};
module.exports.framework_git_push = function () {
    console.log('framework_git_push');
    /*
echo "#################"
echo "BiZ9 App Git Push"
echo "#################"
echo "Are you sure you want to push?"
read n
read n
yes=$(echo $n | tr -s '[:upper:]' '[:lower:]')
if [ ! ${GIT_BRANCH} ]; then
   GIT_BRANCH=${BIZ9_GIT_BRANCH}
fi
if [[  "$n" = "yes"  ]] ; then
    ##
    git push -f ${GIT_REPO} ${GIT_BRANCH}
    else
    echo "exit"
fi
fi
echo "----------------------------------"
echo "Framework Product: ${FRAMEWORK_TITLE}"
echo "Framework Version: ${FRAMEWORK_VERSION}"
echo "GIT Branch: ${BIZ9_GIT_BRANCH}"
echo "GIT Repo: ${GIT_REPO}"
echo "Project-ID: ${PROJECT_ID}"
echo "App Title: ${APP_TITLE}"
echo "App-Title-ID: ${APP_TITLE_ID}"
echo "App Version: ${APP_VERSION}"
echo "Done!"
echo "----------------------------------"
exit
*/

};

