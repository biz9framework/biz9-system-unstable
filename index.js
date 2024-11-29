const biz9_config = require("./biz9_config");
const package = require("./package.json");
const async=require("async");
//const prompt=require("prompt-sync");
const prompt = require('prompt-sync')();
const fs = require("fs");
const { exec } = require('child_process');
class Print {
    static show_header(title) {
        console.log('############');
        console.log(title);
        console.log('############');
    }
    static show_sub_header(title) {
        console.log('------------');
        console.log(title);
        console.log('---');
    }
    static show_sub_footer() {
        console.log('---');
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
    static show_git_info() {
        const biz9_config = require("./biz9_config");
        Print.show_sub_header('Git Info');
        console.log("Version: "+biz9_config.VERSION);
        console.log("Repo: "+biz9_config.REPO);
        console.log("Branch: "+biz9_config.BRANCH);
        Print.show_sub_footer();
    }
}
module.exports.framework_branch_update_old = function () {
    let source_branch='';
    let destination_branch='';
    let create_cache_dir=false;
    let create_biz9_dir=false;
    const package = require('./package.json');
    function get_branch(branch){
        switch(branch)
        {
            case '1':
                return 'unstable';
                break;
            case '2':
                return 'testing';
                break;
            case '3':
                return 'stable';
                break;
        }
    }
    async.series([
        function(call){
            console.log('111111111');
            source_branch='unstable';
            destination_branch='stable';
            Print.show_header('BiZ9 Framework Branch Update');
            call();
        },
        /*
        function(call){
            _source_branch=prompt('Enter Source Branch (1=unstable 2=testing 3=stable):');
            source_branch=get_branch(_source_branch);
            call();
        },
        function(call){
            _destination_branch=prompt('Enter Destination Branch (1=unstable 2=testing 3=stable):');
            destination_branch=get_branch(_destination_branch);
            call();
        },
        */
        function(call){
            let path='~/.cache';
            let path_mk='mkdir ~/.cache';
            console.log('aaaaaaaaaa');
            if (fs.existsSync(path)) {
                exec(path_mk,(error,stdout,stderr)=>{
                    if (error) {
                        console.log(error);
                        call();
                    }
                    console.log(stdout);
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            let path='~/.cache/biz9-system';
            let path_mk='mkdir ~/.cache/biz9-system';
            if (fs.existsSync(path)){
                exec(path_mk,(error,stdout,stderr)=>{
                    if (error) {
                        console.log(error);
                        call();
                    }
                    console.log(stdout);
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            str = "cp -rf "+destination_branch+"/biz9_config.js ~/.cache/biz9-system/";
            str_2 = "rm -rf "+destination_branch + "/*";
            str_3 = "cp -rf "+source_branch + "/* "+ destination_branch +"/";
            console.log('copy me');
            console.log(str);
            console.log(str_2);
            console.log(str_3);
            //exec("find ../"+destination_branch+"/* \! -name --force'biz9_config.js' -delete", (error, stdout, stderr) => {
            /*
            exec(str, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
            */
        },
        /*
            str = "find ../"+destination_branch+"/* \! -name --force'biz9_config.js' -delete";
            console.log('apple butter');
            console.log(str);
    //exec("find ../"+destination_branch+"/* \! -name --force'biz9_config.js' -delete", (error, stdout, stderr) => {
            exec(str, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
            */
        function(call){
            str = "find ../"+destination_branch+"/* \! -name --force'biz9_config.js' -delete";
            console.log('apple butter');
            console.log(str);
            //exec("find ../"+destination_branch+"/* \! -name --force'biz9_config.js' -delete", (error, stdout, stderr) => {
            exec(str, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            let command_str = "rsync -av --exclude '" +"biz9_config.js'" +" ../"+source_branch+"/" +" ../"+destination_branch+"/";
            exec(command_str, (error, stdout, stderr) => {
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
module.exports.framework_git_push = function () {
    let confirm=false;
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Git Push');
            call();
        },
        function(call){
            Print.show_git_info();
            call();
        },
        function(call){
            confirm = prompt('Are you sure? (yes default):');
            if(!confirm){
                confirm='y';
            }
            if(confirm.toLowerCase()=='y' || confirm.toLowerCase()=='yes'){
                confirm=true;
            }else{
                confirm=false;
            }
            call();
        },
        function(call){
            if(confirm){
                exec("git push -f "+biz9_config.REPO+" "+biz9_config.BRANCH, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    call();
                });
            }else{
                call();
            }
        },
    ],
        function(err, result){
            Print.show_footer();
        });
};
module.exports.framework_git_branch_update = function () {
    let current_branch='';
    let new_branch='';
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Git Branch');
            call();
        },
        function(call){
            current_branch=biz9_config.BRANCH;
            new_branch=biz9_config.VERSION;
            call();
        },
        function(call){
            Print.show_sub_header('Current Branch');
            exec("git branch --show current", (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            Print.show_sub_footer();
            call();
        },
        function(call){
            if(new_branch){
                exec("git branch "+new_branch, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            if(new_branch){
                exec("git checkout "+new_branch, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            fs.readFile("biz9_config.js", 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(current_branch, new_branch);
                fs.writeFile("biz9_config.js", result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
                call();
            });
        },
        function(call){
            call();
        },
    ],
        function(err, result){
            Print.show_footer();
        });
};


module.exports.framework_git_commit = function () {
    let commit_note='';
    let current_version='';
    let new_version='';
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Git Commit');
            call();
        },
        function(call){
            Print.show_git_info();
            call();
        },
        function(call){
            current_version=biz9_config.VERSION;
            call();
        },
        function(call){
            exec("npm version patch --no-git-tag-version --tag-version-prefix=''", (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                new_version=String(stdout).trim();
                call();
            });
        },
        function(call){
            fs.readFile("biz9_config.js", 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(current_version, new_version);
                fs.writeFile("biz9_config.js", result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
                call();
            });
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
                console.log(stderr);
                call();
            });
        },
        function(call){
            current_version=biz9_config.VERSION;
            call();
        },
         function(call){
            Print.show_git_info();
            call();
        },
    ],
        function(err, result){
            Print.show_footer();
        });
};
module.exports.framework_info = function () {
    Print.show_header('BiZ9 Framework Info');
    console.log("Title: "+biz9_config.TITLE);
    console.log("Version: "+biz9_config.VERSION);
    console.log("Repo: "+biz9_config.REPO);
    console.log("Branch: "+biz9_config.BRANCH);
    Print.show_footer();
};
module.exports.search = function () {
    var search='';
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Search');
            call();
        },
        function(call){
            search = prompt('Search For?:');
            call();
        },
        function(call){
            console.log('String Search ResultZ:');
            exec("/usr/bin/grep -rnw $(pwd)/ -e "+search, (error, stdout, stderr) => {
                if (error) {
                    //console.log(error);
                    return;
                }
                console.log(stdout);
                console.log('---------------------------------------');
                call();
            });
        },
        function(call){
            console.log('File Search ResultZ:');
            exec("/usr/bin/find . -name "+search, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                console.log('---------------------------------------');
                call();
            });
        },
    ],
        function(err, result){
            Print.show_footer();
        });
};
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
module.exports.framework_npm_publish = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework NPM Publish');
            call();
        },
        function(call){
            exec('sudo npm publish --access public', (error, stdout, stderr) => {
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
module.exports.react_cache_reset = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Mobile React Cache Reset');
            call();
        },
        function(call){
            var str="react-native bundle --dev false --reset-cache --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res"
            exec(str,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stderr);
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
module.exports.react_build = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Mobile React Build');
            call();
        },
        function(call){
            var str="cd android && gradlew assembledebug && cd ../";
            exec(str,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stderr);
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
module.exports.react_device_build_deploy = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Mobile React Device Build Deploy');
            call();
        },
        function(call){
            var str="react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res";
            exec(str,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stderr);
                console.log(stdout);
                call();
            });
        },
        function(call){
            var str="react-native start";
            exec(str,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stderr);
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
module.exports.react_device_log_android = function () {
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Mobile React Device Log Android');
            call();
        },
        function(call){
            var str="npx react-native log-android";
            exec(str,(error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stderr);
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
module.exports.react_device_port_open = function () {
    let port='';
    async.series([
        function(call){
            Print.show_header('BiZ9 Framework Mobile React Device Port Open');
            call();
        },
        function(call){
            _port=prompt('Enter Device Port (1904 default):');
            if(!port){
                port="1904";
            }
            call();
        },
        function(call){
            exec("adb reverse tcp:"+port+" tcp:"+port, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(stdout);
                call();
            });
        },
        function(call){
            console.log("Port "+ port + " open");
            Print.show_footer();
            call();
        },
    ],
        function(err, result){
        });
};

