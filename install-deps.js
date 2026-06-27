const { execSync } = require('child_process');

console.log('Installing required dependencies...');

try {
  // Install Tailwind CSS and related dependencies
  execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });
  
  // Install class utilities
  execSync('npm install clsx tailwind-merge class-variance-authority', { stdio: 'inherit' });
  
  // Install animation libraries
  execSync('npm install framer-motion', { stdio: 'inherit' });
  
  console.log('\n✅ Dependencies installed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run: npx tailwindcss init -p');
  console.log('2. Update your tailwind.config.js with the configuration from the documentation');
} catch (error) {
  console.error('❌ Error installing dependencies:', error);
  process.exit(1);
}
