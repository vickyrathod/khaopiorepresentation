pipeline {
    agent none
    stages {
        stage('SCM') {
            agent any
	when{
	    branch "master"
	  }
            steps {
                git url: "https://github.com/vickyrathod/khaopiorepresentation.git"
            }
        }
        stage('Build') {
	when{
	    branch "master"
	  }
            agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        	}
    	}
            steps {
                sh 'npm install' 
            }
        }
        stage('tag and publish') {
		when{
	    branch "master"
	  }
            agent any
            steps {
                sh "docker build -t vicky123/nodeapp:${env.BUILD_ID} .";
		sh "docker build -t vicky123/nodeapp:latest .";
                withDockerRegistry([ credentialsId: "6544de7e-17a4-4576-9b9b-e86bc1e4f903", url: "" ]){
                sh "docker push vicky123/nodeapp:${env.BUILD_ID}";
		sh "docker push vicky123/nodeapp:latest";
                }
            }
        }
	stage('clean space') {
		when{
	    branch "master"
	  }
		agent any
		steps{
		 sh "docker rmi -f \$(docker images --format '{{.Repository}}' | grep 'vicky123/nodeapp')"
		}
	}
	
	stage('deploy') {

		when{
	    branch "master"
	  }
		agent any
		steps{
		 sh "echo 'sh khaopio/restart.sh'| ssh -i ${JENKINS_HOME}/khaopio/id_rsa khaopio007@khaopio.in"
		}
	}
    }
}
