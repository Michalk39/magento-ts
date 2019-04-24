pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker-compose -f /home/testarmy/projekty/magento/docker-compose.yml down'
                sh 'docker-compose -f /home/testarmy/projekty/magento/docker-compose.yml up -d'
            }
        }
        stage('Install') {
            steps {
                sh 'sleep 60'
                sh 'docker exec magento_web_1 install-magento'
                sh 'sleep 60'
                sh 'docker exec magento_web_1 bin/magento config:set admin/security/use_form_key 0'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm --add-host=local.magento:172.17.0.1 --mount type=bind,src=${WORKSPACE},dst="/home/circleci" angular/ngcontainer -c "npm install && npm run webdriver-update-ci && xvfb-run --server-args=\'-screen 0 1920x1080x24\' npm test"'
            }
        }
        stage('Clean') {
            steps {
                sh 'docker-compose -f /home/testarmy/projekty/magento/docker-compose.yml down'
            }
        }
    }
}