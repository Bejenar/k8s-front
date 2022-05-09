pipeline{
	agent any
	environment {
		APP_VERSION = getAppVersion().trim()
	}
	stages{
		stage("Docker Build"){
			steps{
				sh "docker build . -t bejenar/nodeapp:${APP_VERSION} "
				withCredentials([string(credentialsId: 'docker-hub-pass', variable: 'dockerPass')]) {
					sh "docker login -u bejenar -p ${dockerPass}"
					sh "docker push bejenar/nodeapp:${APP_VERSION}"
				}
			}
		}

		stage("Deploy") {
			steps {
				withKubeConfig([credentialsId: 'k8s-default', serverUrl: 'https://192.168.49.2:8443/']) {
				    sh "sed -e 's/<tag_version>/${APP_VERSION}/g' deployment.yaml"
				    sh "sed -e 's/<tag_version>/${APP_VERSION}/g' deployment.yaml | kubectl apply -f -"
				}

			}
		}
	}
}

def getAppVersion() {
	def tag = sh script: 'git rev-parse HEAD', returnStdout: true
	return tag
}