param([String]$command="start:container")

# $imageName = "falco/db:latest"
$imageName = "mongo:3.5.9"
$containerName = "db_container"
$port=27017
$containerPortMapping="${port}:27017"

$scriptpath=${PSScriptRoot}
$unixyfiedscriptpath="/" + (($scriptpath -replace "\\","/") -replace ":","").Trim("/")
$unixyfieddriveletter=($unixyfiedscriptpath -replace "^/(.*?)/(.*?)$", '/$1/').ToLower()
$resultingscriptpath=($unixyfieddriveletter + ($unixyfiedscriptpath -replace "^/(.*?)/(.*?)$", '$2'))
# $datapath = $resultingscriptpath
# $datapath = "/c/tmp"

# Write-Host $resultingscriptpath

$currentPath = $pwd.path -replace '^|\\+','/' -replace ':'

switch ($command) {
    "create:image" {
        docker build -t $imageName -f ./Dockerfile ./
    }
    "start:temp:container:interactive" {
        docker run --rm -it -p $containerPortMapping -v "$($resultingscriptpath)/data:/data/db" --entrypoint "/bin/sh" --name $containerName $imageName
    }
    "restart:container" {
        docker run -d -p $containerPortMapping --name $containerName $imageName
    }
    "stop:all:containers" {
        docker stop $(docker ps -a -q)
    }
    "clean:all:containers" {
        docker rm $(docker ps -a -q)
    }
    "remove:all:images" {
        docker rmi $(docker images -q)
    }
    "remove:image" {
        docker rmi $imageName
    }
    "remove:container" {
        docker rm $containerName
    }
    "stop:container" {
        docker stop $containerName
    }
    "deploy:docker" {
        ./run.ps1 "create:image"
        if($?) {
            ./run.ps1 "start:container"
        }
    }
    "start:container" {
        docker run -d -p $containerPortMapping -v "$($resultingscriptpath)/data:/data/db" --name $containerName $imageName
    }
    Default {
        docker run -d -p $containerPortMapping -v "$($resultingscriptpath)/data:/data/db" --name $containerName $imageName
    }
}

"$($resultingscriptpath)/data:/data/db"

