import setupExpress from './src/app';

const PORT = process.env.PORT || 3000;

setupExpress().listen(PORT, () => {
    console.log(`App running on: ${PORT}`)
})
