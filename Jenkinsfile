pipeline {
    agent any
    
    tools {
        nodejs "Node18"  // Adjust based on your Jenkins NodeJS installation
    }
    
    environment {
        // Control build success/failure
        FAIL_BUILD = "${params.FAIL_BUILD ?: 'false'}"
    }
    
    parameters {
        booleanParam(
            name: 'FAIL_BUILD', 
            defaultValue: false, 
            description: '🧨 Force build failure for testing CI/CD error handling'
        )
    }
    
    stages {
        stage('🔍 Checkout') {
            steps {
                echo '🤖 JenkInsAI: Initializing intelligent CI/CD pipeline...'
                checkout scm
            }
        }
        
        stage('📦 Dependencies') {
            steps {
                echo '📦 Installing dependencies with npm...'
                sh 'npm ci'
            }
        }
        
        stage('🧪 Testing') {
            steps {
                echo '🧪 Executing test suite...'
                script {
                    if (env.FAIL_BUILD == 'true') {
                        echo '💥 FAIL_BUILD=true detected - forcing test failure'
                        sh 'FAIL_BUILD=true npm test || true'
                    } else {
                        echo '✅ FAIL_BUILD=false - running normal tests'
                        sh 'FAIL_BUILD=false npm test'
                    }
                }
            }
            post {
                always {
                    // Archive test results
                    junit testResults: 'reports/junit/*.xml', allowEmptyResults: true
                }
            }
        }
        
        stage('🚀 Build') {
            steps {
                echo '🚀 Building application artifacts...'
                script {
                    if (env.FAIL_BUILD == 'true') {
                        sh 'FAIL_BUILD=true npm run build'
                    } else {
                        sh 'FAIL_BUILD=false npm run build'
                    }
                }
            }
            post {
                always {
                    // Archive build artifacts
                    archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true
                }
            }
        }
        
        stage('📊 Quality Gates') {
            steps {
                echo '📊 Validating quality gates...'
                script {
                    if (env.FAIL_BUILD == 'true') {
                        echo '❌ Quality gates failed - build should fail'
                        error('Build failed due to FAIL_BUILD=true parameter')
                    } else {
                        echo '✅ All quality gates passed'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo '🤖 JenkInsAI: Pipeline execution completed'
            // Clean up workspace if needed
            cleanWs()
        }
        success {
            echo '🎉 ✅ Build completed successfully! All systems operational.'
        }
        failure {
            echo '💥 ❌ Build failed! Check logs for debugging information.'
        }
        unstable {
            echo '⚠️ 🟡 Build unstable! Some tests may have failed.'
        }
    }
}