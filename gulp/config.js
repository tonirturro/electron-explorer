module.exports = {
    backEnd: {
        entry: './src/backend/main.js',
        bundle: 'backend.js'
    },
    frontEnd: {
        entry: './src/frontend/main.js',
        scripts: './src/frontend/**/*.js',
        bundle: 'frontend.js'
    },
    test: {
        entry: './test/test.js',
        bundle: 'bundle.js',
        dest: './test/bundle'
    },
    dest: './app'
};