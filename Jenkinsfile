pipeline {
    agent none
    stages {
        stage('SCM') {
            agent any
	
            steps {
	when{
	    branch "master*"
	  }
                git url: "https://github.com/vickyrathod/khaopiorepresentation.git"
            }
        }
        stage('Build') {
            agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        	}
    	}
            steps {
		when{
	    branch "master*"
	  }
                sh 'npm install' 
            }
        }
        stage('tag and publish') {
	
            agent any
            steps {
			when{
	    branch "master*"
	  }
                sh "docker build -t vicky123/nodeapp:${env.BUILD_ID} .";
		sh "docker build -t vicky123/nodeapp:latest .";
                withDockerRegistry([ credentialsId: "6544de7e-17a4-4576-9b9b-e86bc1e4f903", url: "" ]){
                sh "docker push vicky123/nodeapp:${env.BUILD_ID}";
		sh "docker push vicky123/nodeapp:latest";
                }
            }
        }
	stage('clean space') {
		agent any
		steps{
				when{
	    branch "master*"
	  }

		 sh "docker rmi -f \$(docker images --format '{{.Repository}}' | grep 'vicky123/nodeapp')"
		}
	}
	
	stage('deploy') {

		agent any
		steps{
		when{
	    branch "master*"
	  }
		 sh "echo 'sh khaopio/restart.sh'| ssh -i ${JENKINS_HOME}/khaopio/id_rsa khaopio007@khaopio.in"
		}
	}
    }
}
